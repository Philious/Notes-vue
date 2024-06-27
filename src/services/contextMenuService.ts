import { MenuOption } from "@/types/types"
import { reactive, ref } from "vue"

const useContenxtMenuService = () => {
  const menuOptions = ref<MenuOption[]>();
  const position = ref<DOMRect>()
  const set = (options: MenuOption[]) => {
    menuOptions.value = options;
  }
  const close =  () => menuOptions.value = [];
  return reactive({ set, close, menuOptions, position });
}

export default useContenxtMenuService();