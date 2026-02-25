import {
  ref,
  get,
  push,
  set,
  update,
  remove,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { db } from "../firebase";
import type { Posting, Application } from "../types/postings";

const POSTINGS = "postings";
const APPLICATIONS = "applications";

/* ───── helpers ───── */

function snapshotToArray<T extends { id: string }>(snapshot: Awaited<ReturnType<typeof get>>): T[] {
  const items: T[] = [];
  if (snapshot.exists()) {
    snapshot.forEach((child) => {
      items.push({ id: child.key, ...child.val() } as T);
    });
  }
  return items;
}

/* ───── Postings ───── */

export async function getPostings(onlyOpen = false): Promise<Posting[]> {
  let dbQuery;
  if (onlyOpen) {
    dbQuery = query(ref(db, POSTINGS), orderByChild("status"), equalTo("open"));
  } else {
    dbQuery = ref(db, POSTINGS);
  }
  const snap = await get(dbQuery);
  const items = snapshotToArray<Posting>(snap);
  return items.sort((a, b) => b.createdAt - a.createdAt);
}

export async function createPosting(
  data: Omit<Posting, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  const now = Date.now();
  const newRef = push(ref(db, POSTINGS));
  await set(newRef, {
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  return newRef.key!;
}

export async function updatePosting(
  id: string,
  data: Partial<Omit<Posting, "id" | "createdAt">>,
): Promise<void> {
  await update(ref(db, `${POSTINGS}/${id}`), {
    ...data,
    updatedAt: Date.now(),
  });
}

export async function deletePosting(id: string): Promise<void> {
  await remove(ref(db, `${POSTINGS}/${id}`));
}

/* ───── Applications ───── */

export async function getApplications(postingId?: string): Promise<Application[]> {
  let dbQuery;
  if (postingId) {
    dbQuery = query(ref(db, APPLICATIONS), orderByChild("postingId"), equalTo(postingId));
  } else {
    dbQuery = ref(db, APPLICATIONS);
  }
  const snap = await get(dbQuery);
  const items = snapshotToArray<Application>(snap);
  return items.sort((a, b) => b.submittedAt - a.submittedAt);
}

export async function submitApplication(
  data: Omit<Application, "id" | "submittedAt">,
): Promise<string> {
  const newRef = push(ref(db, APPLICATIONS));
  await set(newRef, {
    ...data,
    submittedAt: Date.now(),
  });
  return newRef.key!;
}

export async function deleteApplication(id: string): Promise<void> {
  await remove(ref(db, `${APPLICATIONS}/${id}`));
}
