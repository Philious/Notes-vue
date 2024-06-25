import { DataBaseNotes, Note } from "@/types/sharedTypes";

export const noteHasChanged = (database: DataBaseNotes, activeNote: Note): boolean => {
  const note =  database.get(activeNote.id);
  return !note || note.title !== activeNote.title || note.body !== activeNote.body
} 