// All Appwrite SDK calls use dynamic imports so the package is never
// loaded during SSR (it accesses localStorage at import time).

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
const QA_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_QA_COLLECTION_ID;

function assertEnv() {
  if (!ENDPOINT) throw new Error('[Appwrite] NEXT_PUBLIC_APPWRITE_ENDPOINT is not set in .env.local');
  if (!PROJECT_ID) throw new Error('[Appwrite] NEXT_PUBLIC_APPWRITE_PROJECT_ID is not set in .env.local');
  if (!DATABASE_ID) throw new Error('[Appwrite] NEXT_PUBLIC_APPWRITE_DATABASE_ID is not set in .env.local');
  if (!COLLECTION_ID) throw new Error('[Appwrite] NEXT_PUBLIC_APPWRITE_COLLECTION_ID is not set in .env.local');
}

function wrapAppwriteError(fn: string, err: unknown): never {
  const msg = err instanceof Error ? err.message : String(err);
  // Appwrite returns structured errors with code/type
  const detail = (err as { code?: number; type?: string })?.code
    ? ` (code=${(err as { code: number }).code} type=${(err as { type: string }).type})`
    : '';
  throw new Error(`[Appwrite:${fn}] ${msg}${detail}`);
}

async function getDB() {
  assertEnv();
  const { Client, Databases } = await import('appwrite');
  const client = new Client().setEndpoint(ENDPOINT!).setProject(PROJECT_ID!);
  return new Databases(client);
}

export const subscribeEmail = async (email: string) => {
  try {
    const { ID } = await import('appwrite');
    const db = await getDB();
    return await db.createDocument(DATABASE_ID!, COLLECTION_ID!, ID.unique(), {
      email,
      subscribedAt: new Date().toISOString(),
    });
  } catch (err) {
    wrapAppwriteError('subscribeEmail', err);
  }
};

export const submitQuestion = async (name: string, question: string) => {
  if (!QA_COLLECTION_ID) {
    throw new Error('[Appwrite:submitQuestion] NEXT_PUBLIC_APPWRITE_QA_COLLECTION_ID is not set in .env.local — create the qa_submissions collection first');
  }
  try {
    const { ID } = await import('appwrite');
    const db = await getDB();
    return await db.createDocument(DATABASE_ID!, QA_COLLECTION_ID, ID.unique(), {
      name,
      question,
      answer: null,
      isAnswered: false,
      submittedAt: new Date().toISOString(),
    });
  } catch (err) {
    wrapAppwriteError('submitQuestion', err);
  }
};

export interface QAItem {
  $id: string;
  name: string;
  question: string;
  answer: string;
  submittedAt: string;
}

export const getAnsweredQuestions = async (): Promise<QAItem[]> => {
  if (!QA_COLLECTION_ID) return [];
  try {
    const { Query } = await import('appwrite');
    const db = await getDB();
    const res = await db.listDocuments(DATABASE_ID!, QA_COLLECTION_ID, [
      Query.equal('isAnswered', true),
      Query.orderDesc('submittedAt'),
    ]);
    return res.documents as unknown as QAItem[];
  } catch (err) {
    wrapAppwriteError('getAnsweredQuestions', err);
  }
};
