"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

const SignInPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // For now just log it – later hook this up to your API
    console.log("SIGN IN DATA:", { email, password });

    // fake delay
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <section id='signin' className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-red-950 px-4">
      <div className="w-full max-w-md bg-zinc-900/80 rounded-2xl shadow-xl p-8 text-white border border-zinc-800">
        <h1 className="text-2xl font-semibold mb-2 text-center">Welcome back</h1>
        <p className="text-zinc-400 mb-6 text-sm text-center">
          Sign in to continue exploring Okatsu.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-60 py-2 text-sm font-medium transition-colors"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-xs text-zinc-400 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-red-400 hover:text-red-300">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignInPage;
