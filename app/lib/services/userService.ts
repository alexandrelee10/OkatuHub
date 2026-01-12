import prisma from "../prisma";
import bcrypt from "bcrypt";

interface CreateUserInput {
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  password: string;
  confirmPassword?: string;
}

export async function createUser(input: CreateUserInput) {
  const { email, username, firstName, lastName, password, confirmPassword } = input;

  // basic required safeguards
  if (!email || !username || !password || !firstName || !lastName) {
    throw new Error("Missing required fields");
  }

  if (confirmPassword !== undefined && password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  // uniqueness check
  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existing) {
    throw new Error("Email or username already in use");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      firstName,
      lastName,
      password: hashedPassword,
    },
  });

  // strip password before returning
  const { password: _, ...safeUser } = user;
  return safeUser;
}
