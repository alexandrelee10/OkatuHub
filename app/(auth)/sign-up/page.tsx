"use client";

import assets from "@/app/assets/assets";
import Link from "next/link";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";


const SignUpPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // handle submit 
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  setIsSubmitting(true);

  const formData = new FormData(e.currentTarget);

  const payload = {
    firstName: formData.get("firstname")?.toString() || "",
    lastName: formData.get("lastname")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    username: formData.get("username")?.toString() || "",
    password,
    confirmPassword,
  };

  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("Signup status:", res.status, "ok:", res.ok);

    let data: any;
    try {
      data = await res.json();
      console.log("Signup JSON:", data);
    } catch (parseErr) {
      console.error("Failed to parse JSON from signup:", parseErr);
      setError("Server sent an invalid response.");
      return;
    }

    if (!res.ok) {
      setError(data.error || "Failed to sign up");
      return;
    }

    // success
    console.log("Signed up user:", data);
    router.push('/')
    
  } catch (err) {
    console.error("Signup request failed:", err);
    setError("Something went wrong");
  } finally {
    setIsSubmitting(false);
  }
};



  return (
    <section
      id="signup"
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-blue-950 px-4"
    >
      {/* Wrapper: logo + card */}
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        {/* Logo (clickable home) */}
        <Link href="/">
          <Image
            src={assets.logo}
            alt="Okatsu Logo"
            width={140}
            height={120}
            className="cursor-pointer"
          />
        </Link>

        {/* Card */}
        <div className="w-full bg-zinc-900/80 rounded-2xl shadow-xl p-8 text-white border border-zinc-800">
          {/* Hero Image */}
          <div>
            <img
              src={assets.signup_her}
              alt=""
              className="w-full max-w-sm mx-auto rounded-2xl shadow-lg object-cover p-3"
            />
          </div>

          <div className="w-full">
            <h1 className="text-2xl font-semibold mb-2 text-center">
              Join Our Community
            </h1>
            <p className="text-zinc-400 mb-6 text-sm text-center">
              Create an account to explore Okatsu and form communities
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="flex flex-row gap-4">
                {/* First Name */}
                <div className="flex-1">
                  <label htmlFor="firstname" className="block text-sm mb-1">
                    First Name
                  </label>
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    placeholder="John"
                    className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-blue-950 focus:ring-2"
                  />
                </div>
                {/* Last Name */}
                <div className="flex-1">
                  <label htmlFor="lastname" className="block text-sm mb-1">
                    Last Name
                  </label>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    placeholder="Doe"
                    className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-blue-950 focus:ring-2"
                  />
                </div>
              </div>

              {/* Other fields */}
              <div className="space-y-4">
                {/* Email */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="block text-sm mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="johndoe@example.com"
                    className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-blue-950 focus:ring-2"
                  />
                </div>

                {/* Username */}
                <div className="flex flex-col">
                  <label htmlFor="username" className="block text-sm mb-1">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-blue-950 focus:ring-2"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col">
                  <label htmlFor="password" className="block text-sm mb-1">
                    Password
                  </label>
                  <input
                    className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-blue-950 focus:ring-2"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-blue-950 focus:ring-2"
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400 mt-1 text-center">
                    {error}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                className="w-full mt-2 rounded-lg bg-blue-900 hover:bg-blue-800 disabled:opacity-60 py-2 font-medium transition-colors"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Join Us"}
              </button>
            </form>

            <p className="mt-4 text-xs text-zinc-400 text-center">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-blue-400 hover:text-red-300"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
