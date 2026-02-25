import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  type WhereFilterOp,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../firebase";

/**
 * Get all documents from a collection.
 */
export async function getAll(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Get a single document by ID.
 */
export async function getById(collectionName: string, id: string) {
  const snap = await getDoc(doc(db, collectionName, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/**
 * Query documents with optional filters and ordering.
 */
export async function queryDocuments(
  collectionName: string,
  filters: { field: string; op: WhereFilterOp; value: unknown }[] = [],
  order?: { field: string; direction?: "asc" | "desc" }
) {
  let q = query(collection(db, collectionName));

  for (const f of filters) {
    q = query(q, where(f.field, f.op, f.value));
  }

  if (order) {
    q = query(q, orderBy(order.field, order.direction ?? "asc"));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Add a new document to a collection.
 */
export async function add(collectionName: string, data: DocumentData) {
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef.id;
}

/**
 * Update an existing document.
 */
export async function update(
  collectionName: string,
  id: string,
  data: Partial<DocumentData>
) {
  await updateDoc(doc(db, collectionName, id), data);
}

/**
 * Delete a document by ID.
 */
export async function remove(collectionName: string, id: string) {
  await deleteDoc(doc(db, collectionName, id));
}
