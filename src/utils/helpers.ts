import Loading from "@/components/Loading.vue";
import { goto } from "@/router/router";
import { menuService } from "@/services/contextMenuService";
import { useNoteStore } from "@/store/noteStore";
import { useUserStore } from "@/store/userStore";
import { PageEnum } from "@/types/enums";
import { defineAsyncComponent } from "vue";

export const setLetterSize = () => {
  menuService.set([
    { label: 'Larger', action: () => document.body.parentElement?.setAttribute('style', 'font-size: larger') },
    { label: 'Large', action: () => document.body.parentElement?.setAttribute('style', 'font-size: large') },
    { label: 'Medium', action: () => document.body.parentElement?.setAttribute('style', 'font-size: medium') },
    { label: 'Small', action: () => document.body.parentElement?.setAttribute('style', 'font-size: small') }
  ]);
}
type Color = `hsl(${number}, ${number}%, ${number}%)` | `rgb(${number}, ${number}, ${number}})` | `#${string}`
export const colorConsole = (msg: string, color: Color) => {
  console.log("%c" + msg, "color:" + color + ";font-weight:bold;");
}
