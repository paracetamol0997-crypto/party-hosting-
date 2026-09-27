import { NextRequest, NextResponse } from 'next/server';
import { getAllRegistrations, deleteRegistration, getDatabaseStatus } from '@/lib/db';

function isAuthenticated(req: NextRequest): boolean {
  const cookie = req.cookies.get('admin_auth');
  const authHeader = req.headers.get('authorization');
  const correctPassword = process.env.ADMIN_PASSWORD || '9347478875';

  if (cookie && cookie.value === 'authenticated_hitesh_2026') {
    return true;
  }
  if (authHeader && authHeader === `Bearer ${correctPassword}`) {
    return true;
  }
  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Please log in.' },
      { status: 401 }
    );
  }

  try {
    const [registrations, dbStatus] = await Promise.all([
      getAllRegistrations(),
      getDatabaseStatus(),
    ]);
    const totalPeople = registrations.reduce((sum, r) => sum + (r.number_of_people || 1), 0);

    return NextResponse.json({
      success: true,
      data: {
        registrations,
        databaseStatus: dbStatus,
        stats: {
          totalRegistrations: registrations.length,
          totalPeople,
          estimatedCollection: totalPeople * 300,
        },
      },
    });
  } catch (error) {
    console.error('Admin GET registrations error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch registrations.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized.' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Registration ID is required.' },
        { status: 400 }
      );
    }

    const deleted = await deleteRegistration(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Could not delete or item not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Registration deleted.' });
  } catch (error) {
    console.error('Admin DELETE registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete registration.' },
      { status: 500 }
    );
  }
}
