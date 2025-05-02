import connectDB from './db';
import initDB from './initDB';

let isInitialized = false;

export async function initializeApp() {
  if (isInitialized) return;
  
  try {
    console.log('Initializing application...');
    const db = await connectDB();
    if (db) {
      await initDB();
      console.log('Database initialization completed successfully');
      isInitialized = true;
    }
  } catch (error) {
    console.error('Failed to initialize application:', error);
    throw error;
  }
} 