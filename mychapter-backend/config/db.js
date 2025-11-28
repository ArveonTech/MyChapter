import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config({ path: "./env/.env" });

// uri
const uri = process.env.MONGO_URL;

// db name
const dbName = "myChapter";

const client = new MongoClient(uri);

export const database = async () => {
  try {
    await client.connect();

    const database = client.db(dbName);

    return database;
  } catch (error) {
    throw new Error(`Error Connect Database ${error.message}`);
  }
};
