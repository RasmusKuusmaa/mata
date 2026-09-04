"use server";

import { signIn, signOut } from "@/lib/auth/config";

export async function logiSisseGoogleiga(): Promise<void> {
  await signIn("google", { redirectTo: "/" });
}

/**
 * `signIn`'s real signature (confirmed directly against next-auth's source,
 * `lib/actions.js`) takes a single `options` parameter that is *either* a
 * plain object *or* `FormData` — never both at once. When it's `FormData`,
 * `redirectTo` is read from a `redirectTo` field *inside that form data*
 * (`Object.fromEntries(options)`), not from a separate third argument — a
 * third argument is silently accepted by the types but actually lands in
 * `authorizationParams` (an OAuth-only concern) and does nothing here. Every
 * credentials-style form below carries a hidden `redirectTo` field for
 * exactly this reason; passing it as a extra JS argument (the previous,
 * silently-broken form of this file) left the user stuck on the sign-in
 * page after a real, successful sign-in — caught by Ship 6.5's e2e suite.
 */
export async function saadaMagicLink(formData: FormData): Promise<void> {
  await signIn("nodemailer", formData);
}

export async function logiValja(): Promise<void> {
  await signOut({ redirectTo: "/" });
}

/** e2e-test-only sign-in (see `src/lib/auth/config.ts`'s `e2eAuthEnabled`) —
 * the form that calls this only ever renders when `E2E_TEST_AUTH=1`. */
export async function logiSisseTestiga(formData: FormData): Promise<void> {
  await signIn("e2e-test", formData);
}
