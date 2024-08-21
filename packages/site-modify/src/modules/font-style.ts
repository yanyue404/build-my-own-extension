import type { Website } from "../websites";

const website: Website = {
  regexp: /chinadigitaltimes|golden-axe|yanyue404\.github|developer\.mozilla|vuejs\.org/,
  init: function () {
    const globol_font_style = `
    * { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji" !important
     }
  `;
    GM_addStyle(globol_font_style);
  },
};

export default website;
