import { MongoClient, Db } from 'mongodb';
import logger from '../lib/logger';

async function createDb({ login, password, dbName, dbClusterName }: { login: string, password: string, dbName: string, dbClusterName: string }): Promise<Db> {
     let db;
     const url = `mongodb+srv://${login}:${password}@${dbClusterName}.mongodb.net`;
     const client = new MongoClient(url);
     try {
          await client.connect();
          db = client.db(dbName);
          logger.info('mongo db connected');
     } catch (err) {
          logger.error('mongo db error', JSON.stringify(err.stack, null, 2));
     }
     return db;
}

export default createDb;