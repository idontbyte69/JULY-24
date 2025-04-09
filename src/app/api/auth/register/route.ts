import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    console.log('Registration request received');
    const body = await request.json();
    console.log('Request body:', body);
    
    const { fullName, email, phone, password, role, organizationName, address, emergencyContact, verificationMethod } = body;

    // Validate required fields
    if (!fullName || !email || !password || !role || !verificationMethod) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if email already exists
    console.log('Checking for existing user with email:', email);
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      console.log('User already exists with email:', email);
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    console.log('Hashing password');
    const hashedPassword = await hashPassword(password);
    console.log(`[API Register] Hashed password generated: ${hashedPassword}`);
    console.log(`[API Register] Hashed password TYPE before insert: ${typeof hashedPassword}`);
    console.log(`[API Register] Hashed password LENGTH before insert: ${hashedPassword.length}`);

    // Insert new user
    console.log('Attempting to insert new user');
    const insertQuery = `
      INSERT INTO users (
        full_name, email, phone, password, role, organization_name,
        address, emergency_contact, verification_method, is_verified
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const insertValues = [
      fullName,
      email,
      phone || null,
      hashedPassword,
      role,
      organizationName || null,
      address || null,
      emergencyContact || null,
      verificationMethod,
      false
    ];
    
    console.log('[API Register] Values being inserted:', insertValues);

    const [result] = await pool.execute(insertQuery, insertValues);
    console.log('Insert result:', result);

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 