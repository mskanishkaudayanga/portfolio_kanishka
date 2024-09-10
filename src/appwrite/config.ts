// src/appwrite/config.js

import { Client, Databases } from 'appwrite';

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '') // Your API Endpoint
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID || ''); // Your Project ID

// Initialize the Appwrite database service
const database = new Databases(client);

// Export only once to avoid duplicate exports
export { database, client };
