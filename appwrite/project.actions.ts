'use server'
import { database, NEXT_PUBLIC_COLLECTION_PROJECT_ID, NEXT_PUBLIC_DATABASE_ID } from "./config"
export const getProjectData = async () => {
  const documents = await database.listDocuments(
    NEXT_PUBLIC_DATABASE_ID!,
    NEXT_PUBLIC_COLLECTION_PROJECT_ID!
  );

  return documents;
};