import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { comparePasswords, generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    console.log('Login request received');
    const body = await request.json();
    const { email, password } = body;
    console.log(`Attempting login for email: ${email}`);

    // Validate input
    if (!email || !password) {
      console.log('Missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Get user by email
    console.log('Fetching user from database...');
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (!Array.isArray(users) || users.length === 0) {
      console.log(`User not found for email: ${email}`);
      return NextResponse.json(
        { error: 'Invalid email or password' }, // Keep error generic for security
        { status: 401 }
      );
    }

    const user = users[0] as any;
    console.log(`[API Login] User data retrieved from DB:`, user);
    const storedHash = user.password;
    console.log(`[API Login] Hashed password retrieved from DB: ${storedHash}`);
    console.log(`[API Login] Hashed password TYPE from DB: ${typeof storedHash}`);
    console.log(`[API Login] Hashed password LENGTH from DB: ${storedHash.length}`);

    // Verify password
    console.log('Comparing passwords...');
    console.log(`[API Login] Comparing Plain Password: "${password}"`);
    console.log(`[API Login] Against Hashed Password from DB: "${storedHash}"`);

    const isValidPassword = await comparePasswords(password, storedHash);
    console.log(`Password comparison result for user ${user.email}: ${isValidPassword}`);

    if (!isValidPassword) {
      console.log('Password comparison failed');
      return NextResponse.json(
        { error: 'Invalid email or password' }, // Keep error generic
        { status: 401 }
      );
    }

    // Check if user is verified (redundant check based on previous issue, but good practice)
    if (!user.is_verified) {
      console.log('User is not verified');
      return NextResponse.json(
        { error: 'Please verify your account first' },
        { status: 403 }
      );
    }

    // Generate JWT token
    console.log('Generating JWT token...');
    const token = generateToken(user.id, user.role);

    console.log('Login successful, returning token and user data');
    return NextResponse.json({
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 