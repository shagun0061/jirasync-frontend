import mongoose from "mongoose";

// Define your MongoDB URLs
const localDB = 'mongodb://localhost:27017/jira-sync';
const cloudDB = 'mongodb+srv://jk975067:YRZDwoCGvh4uZG1n@jira-sync.7nbpu.mongodb.net/Jira-db?retryWrites=true&w=majority&appName=Jira-Sync';

// Choose which URL to use (you can set this dynamically based on the environment)
const url = localDB;

export async function connect() {
  try {
    // Prevent multiple connections
    if (mongoose.connection.readyState === 1) {
      console.log('Already connected to MongoDB');
      return;
    }

    await mongoose.connect(url);
    console.log('MongoDB connected successfully 😍😍');
  } catch (error) {
    console.error('Error connecting to MongoDB 😒😒:', error);
  }
}
