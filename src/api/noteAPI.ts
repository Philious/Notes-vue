import { NoteProps } from "@/types/types";
import { backend } from "@/api/api";



export const noteAPI = {
  fetchAll: async (): Promise<NoteProps[] | null> => {
    try {
      const response = await backend.get<NoteProps[]>('Notes');
      return response.data;
    } catch (error) {
      Error('Failed to fetch notes');
      return null;
    }
  },
  add: async (note: NoteProps): Promise<NoteProps | null> => {
    try {
      const response = await backend.post<NoteProps>('Notes', note);
      console.log('add', response);
      return response.data;
    } catch (error) {
      Error('Failed to add note');
      return null;
    }
  },
  update: async (note: Partial<NoteProps> & { id: string }): Promise<number | null> => {
    try {
      const response = await backend.put<void>(`Notes/${note.id}`, note);
      console.log('update', response);
      return response.status;
    } catch (error) {
      Error('Failed to update note');
      return null;
    }
  },
  remove: async (noteId: string): Promise<number | null> => {
    try {
      const response = await backend.delete(`Notes/${noteId}`);
      return response.status;
    } catch (error) {
      Error('Failed to delete note');
      return null;
    }
  }
};