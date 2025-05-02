import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { sendVerificationEmail } from '@/lib/email';

// Generate a 6-digit verification code
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    console.log('Starting signup process...');
    
    // Connect to database
    console.log('Connecting to database...');
    try {
      await connectDB();
      console.log('Database connected successfully');
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { error: 'Database connection failed', details: dbError instanceof Error ? dbError.message : 'Unknown database error' },
        { status: 500 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await req.json();
      console.log('Signup request body:', JSON.stringify(body, null, 2));
    } catch (parseError) {
      console.error('Request body parsing error:', parseError);
      return NextResponse.json(
        { error: 'Invalid request body', details: parseError instanceof Error ? parseError.message : 'Unknown parsing error' },
        { status: 400 }
      );
    }

    const { 
      fullName, 
      email, 
      password, 
      role, 
      phone, 
      organizationName, 
      address, 
      emergencyContact, 
      verificationMethod 
    } = body;

    // Validate required fields
    console.log('Validating required fields...');
    const missingFields = [];
    if (!fullName) missingFields.push('fullName');
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');
    if (!role) missingFields.push('role');
    if (!verificationMethod) missingFields.push('verificationMethod');

    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return NextResponse.json(
        { error: 'Missing required fields', fields: missingFields },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles = ['admin', 'victim', 'family', 'volunteer', 'organization'];
    if (!validRoles.includes(role)) {
      console.log('Invalid role:', role);
      return NextResponse.json(
        { error: 'Invalid role', validRoles },
        { status: 400 }
      );
    }

    // Validate verification method
    const validVerificationMethods = ['email', 'phone'];
    if (!validVerificationMethods.includes(verificationMethod)) {
      console.log('Invalid verification method:', verificationMethod);
      return NextResponse.json(
        { error: 'Invalid verification method', validMethods: validVerificationMethods },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log('Checking for existing user...');
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('User already exists with email:', email);
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 409 }
        );
      }
    } catch (findError) {
      console.error('Error checking for existing user:', findError);
      return NextResponse.json(
        { error: 'Error checking user existence', details: findError instanceof Error ? findError.message : 'Unknown error' },
        { status: 500 }
      );
    }

    // Hash password
    console.log('Hashing password...');
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
      console.log('Password hashed successfully');
    } catch (hashError) {
      console.error('Password hashing error:', hashError);
      return NextResponse.json(
        { error: 'Password hashing failed', details: hashError instanceof Error ? hashError.message : 'Unknown error' },
        { status: 500 }
      );
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const verificationCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create new user
    console.log('Creating new user...');
    try {
      const user = new User({
        fullName,
        email,
        password: hashedPassword,
        role,
        phone: phone || null,
        organizationName: organizationName || null,
        address: address || null,
        emergencyContact: emergencyContact || null,
        verificationMethod,
        isVerified: false,
        verificationCode,
        verificationCodeExpiry
      });

      console.log('Saving user to database...');
      await user.save();
      console.log('User created successfully:', user._id);

      // Send verification email
      if (verificationMethod === 'email') {
        try {
          await sendVerificationEmail(email, verificationCode);
          console.log('Verification email sent successfully');
        } catch (emailError) {
          console.error('Error sending verification email:', emailError);
          // Don't fail the signup if email fails, just log it
        }
      }

      return NextResponse.json({
        message: 'User registered successfully. Please check your email for the verification code.',
        user: {
          id: user._id,
          email: user.email,
          role: user.role
        }
      });
    } catch (saveError) {
      console.error('Error saving user:', saveError);
      return NextResponse.json(
        { 
          error: 'Error saving user', 
          details: saveError instanceof Error ? saveError.message : 'Unknown error',
          validationErrors: saveError instanceof Error && 'errors' in saveError ? saveError.errors : undefined
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Unexpected signup error:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : 'No stack trace') : undefined
      },
      { status: 500 }
    );
  }
} 