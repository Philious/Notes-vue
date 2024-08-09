import { localScratchAPI } from "@/api/localAPI";
import { scratchAPI } from "@/api/scratchAPI";
import { ScratchpadProps } from "@/types/types";
import { defineStore } from "pinia";
import { readonly, ref } from "vue";

export const useScratchStore = defineStore('scratchpad', () => {
  const api = import.meta.env.VITE_DATABASE === 'server' ? scratchAPI : localScratchAPI;
  const internalScratch = ref<ScratchpadProps | null>();
  const scratchpad = readonly(internalScratch);

  const fetchScratch = async () => {
    const scratch = await api.fetch();
    if (scratch) internalScratch.value = scratch;

    return scratch;
  };

  const updateScratch = async (content: string) => {
    const status = await api.update(content);
    internalScratch.value = { content, updatedAt: new Date().toJSON() };
    return status === 200 ? 'OK' : 'Error';
  }

  return { scratchpad, fetchScratch, updateScratch }
});