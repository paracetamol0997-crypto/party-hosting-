import { NextRequest, NextResponse } from 'next/server';
import { registrationSchema } from '@/lib/validation';
import { createRegistration } from '@/lib/db';
import { dispatchNotifications } from '@/lib/notifications';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    const rateResult = checkRateLimit(ip, 8, 60 * 1000); // 8 attempts per minute per IP
    if (!rateResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please wait a moment and try again.',
        },
        { status: 429 }
      );
    }

    // 2. Parse & Validate Payload
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid submission data.' },
        { status: 400 }
      );
    }

    const parseResult = registrationSchema.safeParse(body);
    if (!parseResult.success) {
      const firstError = parseResult.error.errors[0]?.message || 'Please check your inputs.';
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { fullName, phone, email, numberOfPeople, message } = parseResult.data;

    // 3. Save to Database
    const dbResult = await createRegistration({
      fullName,
      phone,
      email,
      numberOfPeople,
      message,
    });

    if (!dbResult.success) {
      if (dbResult.isDuplicate) {
        return NextResponse.json(
          {
            success: false,
            isDuplicate: true,
            error: "You're already on the guest list 👀",
          },
          { status: 409 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          error: 'Something went wrong while confirming your spot. Please try again.',
        },
        { status: 500 }
      );
    }

    const savedRecord = dbResult.data!;

    // 4. Background Notification Dispatch (Email + WhatsApp)
    // Non-blocking so response is fast
    dispatchNotifications(savedRecord).catch((err) => {
      console.error('Notification dispatch background error:', err);
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your spot is confirmed!',
        data: {
          id: savedRecord.id,
          fullName: savedRecord.full_name,
          phone: savedRecord.phone,
          email: savedRecord.email,
          numberOfPeople: savedRecord.number_of_people,
          message: savedRecord.message,
          registeredAt: savedRecord.registered_at,
          status: savedRecord.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration API unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
