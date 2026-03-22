import {
  ref,
  get,
  push,
  set,
  update,
  remove,
  onValue,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { db } from "../firebase";
import type { Fundraiser, SiteEvent, Sponsor } from "../types/site";

/* ───── helpers ───── */

function snapshotToArray<T extends { id: string }>(
  snapshot: Awaited<ReturnType<typeof get>>,
): T[] {
  const items: T[] = [];
  if (snapshot.exists()) {
    snapshot.forEach((child) => {
      items.push({ id: child.key, ...child.val() } as T);
    });
  }
  return items;
}

/* ═══════════════════════════════════════════
   Fundraisers
   ═══════════════════════════════════════════ */

const FUNDRAISERS = "fundraisers";

export async function getFundraisers(): Promise<Fundraiser[]> {
  const snap = await get(ref(db, FUNDRAISERS));
  return snapshotToArray<Fundraiser>(snap).sort(
    (a, b) => b.createdAt - a.createdAt,
  );
}

export async function getActiveFundraiser(): Promise<Fundraiser | null> {
  const q = query(
    ref(db, FUNDRAISERS),
    orderByChild("isActive"),
    equalTo(true),
  );
  const snap = await get(q);
  const items = snapshotToArray<Fundraiser>(snap);
  return items.length > 0 ? items[0] : null;
}

/** Real-time listener for the active fundraiser */
export function onActiveFundraiser(
  callback: (f: Fundraiser | null) => void,
): () => void {
  const q = query(
    ref(db, FUNDRAISERS),
    orderByChild("isActive"),
    equalTo(true),
  );
  return onValue(q, (snap) => {
    const items = snapshotToArray<Fundraiser>(snap);
    callback(items.length > 0 ? items[0] : null);
  });
}

export async function createFundraiser(
  data: Omit<Fundraiser, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  const now = Date.now();
  const newRef = push(ref(db, FUNDRAISERS));
  await set(newRef, { ...data, createdAt: now, updatedAt: now });
  return newRef.key!;
}

export async function updateFundraiser(
  id: string,
  data: Partial<Omit<Fundraiser, "id" | "createdAt">>,
): Promise<void> {
  await update(ref(db, `${FUNDRAISERS}/${id}`), {
    ...data,
    updatedAt: Date.now(),
  });
}

export async function deleteFundraiser(id: string): Promise<void> {
  await remove(ref(db, `${FUNDRAISERS}/${id}`));
}

/* ═══════════════════════════════════════════
   Events
   ═══════════════════════════════════════════ */

const EVENTS = "events";

export async function getEvents(): Promise<SiteEvent[]> {
  const snap = await get(ref(db, EVENTS));
  return snapshotToArray<SiteEvent>(snap).sort(
    (a, b) => b.createdAt - a.createdAt,
  );
}

export async function getFeaturedEvents(): Promise<SiteEvent[]> {
  const q = query(
    ref(db, EVENTS),
    orderByChild("isFeatured"),
    equalTo(true),
  );
  const snap = await get(q);
  return snapshotToArray<SiteEvent>(snap).sort(
    (a, b) => b.createdAt - a.createdAt,
  );
}

export async function createEvent(
  data: Omit<SiteEvent, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  const now = Date.now();
  const newRef = push(ref(db, EVENTS));
  await set(newRef, { ...data, createdAt: now, updatedAt: now });
  return newRef.key!;
}

export async function updateEvent(
  id: string,
  data: Partial<Omit<SiteEvent, "id" | "createdAt">>,
): Promise<void> {
  await update(ref(db, `${EVENTS}/${id}`), {
    ...data,
    updatedAt: Date.now(),
  });
}

export async function deleteEvent(id: string): Promise<void> {
  await remove(ref(db, `${EVENTS}/${id}`));
}

/* ═══════════════════════════════════════════
   Sponsors
   ═══════════════════════════════════════════ */

const SPONSORS = "sponsors";

export async function getSponsors(): Promise<Sponsor[]> {
  const snap = await get(ref(db, SPONSORS));
  return snapshotToArray<Sponsor>(snap).sort(
    (a, b) => b.createdAt - a.createdAt,
  );
}

export async function createSponsor(
  data: Omit<Sponsor, "id" | "createdAt">,
): Promise<string> {
  const newRef = push(ref(db, SPONSORS));
  await set(newRef, { ...data, createdAt: Date.now() });
  return newRef.key!;
}

export async function updateSponsor(
  id: string,
  data: Partial<Omit<Sponsor, "id" | "createdAt">>,
): Promise<void> {
  await update(ref(db, `${SPONSORS}/${id}`), data);
}

export async function deleteSponsor(id: string): Promise<void> {
  await remove(ref(db, `${SPONSORS}/${id}`));
}

/* ═══════════════════════════════════════════
   Real-time listeners
   ═══════════════════════════════════════════ */

export function onFundraisers(
  callback: (items: Fundraiser[]) => void,
  onError?: (err: Error) => void,
): () => void {
  return onValue(
    ref(db, FUNDRAISERS),
    (snap) => callback(snapshotToArray<Fundraiser>(snap).sort((a, b) => b.createdAt - a.createdAt)),
    (err) => onError?.(err),
  );
}

export function onAllEvents(
  callback: (items: SiteEvent[]) => void,
  onError?: (err: Error) => void,
): () => void {
  return onValue(
    ref(db, EVENTS),
    (snap) => callback(snapshotToArray<SiteEvent>(snap).sort((a, b) => b.createdAt - a.createdAt)),
    (err) => onError?.(err),
  );
}

export function onSponsors(
  callback: (items: Sponsor[]) => void,
  onError?: (err: Error) => void,
): () => void {
  return onValue(
    ref(db, SPONSORS),
    (snap) => callback(snapshotToArray<Sponsor>(snap).sort((a, b) => b.createdAt - a.createdAt)),
    (err) => onError?.(err),
  );
}
