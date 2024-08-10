import type { Website } from "../websites";

const website: Website = {
  regexp: /csdn/,
  init: function () {
    $(document).ready(function () {
      (function openCopy() {
        const $$ = (Selector: string): NodeListOf<HTMLElement> =>
          document.querySelectorAll(Selector);
        $$(
          "pre, code, div, p, span,a,i, strong,article, h1,h2,h3,h4,h5,h6, table, caption, tbody, tfoot, thead, tr, th, td"
        ).forEach(el => {
          // 样式可选
          [
            "user-select",
            "-webkit-user-select",
            "-moz-user-select",
            "-ms-user-select",
            "-khtml-user-select",
            "pointer-events",
          ].forEach(prop => el.style.setProperty(prop, "unset", "important"));
          // 事件可选
          [
            "onselect",
            "onselectstart",
            "onselectionchange",
            "oncopy",
            "onbeforecopy",
            "onpaste",
            "onbeforepaste",
          ].forEach(xcanwin => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            el[xcanwin] = e => {
              // 处理能影响文本的事件
              e.stopImmediatePropagation();
            };
          });
        });
      })();
    });
  },
};

export default website;
