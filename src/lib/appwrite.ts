import { Client, Databases, ID } from 'appwrite';

if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) {
    throw new Error('Missing AppWrite endpoint');
}

if (!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
    throw new Error('Missing AppWrite project ID');
}

if (!process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID) {
    throw new Error('Missing AppWrite database ID');
}

if (!process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID) {
    throw new Error('Missing AppWrite collection ID');
}

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

export const databases = new Databases(client);

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
export const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;

export const subscribeEmail = async (email: string) => {
    try {
        const response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
                email,
                subscribedAt: new Date().toISOString(),
            }
        );
        return response;
    } catch (error) {
        console.error('Error subscribing email:', error);
        throw error;
    }
}; 