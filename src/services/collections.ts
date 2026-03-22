import {
  ref,
  push,
  set,
  update,
  remove,
  onValue,
} from "firebase/database";
import { db } from "../firebase";

/**
 * Generic CRUD + real-time listener factory for any Firebase RTDB collection.
 * Every collection follows the same pattern: public-read, auth-write, keyed by
 * push-id, with an `id` field mapped from the snapshot key.
 */
export function createCollection<T extends { id: string }>(
  collectionName: string,
) {
  const collectionRef = () => ref(db, collectionName);
  const itemRef = (id: string) => ref(db, `${collectionName}/${id}`);

  /** Convert a snapshot into an array of T, injecting `id` from each child key. */
  function snapToArray(
    snap: Parameters<Parameters<typeof onValue>[1]>[0],
  ): T[] {
    const items: T[] = [];
    if (snap.exists()) {
      snap.forEach((child) => {
        items.push({ id: child.key, ...child.val() } as T);
      });
    }
    return items;
  }

  return {
    /** Real-time listener. Returns unsubscribe function. */
    onItems(
      callback: (items: T[]) => void,
      onError?: (err: Error) => void,
    ): () => void {
      return onValue(
        collectionRef(),
        (snap) => callback(snapToArray(snap)),
        (err) => onError?.(err),
      );
    },

    /** Add a new item. Returns the generated key. */
    async addItem(data: Omit<T, "id">): Promise<string> {
      const newRef = push(collectionRef());
      await set(newRef, data);
      return newRef.key!;
    },

    /** Partial update of an existing item. */
    async updateItem(id: string, data: Partial<Omit<T, "id">>): Promise<void> {
      await update(itemRef(id), data as Record<string, unknown>);
    },

    /** Delete an item by id. */
    async deleteItem(id: string): Promise<void> {
      await remove(itemRef(id));
    },
  };
}
