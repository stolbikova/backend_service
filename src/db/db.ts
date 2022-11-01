import { MongoClient } from 'mongodb';


async function createDb({ login, password, dbName, dbClusterName }: { login: string, password: string, dbName: string, dbClusterName: string }): Promise<any> {
     let db;
     const url = `mongodb+srv://${login}:${password}@${dbClusterName}.mongodb.net`;
     const client = new MongoClient(url);
     try {
          await client.connect();
          console.log('Connected correctly to server');
          db = client.db(dbName);
     } catch (err) {
          console.log('mongo db', err.stack);
     }
     return db;
}

export default createDb;