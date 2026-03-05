"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export type Member = {
  id: string;
  name: string;
  email: string;
  tier: string;
  membership_type: string;
  credits_total: number;
  credits_used: number;
  member_since: string;
  user_id: string;
};

type AuthContextType = {
  user: User | null;
  member: Member | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string, name: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMember = async (userId: string, email: string) => {
    const { data } = await supabase
      .from("members")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (data) {
      setMember(data);
    } else {
      // Auto-create a member record for new users
      const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      const { data: newMember } = await supabase
        .from("members")
        .insert([{ user_id: userId, email, name, tier: "Silver", credits_total: 2, credits_used: 0 }])
        .select()
        .single();
      if (newMember) setMember(newMember);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchMember(session.user.id, session.user.email ?? "");
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchMember(session.user.id, session.user.email ?? "").then(() => setLoading(false));
      } else {
        setMember(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Auto-refresh member record when credits change (e.g. after booking/cancel)
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel("my-member-record")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "members", filter: `user_id=eq.${user.id}` },
        (payload) => setMember(payload.new as Member))
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user?.id]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error?.message ?? null;
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return error.message;
    if (data.user) {
      await supabase.from("members").insert([{
        user_id: data.user.id, email, name,
        tier: "Silver", credits_total: 2, credits_used: 0,
      }]);
    }
    return null;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setMember(null);
  };

  return (
    <AuthContext.Provider value={{ user, member, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
