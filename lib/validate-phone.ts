/**
 * Validates a Kyrgyzstan mobile phone number.
 * Accepts formats like +996 5XX XXXXXX, 0 5XX XXXXXX with spaces, dashes or
 * parentheses. Kyrgyz mobile prefixes start with 5 or 7 after the country code.
 */
export function isValidKGPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, '')
  return /^(\+996|0)(5[0-9]{2}|7[0-9]{2})[0-9]{6}$/.test(cleaned)
}
