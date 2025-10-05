import { MongoClient } from "mongodb";

// uri
const uri = "mongodb://127.0.0.1:27017";

// db name
const dbName = "NotesApp";

const client = new MongoClient(uri);

export const database = async () => {
  try {
    await client.connect();

    const database = client.db(dbName);

    return database;
  } catch (error) {
    console.info(`Error Connect Database ${error.message}`);
  }
};
