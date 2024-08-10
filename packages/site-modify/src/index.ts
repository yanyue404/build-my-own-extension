import type { Website } from "./websites";
import websites from "./websites";

((): void => {
  const mather = (regex: RegExp, website: Website) => {
    if (regex.test(window.location.href)) {
      website.init();
    }
  };
  websites.forEach(website => mather(website.regexp, website));
})();
