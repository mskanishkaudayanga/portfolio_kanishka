'use server'
import { database, NEXT_PUBLIC_COLLECTION_TECHID, NEXT_PUBLIC_DATABASE_ID } from "./config"
export const getTechnologyData = async () => {
  const documents = await database.listDocuments(
    NEXT_PUBLIC_DATABASE_ID!,
    NEXT_PUBLIC_COLLECTION_TECHID!
  );

  return documents;
};