"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import type { DocumentData, QuerySnapshot } from "firebase/firestore";
import { z } from "zod";

import { getFirestoreClient } from "@/lib/firebase/client";

export interface UseFirestoreCollectionOptions<T> {
  path: string;
  schema: z.ZodType<T, z.ZodTypeDef, unknown>;
  listen?: boolean;
}

export interface UseFirestoreCollectionResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

export function useFirestoreCollection<T>({
  path,
  schema,
  listen = true
}: UseFirestoreCollectionOptions<T>): UseFirestoreCollectionResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const db = getFirestoreClient();
    const collectionRef = collection(db, path);

    const handleSnapshot = (snapshot: QuerySnapshot<DocumentData>) => {
      const nextData: T[] = [];

      snapshot.forEach((doc) => {
        const raw = { id: doc.id, ...doc.data() };
        const parsed = schema.safeParse(raw);

        if (!parsed.success) {
          console.warn("Skipping invalid Firestore document", parsed.error.flatten());
          return;
        }

        nextData.push(parsed.data);
      });

      if (isMounted) {
        setData(nextData);
        setLoading(false);
        setError(null);
      }
    };

    const handleError = (firestoreError: unknown) => {
      if (!isMounted) {
        return;
      }
      const message = firestoreError instanceof Error ? firestoreError.message : "Unknown Firestore error";
      setError(message);
      setLoading(false);
    };

    if (listen) {
      const unsubscribe = onSnapshot(collectionRef, handleSnapshot, handleError);
      return () => {
        isMounted = false;
        unsubscribe();
      };
    }

    getDocs(collectionRef)
      .then(handleSnapshot)
      .catch(handleError);

    return () => {
      isMounted = false;
    };
  }, [listen, path, schema]);

  return { data, loading, error };
}

