import { reactive, ref } from "vue"

export type Action = {
  name: string;
  action: () => void;
}

const useDialogService = () => {
  const active = ref(false);
  const dialog = reactive({
    title: ref<string>(''),
    content: ref<string>(''),
    actions: ref<Action[]>([]),
  });
  const open = (title: string, content: string, action: Action[]) => {
    dialog.title = title;
    dialog.content = content;
    dialog.actions = action;
    active.value = true;
  }
  const close = () => {
    active.value = false;
    dialog.title = '';
    dialog.content = '';
    dialog.actions = [];
  }
  return { open, close, active: active, dialog }
}

export const dialogService = useDialogService();
