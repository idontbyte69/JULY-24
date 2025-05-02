import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'july24_secret_key_2024';

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

    // Connect to MongoDB
    await connectDB();

    // Get user by email
    console.log('Fetching user from database...');
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`User not found for email: ${email}`);
      return NextResponse.json(
        { error: 'Invalid email or password' }, // Keep error generic for security
        { status: 401 }
      );
    }

    console.log(`[API Login] User data retrieved from DB:`, user);
    const storedHash = user.password;
    console.log(`[API Login] Hashed password retrieved from DB: ${storedHash}`);

    // Verify password
    console.log('Comparing passwords...');
    const isValidPassword = await bcrypt.compare(password, storedHash);
    console.log(`Password comparison result for user ${user.email}: ${isValidPassword}`);

    if (!isValidPassword) {
      console.log('Password comparison failed');
      return NextResponse.json(
        { error: 'Invalid email or password' }, // Keep error generic
        { status: 401 }
      );
    }

    // Check if user is verified
    if (!user.isVerified) {
      console.log('User is not verified');
      return NextResponse.json(
        { error: 'Please verify your account first' },
        { status: 403 }
      );
    }

    // Generate JWT token
    console.log('Generating JWT token...');
    const token = jwt.sign(
      { 
        userId: user._id,
        role: user.role,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Login successful, returning token and user data');
    return NextResponse.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
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