import { Note } from "@/types/types";

export const throttle = <T>(func: (...args: T[]) => void, limit: number): ((...args: T[]) => void) => {
  let inThrottle: boolean;

  return function (...args: T[]) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

export const debounce = <T>(func: (...args: T[]) => void, delay: number): ((...args: T[]) => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (...args: T[]) {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const dateFormat = (date: number | string) => new Date(date).toLocaleDateString('sv-se', { year: "2-digit", month: "2-digit", day: "2-digit" });

export const uid = (): string => Date.now().toString(36) + Math.random().toString(36).substr(2);

export const newNote = (note?: Partial<Note>): Note => {
  const date = new Date().toISOString()
  return {
    id: '',
    title: '',
    content: '',
    catalog: '',
    tags: [],
    createdAt: date,
    updatedAt: date,
    ...(note ?? {})
  }
};

export const getCookie = (name: string): string | undefined => {
  const cookieString: string = document.cookie || "";
  const cookies: Record<string, string> = cookieString.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return cookies[name];
}