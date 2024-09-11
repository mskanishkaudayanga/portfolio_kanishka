import * as sdk from "node-appwrite";
import { Client, Databases } from 'appwrite';
export const {
  NEXT_PUBLIC_COLLECTION_TECHID,
  API_KEY,
 NEXT_PUBLIC_DATABASE_ID,
 NEXT_PUBLIC_COLLECTION_PROJECT_ID,
 NEXT_PUBLIC_PROJECT_ID: PROJECT_ID,
 NEXT_PUBLIC_APPWRITE_ENDPOINT: ENDPOINT,
 CV_COLLECTION,
} = process.env;
const client = new sdk.Client();

  client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!); 

const database = new sdk.Databases(client);
export { database, client };
