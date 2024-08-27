import type { Website } from "../websites";

const website: Website = {
  regexp: /chinadigitaltimes|golden-axe|yanyue404\.github|developer\.mozilla|vuejs\.org/,
  init: function () {
    // 电脑上装了一些不想用来显示文字的字体，故修改字体样式
    const globol_font_style = `
    body, h1,h2,h3,h4, p, a{ font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji" !important
     }

     code[class*=language-], pre[class*=language-] { font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace !important
     }
     code {font-family: source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace !important}
  `;
    GM_addStyle(globol_font_style);
  },
};

export default website;
