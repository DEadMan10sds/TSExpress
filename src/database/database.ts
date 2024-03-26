import { MongoClient, Db } from "mongodb";

export let dbConnection: Db;

export async function connectDatabase(uri: string) {
  try {
    const client = new MongoClient(uri);
    client.connect().then((client) => {
      dbConnection = client.db();
    });
    console.log("Database connected succesfully");
    return dbConnection;
  } catch (error) {
    console.log("Error connecting to DataBase", error);
  }
}
