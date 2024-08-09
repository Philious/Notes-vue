import { DBResponse, ScratchpadProps } from "@/types/types";
import { backend } from "@/api/api";

export const scratchAPI = {
  fetch: async (): Promise<ScratchpadProps | null> => {
    try {
      const response = await backend.get<ScratchpadProps>('Scratchpad');

      return response.data;
    } catch (error) {
      Error('Failed to fetch notes');

      return null;
    }
  },
  update: async (content: string): Promise<number | null> => {
    try {
      const response = await backend.put<ScratchpadProps>('Scratchpad', ({ content }));

      return response.status;
    } catch (error) {
      Error('Failed to update scratch note');

      return null;
    }
  }
}