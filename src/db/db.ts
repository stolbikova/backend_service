import { MongoClient } from 'mongodb';


async function createDb({ login, password }: { login: string, password: string }): Promise<any> {
     let db;
     const url = `mongodb+srv://${login}:${password}@cluster0.tpdqbv9.mongodb.net/myFirstDatabase`;
     const client = new MongoClient(url);
     const dbName = 'test';
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