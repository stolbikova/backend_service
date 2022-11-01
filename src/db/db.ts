import { MongoClient } from  'mongodb';
           
const url = 'mongodb+srv://stolbikova:alina59@cluster0.tpdqbv9.mongodb.net/myFirstDatabase';
const client = new MongoClient(url);
const dbName = 'test';
                      
async function createDb(): Promise<any> {
    let db;
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

createDb().catch(console.dir);