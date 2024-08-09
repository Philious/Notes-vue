import { NoteProps } from "@/types/types";

export const throttle = <T extends any[]>(func: (...args: T) => void, limit: number): ((...args: T) => void) => {
  let inThrottle: boolean;

  return function (...args: T) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

export const debounce = <T extends any[]>(func: (...args: T) => void, delay: number): ((...args: T) => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (...args: T) {
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

export const noteHasChanged = (n1?: NoteProps, n2?: NoteProps) => n1 && n2 && (['title', 'content'] as (keyof NoteProps)[]).filter((k) => n1[k] !== n2[k]).length > 0;

export const newNote = (note?: Partial<NoteProps>): NoteProps => {
  const date = new Date().toJSON()
  return {
    id: 'new',
    title: '',
    content: '',
    catalog: '',
    tags: [],
    createdAt: date,
    updatedAt: date,
    ...(note ?? {})
  }
};