import mongoose from 'mongoose';

class DBConnector {
  private dbUri: string;

  constructor(dbUri: string | undefined) {
    if (!dbUri) {
      throw new Error('Database URI is not provided.');
    }
    this.dbUri = dbUri;
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.dbUri);
      console.log('⚡️Connected to database');
    } catch (error) {
      console.error('Error connecting to database:', error);
      throw error;
    }
  }
}

export default DBConnector;