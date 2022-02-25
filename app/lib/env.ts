import type { CLIENT_ENV_VARS } from "./env.server";

/**
 * A module to manage CLIENT SIDE environment variables.
 *
 * The module is not named .client.ts because it should also
 * be available on the backend, just in case we need it.
 *
 * It fetches the variables either from the `window.ENV` object
 * or the `process.env`.
 */

export function getClientEnvVar(key: keyof typeof CLIENT_ENV_VARS) {
  if (typeof window !== "undefined") return (window as any).ENV[key];

  return process.env[key];
}
