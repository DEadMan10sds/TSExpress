import { MongoClient, Db, Collection } from "mongodb";
import { userValidationOptions } from "../validators/user";
import { ALLOW_VALIDATIONS } from "../config/config";
import { noValidator } from "../validators/noValidator";

const validators: any = {
  Users: ALLOW_VALIDATIONS ? userValidationOptions : noValidator,
};

export let dbConnection: Db;

export async function connectDatabase(uri: string) {
  try {
    const client = new MongoClient(uri);
    client.connect().then((client) => {
      dbConnection = client.db();
    });
    await client.db("admin").command({ ping: 1 });
    console.log("Database connected succesfully");

    console.log("Active validators for documents: ", ALLOW_VALIDATIONS);

    Object.keys(validators).forEach(async (collectionToValidate) => {
      const collectionExists = await dbConnection
        .listCollections({
          name: collectionToValidate,
        })
        .hasNext();

      if (collectionExists) {
        await dbConnection.command({
          collMod: collectionToValidate,
          ...validators[collectionToValidate],
        });
      } else {
        await dbConnection.createCollection(
          collectionToValidate,
          validators[collectionToValidate]
        );
      }
    });

    return dbConnection;
  } catch (error) {
    console.log("Error connecting to DataBase", error);
  }
}

export let collections = {
  users: {} as Collection<Document>,
  articles: {} as Collection<Document>,
};

export async function setCollections() {
  collections.users = dbConnection.collection("Users");
  collections.articles = dbConnection.collection("Articles");
}
