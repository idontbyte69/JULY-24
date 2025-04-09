import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    console.log('Testing database connection...');
    
    // Test connection
    const connection = await pool.getConnection();
    console.log('Database connection successful');
    
    // Test query
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('Test query successful:', rows);
    
    // Test insert
    const testUser = {
      full_name: 'Test User',
      email: `test${Date.now()}@example.com`,
      phone: '1234567890',
      password: 'testpassword',
      role: 'volunteer',
      verification_method: 'email',
      is_verified: false
    };
    
    const [result] = await connection.execute(
      `INSERT INTO users (
        full_name, email, phone, password, role, verification_method, is_verified
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        testUser.full_name,
        testUser.email,
        testUser.phone,
        testUser.password,
        testUser.role,
        testUser.verification_method,
        testUser.is_verified
      ]
    );
    
    console.log('Test insert successful:', result);
    
    // Release connection
    connection.release();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database test successful',
      testUser: {
        ...testUser,
        password: '[HIDDEN]'
      }
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
} 