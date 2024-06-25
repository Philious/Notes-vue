import { MenuOption } from "@/types/sharedTypes"
import { reactive, ref } from "vue"

const useMenuService = () => {
  const menuOptions = ref<MenuOption[]>();
  const position = ref<DOMRect>()
  const set = (options: MenuOption[], rect: DOMRect) => {
    menuOptions.value = options;
    position.value = rect;
  }
  const close =  () => menuOptions.value = [];
  return reactive({ set, close, menuOptions, position });
}

export const menuSetup = useMenuService();
export const menuService = { set: menuSetup.set, close: menuSetup.close };