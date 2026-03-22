import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { onContent, updateContent, type ContentMap } from "../services/content";

interface CmsContextValue {
  content: ContentMap;
  isAdmin: boolean;
  get: (key: string, fallback: string) => string;
  save: (key: string, value: string) => Promise<void>;
}

const CmsContext = createContext<CmsContextValue>({
  content: {},
  isAdmin: false,
  get: (_k, fb) => fb,
  save: async () => {},
});

export function useCms() {
  return useContext(CmsContext);
}

export function CmsProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentMap>({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setIsAdmin(!!u));
    return unsub;
  }, []);

  useEffect(() => {
    const unsub = onContent(setContent);
    return unsub;
  }, []);

  const get = useCallback(
    (key: string, fallback: string) => content[key] ?? fallback,
    [content],
  );

  const save = useCallback(async (key: string, value: string) => {
    await updateContent(key, value);
  }, []);

  return (
    <CmsContext.Provider value={{ content, isAdmin, get, save }}>
      {children}
    </CmsContext.Provider>
  );
}
