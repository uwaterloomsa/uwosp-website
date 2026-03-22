import { ref, onValue, set } from "firebase/database";
import { db } from "../firebase";

const CONTENT = "content";

export type ContentMap = Record<string, string>;

/**
 * Convert dot-notation key to a Firebase-safe path.
 * "home.hero.title" → "content/home/hero/title"
 */
function contentRef(key: string) {
  return ref(db, `${CONTENT}/${key.replace(/\./g, "/")}`);
}

/**
 * Flatten a nested object back into dot-notation keys.
 * { home: { hero: { title: "X" } } } → { "home.hero.title": "X" }
 */
function flatten(obj: unknown, prefix = ""): ContentMap {
  const result: ContentMap = {};
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      const key = prefix ? `${prefix}.${k}` : k;
      if (v && typeof v === "object" && !Array.isArray(v)) {
        Object.assign(result, flatten(v, key));
      } else if (typeof v === "string") {
        result[key] = v;
      }
    }
  }
  return result;
}

/** Real-time listener for all CMS content. Returns unsubscribe fn. */
export function onContent(
  callback: (content: ContentMap) => void,
  onError?: (err: Error) => void,
): () => void {
  return onValue(
    ref(db, CONTENT),
    (snap) => {
      callback(snap.exists() ? flatten(snap.val()) : {});
    },
    (err) => onError?.(err),
  );
}

/** Save a single content value. Dots in the key become path segments. */
export async function updateContent(key: string, value: string): Promise<void> {
  await set(contentRef(key), value);
}

/** Delete a single content key. */
export async function deleteContent(key: string): Promise<void> {
  await set(contentRef(key), null);
}
