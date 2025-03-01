import mongoose from "mongoose";

const localDB = 'mongodb://localhost:27017/jira-sync';

// const cloudDB = 'mongodb+srv://jk975067:YRZDwoCGvh4uZG1n@jira-sync.7nbpu.mongodb.net/Jira-db?retryWrites=true&w=majority&appName=Jira-Sync';

const url = localDB;

export async function connect() {
  try {
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
