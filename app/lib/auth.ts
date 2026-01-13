import { cookies } from "next/headers";
import prisma from "./prisma";

export const SESSION_COOKIE_NAME = "okatsu_session";

export async function getCurrentUser() {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) return null;

  const userId = sessionCookie.value;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return null;

  const { password, ...safeUser } = user;
  return safeUser;
}
