import { NextResponse } from 'next/server';
import { initializeApp } from './lib/init';

let initializationPromise: Promise<void> | null = null;

export async function middleware() {
  try {
    // Only initialize once
    if (!initializationPromise) {
      initializationPromise = initializeApp();
    }
    
    // Don't block the request waiting for initialization
    initializationPromise.catch(console.error);
    
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next(); // Continue even if there's an error
  }
}

export const config = {
  matcher: '/:path*',
}; 