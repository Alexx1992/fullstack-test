import { MongoClient, Db, Collection, Document } from 'mongodb';
import { EventDataType } from '../types';

const url = 'mongodb://localhost:27017';
const dbName = 'Tracker';
const collectionName = 'events';

class DbClient {
  private client: MongoClient;
  private db: Db | null = null;
  private collection: Collection<Document> | null = null;

  constructor() {
    this.client = new MongoClient(url);
  }
  async connect() {
    try {
      await this.client.connect();

      this.db = this.client.db(dbName);
      this.collection = this.db.collection(collectionName);
    } catch (e) {
      throw new Error(`Mongo connection error ${e}`);
    }
  }
  async addEvetns(events: EventDataType[]) {
    try {
      await this.collection!.insertMany(events);
    } catch (e) {
      console.error('Error is happened during insert buffer', e);
    }
  }
}

const dbClient = new DbClient();

export default dbClient;
