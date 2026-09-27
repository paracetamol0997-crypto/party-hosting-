import { z } from 'zod';

export function normalizeIndianPhone(phone: string): string {
  // Strip all non-digit characters except leading plus
  let cleaned = phone.replace(/[\s\-\(\)]/g, '').trim();

  // If starts with +91, remove it
  if (cleaned.startsWith('+91')) {
    cleaned = cleaned.substring(3);
  } else if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.substring(2);
  } else if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.substring(1);
  }

  return cleaned;
}

export const indianPhoneRegex = /^[6-9]\d{9}$/;

export const registrationSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Please enter your full name (at least 2 characters).' })
    .max(100, { message: 'Name is too long (max 100 characters).' })
    .trim(),
  phone: z
    .string()
    .transform((val) => normalizeIndianPhone(val))
    .refine((val) => indianPhoneRegex.test(val), {
      message: 'Please enter a valid 10-digit Indian phone number (e.g., 9876543210).',
    }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address.' })
    .max(255)
    .trim()
    .toLowerCase(),
  numberOfPeople: z.coerce
    .number({ invalid_type_error: 'Please enter a valid number of guests.' })
    .int({ message: 'Number of people must be a whole number.' })
    .min(1, { message: 'Number of people must be at least 1.' })
    .max(25, { message: 'For groups larger than 25, please contact Hitesh directly!' }),
  message: z
    .string()
    .max(500, { message: 'Message cannot exceed 500 characters.' })
    .optional()
    .default(''),
  confirmed: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Please confirm that the information provided is correct.',
    }),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
