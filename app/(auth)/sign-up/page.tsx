"use client";

import assets from "@/app/assets/assets";
import Link from "next/link";
import Image from "next/image";
import React, { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/app/components/NavBar";

type FieldErrors = {
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
  general?: string;
};

const SignUpPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // field-level errors
  const [errors, setErrors] = useState<FieldErrors>({});

  const router = useRouter();

  const inputBase =
    "w-full rounded-lg bg-zinc-800 border px-3 py-2 text-sm focus:outline-none focus:ring-2";
  const normalBorder = "border-zinc-700 focus:ring-blue-950";
  const errorBorder = "border-red-500/80 focus:ring-red-500/60";

  const getInputClass = (hasError: boolean) =>
    `${inputBase} ${hasError ? errorBorder : normalBorder}`;

  // small helper: assign server error message to a field (best-effort)
  const mapServerErrorToFields = (msg: string): FieldErrors => {
    const m = msg.toLowerCase();

    // username
    if (m.includes("username") && (m.includes("taken") || m.includes("exists") || m.includes("already"))) {
      return { username: msg };
    }

    // email
    if (m.includes("email") && (m.includes("taken") || m.includes("exists") || m.includes("already"))) {
      return { email: msg };
    }

    // password
    if (m.includes("password") && (m.includes("weak") || m.includes("short") || m.includes("invalid"))) {
      return { password: msg };
    }

    // fallback
    return { general: msg };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({}); // clear old errors

    // client-side password match check
    if (password !== confirmPassword) {
      setErrors({
        password: "Passwords do not match.",
        confirmPassword: "Passwords do not match.",
      });
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

      let data: any = null;
      try {
        data = await res.json();
      } catch {
        // ignore parse error; we’ll show a generic message below
      }

      if (!res.ok) {
        const message =
          data?.error ||
          data?.message ||
          (Array.isArray(data) && data?.[0]?.message) ||
          "Failed to sign up.";

        // map message to field errors
        const mapped = mapServerErrorToFields(String(message));

        // special-case: Prisma unique constraint (if your API returns something like it)
        // If your backend returns a code/key, you can handle it here too.

        setErrors(mapped);
        return;
      }

      router.push("/");
    } catch (err) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="signup"
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-blue-950 px-4"
    >

      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <Link href="/">
          <Image
            src={assets.logo}
            alt="Okatsu Logo"
            width={140}
            height={120}
            className="cursor-pointer"
          />
        </Link>

        <div className="w-full bg-zinc-900/80 rounded-2xl shadow-xl p-8 text-white border border-zinc-800">
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
                <div className="flex-1">
                  <label htmlFor="firstname" className="block text-sm mb-1">
                    First Name
                  </label>
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    placeholder="John"
                    className={getInputClass(false)}
                  />
                </div>

                <div className="flex-1">
                  <label htmlFor="lastname" className="block text-sm mb-1">
                    Last Name
                  </label>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    placeholder="Doe"
                    className={getInputClass(false)}
                  />
                </div>
              </div>

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
                    className={getInputClass(!!errors.email)}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
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
                    className={getInputClass(!!errors.username)}
                  />
                  {errors.username && (
                    <p className="mt-1 text-xs text-red-400">{errors.username}</p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col">
                  <label htmlFor="password" className="block text-sm mb-1">
                    Password
                  </label>
                  <input
                    className={getInputClass(!!errors.password)}
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      // clear password errors as user types
                      setErrors((prev) => ({ ...prev, password: undefined, general: prev.general }));
                    }}
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-400">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col">
                  <label htmlFor="confirmPassword" className="block text-sm mb-1">
                    Confirm Password
                  </label>
                  <input
                    className={getInputClass(!!errors.confirmPassword)}
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        confirmPassword: undefined,
                        general: prev.general,
                      }));
                    }}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* General error */}
                {errors.general && (
                  <p className="text-sm text-red-400 mt-2 text-center">
                    {errors.general}
                  </p>
                )}
              </div>

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
              <Link href="/sign-in" className="text-blue-400 hover:text-red-300">
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
