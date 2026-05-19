import { MenuOption } from "@/types/types"
import { ref } from "vue";

const calcPosition = (el: HTMLElement): string => {
  const pRect = el?.getBoundingClientRect();
  const view = {width: window.innerWidth, height: window.innerHeight }
  const h = view.width / 4 < pRect.left
    ? 'right'
    : view.width / 4 < pRect.right
    ? 'left' : 'center';
    const v = view.height / 4 > pRect.top ? 'bottom' : 'top'
  
    const x = h === 'left'
      ? pRect.left
      : h === 'right'
      ? pRect.right
      :  pRect.left + (pRect.width / 2);
  
    const tx = h === 'left'
      ? '100%'
      : h === 'right'
      ? '-100%'
      : '-50%';

    const y = v === 'bottom' ? pRect.bottom : pRect.top
    const ty = v === 'bottom' ? '0.125rem' : 'calc(-100% - 0.125rem)'

  
    return `top: ${y}px; left: ${x}px; translate: ${tx} ${ty};`
}

const useContenxtMenuService = () => {
  const menuOptions = ref<MenuOption[]>([]);
  const position = ref<string>('')
  const set = (options: MenuOption[], parent?: HTMLElement) => {
    menuOptions.value = options;
    console.log(options, parent?.getBoundingClientRect)
    if (parent) {
      console.log(calcPosition(parent))
      position.value = calcPosition(parent)
    }
  }
  const close = () => menuOptions.value = [];

  return { set, close, menuOptions, position };
}

export const menuService = useContenxtMenuService();