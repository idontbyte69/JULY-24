import mongoose from 'mongoose';
import connectDB from './db';

async function initDB() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Get the database instance
    const db = mongoose.connection.db;

    // Create collections if they don't exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);

    // Users and Authentication
    if (!collectionNames.includes('users')) {
      await db.createCollection('users');
      console.log('Created users collection');
    }

    if (!collectionNames.includes('verificationtokens')) {
      await db.createCollection('verificationtokens');
      console.log('Created verificationtokens collection');
    }

    // Victims and Cases
    if (!collectionNames.includes('victims')) {
      await db.createCollection('victims');
      console.log('Created victims collection');
    }

    if (!collectionNames.includes('cases')) {
      await db.createCollection('cases');
      console.log('Created cases collection');
    }

    if (!collectionNames.includes('medicalreports')) {
      await db.createCollection('medicalreports');
      console.log('Created medicalreports collection');
    }

    // Support and Donations
    if (!collectionNames.includes('supportrequests')) {
      await db.createCollection('supportrequests');
      console.log('Created supportrequests collection');
    }

    if (!collectionNames.includes('donations')) {
      await db.createCollection('donations');
      console.log('Created donations collection');
    }

    if (!collectionNames.includes('transactions')) {
      await db.createCollection('transactions');
      console.log('Created transactions collection');
    }

    // Content and Communication
    if (!collectionNames.includes('articles')) {
      await db.createCollection('articles');
      console.log('Created articles collection');
    }

    if (!collectionNames.includes('comments')) {
      await db.createCollection('comments');
      console.log('Created comments collection');
    }

    if (!collectionNames.includes('messages')) {
      await db.createCollection('messages');
      console.log('Created messages collection');
    }

    // Create indexes for users collection
    const usersCollection = db.collection('users');
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    await usersCollection.createIndex({ verificationToken: 1 });
    await usersCollection.createIndex({ resetPasswordToken: 1 });
    await usersCollection.createIndex({ role: 1 });

    // Create indexes for victims collection
    const victimsCollection = db.collection('victims');
    await victimsCollection.createIndex({ userId: 1 });
    await victimsCollection.createIndex({ status: 1 });
    await victimsCollection.createIndex({ createdAt: -1 });

    // Create indexes for cases collection
    const casesCollection = db.collection('cases');
    await casesCollection.createIndex({ victimId: 1 });
    await casesCollection.createIndex({ status: 1 });
    await casesCollection.createIndex({ createdAt: -1 });

    // Create indexes for support requests
    const supportRequestsCollection = db.collection('supportrequests');
    await supportRequestsCollection.createIndex({ userId: 1 });
    await supportRequestsCollection.createIndex({ type: 1 });
    await supportRequestsCollection.createIndex({ status: 1 });

    // Create indexes for donations
    const donationsCollection = db.collection('donations');
    await donationsCollection.createIndex({ userId: 1 });
    await donationsCollection.createIndex({ status: 1 });
    await donationsCollection.createIndex({ createdAt: -1 });

    // Create indexes for articles
    const articlesCollection = db.collection('articles');
    await articlesCollection.createIndex({ authorId: 1 });
    await articlesCollection.createIndex({ status: 1 });
    await articlesCollection.createIndex({ createdAt: -1 });
    await articlesCollection.createIndex({ tags: 1 });

    // Create indexes for comments
    const commentsCollection = db.collection('comments');
    await commentsCollection.createIndex({ articleId: 1 });
    await commentsCollection.createIndex({ userId: 1 });
    await commentsCollection.createIndex({ createdAt: -1 });

    // Create indexes for messages
    const messagesCollection = db.collection('messages');
    await messagesCollection.createIndex({ senderId: 1 });
    await messagesCollection.createIndex({ receiverId: 1 });
    await messagesCollection.createIndex({ createdAt: -1 });

    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

export default initDB; 