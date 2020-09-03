import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

class DataBase {
  public client: MongoClient;

  constructor(public name: string | undefined, public uri: string | undefined) {
    this.name = name;
    this.uri = uri;
    this.client = new MongoClient();
  }

  connect() {
    const client = new MongoClient();
    client.connectWithUri(this.uri as string);
    this.client = client;
  }

  get getDatabase() {
    return this.client.database(this.name as string);
  }
}

const db = new DataBase(config()["COLLECTION"], config()["MONGOCONNECTION"]);
db.connect();
export default db;
