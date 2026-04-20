/**
 * Sanitize a string by stripping HTML tags and trimming whitespace.
 * Prevents XSS and injection attacks.
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/[<>"'&]/g, "") // remove potentially dangerous chars
    .trim();
}

/**
 * Sanitize an email address.
 */
export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim().replace(/[<>"']/g, "");
}
