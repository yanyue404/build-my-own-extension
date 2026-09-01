declare const GM_addStyle: (css: string) => void; // 声明GM_addStyle函数
declare let $: (selector: string | HTMLElement | Document) => any;

declare module "*.vue" {
  import type { defineComponent } from "vue";
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}
