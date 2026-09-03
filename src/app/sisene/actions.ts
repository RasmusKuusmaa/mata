"use server";

import { signIn, signOut } from "@/lib/auth/config";

export async function logiSisseGoogleiga(): Promise<void> {
  await signIn("google", { redirectTo: "/" });
}

export async function saadaMagicLink(formData: FormData): Promise<void> {
  await signIn("nodemailer", formData, { redirectTo: "/" });
}

export async function logiValja(): Promise<void> {
  await signOut({ redirectTo: "/" });
}
