'use server'
import { CV_COLLECTION, database, NEXT_PUBLIC_DATABASE_ID } from "./config"
export const getcv = async () => {
  const documents = await database.listDocuments(
    NEXT_PUBLIC_DATABASE_ID!,
    CV_COLLECTION!
  );

  return documents;
};