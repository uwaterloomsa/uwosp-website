import {
  ref,
  get,
  push,
  set,
  update as rtdbUpdate,
  remove,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { db } from "../firebase";

/**
 * Get all documents from a path.
 */
export async function getAll(path: string) {
  const snap = await get(ref(db, path));
  const items: { id: string; [key: string]: unknown }[] = [];
  if (snap.exists()) {
    snap.forEach((child) => {
      items.push({ id: child.key as string, ...child.val() });
    });
  }
  return items;
}

/**
 * Get a single record by ID.
 */
export async function getById(path: string, id: string) {
  const snap = await get(ref(db, `${path}/${id}`));
  return snap.exists() ? { id: snap.key as string, ...snap.val() } : null;
}

/**
 * Query records with a single equality filter and optional ordering.
 */
export async function queryDocuments(
  path: string,
  filters: { field: string; op: string; value: unknown }[] = [],
  order?: { field: string; direction?: "asc" | "desc" },
) {
  let dbQuery;

  // RTDB supports one orderByChild + one equalTo per query
  if (filters.length > 0) {
    const f = filters[0];
    dbQuery = query(ref(db, path), orderByChild(f.field), equalTo(f.value as string | number | boolean | null));
  } else if (order) {
    dbQuery = query(ref(db, path), orderByChild(order.field));
  } else {
    dbQuery = ref(db, path);
  }

  const snap = await get(dbQuery);
  const items: { id: string; [key: string]: unknown }[] = [];
  if (snap.exists()) {
    snap.forEach((child) => {
      items.push({ id: child.key as string, ...child.val() });
    });
  }

  // Client-side sort if direction specified
  if (order) {
    items.sort((a, b) => {
      const aVal = a[order.field] as number;
      const bVal = b[order.field] as number;
      return order.direction === "desc" ? bVal - aVal : aVal - bVal;
    });
  }

  return items;
}

/**
 * Add a new record (auto-generated key).
 */
export async function add(path: string, data: Record<string, unknown>) {
  const newRef = push(ref(db, path));
  await set(newRef, data);
  return newRef.key!;
}

/**
 * Update an existing record.
 */
export async function update(
  path: string,
  id: string,
  data: Record<string, unknown>,
) {
  await rtdbUpdate(ref(db, `${path}/${id}`), data);
}

/**
 * Delete a record by ID.
 */
export async function remove_(path: string, id: string) {
  await remove(ref(db, `${path}/${id}`));
}
