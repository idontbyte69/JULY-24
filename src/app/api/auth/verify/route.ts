import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, code } = body;

    console.log(`[API Verify] Received request for email: ${email}, code: ${code}`); // Log 1

    if (!email || !code) {
      console.error('[API Verify] Missing email or code in request body.');
      return NextResponse.json(
        { error: 'Email and verification code are required' },
        { status: 400 }
      );
    }

    // --- Verification Logic (Demo) ---
    const DEMO_CODE = '123456';
    if (code !== DEMO_CODE) {
        console.log(`[API Verify] Invalid code provided for ${email}. Expected ${DEMO_CODE}, got ${code}.`); // Log 2
        return NextResponse.json(
            { error: 'Invalid verification code' },
            { status: 400 }
        );
    }

    // --- Check User Existence and Current Status ---
    console.log(`[API Verify] Checking current status for email: ${email}`); // Log 3
    const [users] = await pool.execute(
        'SELECT id, is_verified FROM users WHERE email = ?',
        [email]
    );

    if (!Array.isArray(users) || users.length === 0) {
        console.log(`[API Verify] User not found for email: ${email}`); // Log 4
        return NextResponse.json(
            { error: 'User not found or verification invalid.' },
            { status: 404 } // Use 404 for not found
        );
    }

    const user = users[0] as any;
    if (user.is_verified) {
        console.log(`[API Verify] User ${email} is already verified.`); // Log 5
        // Allow login even if already verified, maybe return a specific message
        return NextResponse.json({ message: 'Account already verified' });
    }

    // --- Update Database ---
    console.log(`[API Verify] Attempting to update verification status for email: ${email}`); // Log 6
    const [result] = await pool.execute(
      'UPDATE users SET is_verified = true WHERE email = ? AND is_verified = false',
      [email]
    );

    const updateResult = result as any;
    if (updateResult.affectedRows > 0) {
      console.log(`[API Verify] Database update successful for ${email}. Rows affected: ${updateResult.affectedRows}`); // Log 7
      return NextResponse.json({ message: 'Account verified successfully' });
    } else {
      // This case might happen due to a race condition or if the user was already verified (checked above, but good failsafe)
      console.error(`[API Verify] Database update failed for ${email}, although user exists and was not verified. Affected rows: ${updateResult.affectedRows}`); // Log 8
      return NextResponse.json(
        { error: 'Failed to update verification status. Please try again.' },
        { status: 500 } // Internal server error if update fails unexpectedly
      );
    }

  } catch (error) {
    console.error('[API Verify] Unexpected error during verification:', error); // Log 9
    return NextResponse.json(
      {
        error: 'Internal server error during verification',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 