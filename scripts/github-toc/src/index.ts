import "./style.css";
import { buildTree, collectHeadings } from "./tree";
import { destroyToc, mountToc } from "./toc";
import { throttle } from "./utils";

const CONTAINER_SELECTOR = [
  "article.markdown-body",
  ".markdown-body",
  ".wiki-body",
  ".js-wiki-body",
  "#wiki-body",
  ".comment-body",
].join(",");

const findContainer = (): HTMLElement | null => {
  const candidates = Array.from(document.querySelectorAll<HTMLElement>(CONTAINER_SELECTOR));
  let best: HTMLElement | null = null;
  let bestCount = 0;
  candidates.forEach(el => {
    const count = el.querySelectorAll("h1,h2,h3,h4,h5,h6").length;
    if (count > bestCount) {
      best = el;
      bestCount = count;
    }
  });
  return bestCount ? best : null;
};

let lastSignature = "";

const signatureOf = (container: HTMLElement): string => {
  return Array.from(container.querySelectorAll("h1,h2,h3,h4,h5,h6"))
    .map(el => `${el.tagName}:${(el.textContent || "").trim()}`)
    .join("|");
};

const render = (): void => {
  const container = findContainer();
  if (!container) {
    if (lastSignature) {
      console.log("[github-toc] container gone, remove panel");
      destroyToc();
      lastSignature = "";
    }
    return;
  }
  const signature = signatureOf(container);
  if (signature === lastSignature && document.querySelector(".github-toc-wrap")) return;

  const headings = collectHeadings(container);
  if (headings.length < 2) {
    destroyToc();
    lastSignature = "";
    return;
  }

  lastSignature = signature;
  mountToc(headings, buildTree(headings));
};

const boot = (): void => {
  render();
  const rerender = throttle(render, 300);
  document.addEventListener("turbo:load", render);
  document.addEventListener("turbo:render", render);
  document.addEventListener("pjax:end", render);
  const observer = new MutationObserver(rerender);
  observer.observe(document.body, { childList: true, subtree: true });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
