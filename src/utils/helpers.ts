import { menuService } from "@/services/contextMenuService";

export const setLetterSize = () => {
  menuService.set([
    { label: 'Larger', action: () => document.body.parentElement?.setAttribute('style', 'font-size: larger') },
    { label: 'Large', action: () => document.body.parentElement?.setAttribute('style', 'font-size: large') },
    { label: 'Medium', action: () => document.body.parentElement?.setAttribute('style', 'font-size: medium') },
    { label: 'Small', action: () => document.body.parentElement?.setAttribute('style', 'font-size: small') }
  ]);
}

export type Color = `hsl(${number}, ${number}%, ${number}%)` | `rgb(${number}, ${number}, ${number}})` | `#${string}`
export const colorConsole = (msg: string, color: Color) => {
  console.log("%c" + msg, "color:" + color + ";font-weight:bold;");
}
