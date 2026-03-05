"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export type Booking = {
  id: string;
  date: string;
  time: string;
  cage_type: string;
  pin: string;
  status: string;
  payment_method: string;
  member_name?: string;
  user_id?: string;
};

type BookingContextType = {
  bookings: Booking[];
  loading: boolean;
  addBooking: (b: Omit<Booking, "id">) => Promise<{ error?: string }>;
  cancelBooking: (id: string) => Promise<void>;
};

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setBookings([]);
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("status", "confirmed")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (!error && data) setBookings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();

    // Refetch on login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchBookings();
    });

    // Real-time subscription — bookings update live across browser tabs
    const channel = supabase
      .channel("bookings-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, fetchBookings)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      subscription.unsubscribe();
    };
  }, []);

  const addBooking = async (b: Omit<Booking, "id">): Promise<{ error?: string }> => {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user ?? null;

    if (user) {
      // Server-side checks — query DB directly so stale local state can't be bypassed
      const { data: existing } = await supabase
        .from("bookings")
        .select("id, date, time, cage_type")
        .eq("status", "confirmed")
        .eq("user_id", user.id);

      if (existing) {
        if (existing.length >= 3) {
          return { error: "You already have 3 active bookings (the maximum). Cancel one to book again." };
        }
        if (existing.find((x) => x.date === b.date && x.time === b.time && x.cage_type === b.cage_type)) {
          return { error: "You already have a booking for this cage at this date and time." };
        }
        if (existing.find((x) => x.date === b.date)) {
          return { error: "You already have a booking on this date. Only one session per day is allowed." };
        }
      }
    }

    // Look up the member's name
    let memberName = null;
    if (user) {
      const { data: member } = await supabase
        .from("members")
        .select("name")
        .eq("user_id", user.id)
        .single();
      memberName = member?.name ?? null;
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert([{ ...b, user_id: user?.id ?? null, member_name: memberName }])
      .select()
      .single();

    if (error) return { error: error.message };

    if (data) {
      setBookings((prev) => [data, ...prev]);
      // Deduct one credit
      if (user) {
        const { data: m } = await supabase.from("members").select("credits_used").eq("user_id", user.id).single();
        if (m) await supabase.from("members").update({ credits_used: m.credits_used + 1 }).eq("user_id", user.id);
      }
    }

    return {};
  };

  const cancelBooking = async (id: string) => {
    const booking = bookings.find((b) => b.id === id);
    const { error } = await supabase
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", id);
    if (!error) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
      // Refund credit if cancelled with 48+ hours notice
      if (booking) {
        const bookingTime = new Date(`${booking.date} ${booking.time}`);
        const hoursUntil = (bookingTime.getTime() - Date.now()) / (1000 * 60 * 60);
        if (hoursUntil >= 48) {
          const { data: { session } } = await supabase.auth.getSession();
          const user = session?.user ?? null;
          if (user) {
            const { data: m } = await supabase.from("members").select("credits_used").eq("user_id", user.id).single();
            if (m && m.credits_used > 0) {
              await supabase.from("members").update({ credits_used: m.credits_used - 1 }).eq("user_id", user.id);
            }
          }
        }
      }
    }
  };

  return (
    <BookingContext.Provider value={{ bookings, loading, addBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBookings must be used inside BookingProvider");
  return ctx;
}
