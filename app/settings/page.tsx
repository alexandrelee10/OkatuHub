// app/settings/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/lib/auth";
import SettingsForm from "../components/SettingsForm";
import Link from "next/link";
import HomeButton from "../components/HomeButton";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // pass only what we need to the client
  const safeUser = {
    id: user.id,
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    username: user.username ?? "",
    email: user.email ?? "",
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-red-950 text-white pt-24 pb-16 px-4">
      <section className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-semibold text-center">Account Settings</h1>
        <p className="text-sm text-zinc-400 text-center">
          Update your profile, login info, and admin access.
        </p>

        <SettingsForm user={safeUser} />
        <HomeButton />
        </section>
    </main>
  );
}
