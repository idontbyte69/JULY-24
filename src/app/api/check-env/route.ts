import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if environment variables are loaded
    const envVars = {
      DB_HOST: process.env.DB_HOST,
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD ? '[SET]' : '[NOT SET]',
      DB_NAME: process.env.DB_NAME,
      JWT_SECRET: process.env.JWT_SECRET ? '[SET]' : '[NOT SET]',
      NODE_ENV: process.env.NODE_ENV
    };
    
    console.log('Environment variables:', envVars);
    
    return NextResponse.json({ 
      success: true, 
      envVars,
      message: 'Environment variables checked'
    });
  } catch (error) {
    console.error('Environment check error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 