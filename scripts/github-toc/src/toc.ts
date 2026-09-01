import type { HeadingItem, TocNode } from "./tree";
import { throttle } from "./utils";

const WRAP_CLASS = "github-toc-wrap";
const STICKY_OFFSET = 88;

const bindDrag = (wrap: HTMLElement, handle: HTMLElement): void => {
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let originLeft = 0;
  let originTop = 0;

  handle.addEventListener("mousedown", e => {
    if ((e.target as HTMLElement).closest("a,button")) return;
    dragging = true;
    wrap.style.transition = "none";
    wrap.style.right = "auto";
    const rect = wrap.getBoundingClientRect();
    originLeft = rect.left;
    originTop = rect.top;
    startX = e.clientX;
    startY = e.clientY;
    wrap.style.left = `${originLeft}px`;
    wrap.style.top = `${originTop}px`;
    e.preventDefault();
  });

  document.addEventListener("mousemove", e => {
    if (!dragging) return;
    wrap.style.left = `${originLeft + e.clientX - startX}px`;
    wrap.style.top = `${originTop + e.clientY - startY}px`;
  });

  document.addEventListener("mouseup", () => {
    dragging = false;
    wrap.style.transition = "";
  });
};

const lockParentScroll = (scroller: HTMLElement): void => {
  scroller.addEventListener(
    "wheel",
    (e: WheelEvent) => {
      const atTop = scroller.scrollTop <= 0 && e.deltaY < 0;
      const atBottom =
        scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1 && e.deltaY > 0;
      if (atTop || atBottom) e.preventDefault();
    },
    { passive: false }
  );
};

const renderTree = (nodes: TocNode[], parent: HTMLElement): void => {
  nodes.forEach(node => {
    const li = document.createElement("li");
    li.className = "github-toc-item";
    li.dataset.level = String(node.level);
    li.dataset.id = node.id;

    const link = document.createElement("span");
    link.className = "github-toc-link";
    link.textContent = node.text;
    link.dataset.id = node.id;
    li.appendChild(link);

    if (node.children.length) {
      const ul = document.createElement("ul");
      renderTree(node.children, ul);
      li.appendChild(ul);
    }
    parent.appendChild(li);
  });
};

const openAncestors = (link: HTMLElement): void => {
  let item = link.closest(".github-toc-item") as HTMLElement | null;
  while (item) {
    item.classList.add("is-open");
    const parentList = item.parentElement;
    item = parentList ? (parentList.closest(".github-toc-item") as HTMLElement | null) : null;
  }
};

let teardown: (() => void) | null = null;

export const destroyToc = (): void => {
  teardown && teardown();
  teardown = null;
  document.querySelectorAll(`.${WRAP_CLASS}`).forEach(node => node.remove());
};

export const mountToc = (headings: HeadingItem[], tree: TocNode[]): void => {
  destroyToc();

  const wrap = document.createElement("div");
  wrap.className = WRAP_CLASS;
  const openByDefault = window.innerWidth > 1440;
  wrap.dataset.open = openByDefault ? "true" : "false";

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "github-toc-btn";
  btn.title = "显示 / 隐藏目录";

  const header = document.createElement("div");
  header.className = "github-toc-header";
  header.innerHTML =
    'Table of Content <a href="https://github.com/jawil/GayHub" target="_blank" rel="noreferrer">by GayHub</a>';

  const list = document.createElement("ul");
  list.className = "github-toc-list";
  renderTree(tree, list);

  wrap.appendChild(btn);
  wrap.appendChild(header);
  wrap.appendChild(list);
  document.body.appendChild(wrap);

  bindDrag(wrap, header);
  lockParentScroll(list);

  btn.addEventListener("click", () => {
    wrap.dataset.open = wrap.dataset.open === "true" ? "false" : "true";
  });

  list.addEventListener("click", e => {
    const link = (e.target as HTMLElement).closest(".github-toc-link") as HTMLElement | null;
    if (!link || !link.dataset.id) return;
    const target = document.getElementById(link.dataset.id);
    if (!target) {
      console.warn("[github-toc] heading not found", link.dataset.id);
      return;
    }
    const top = target.getBoundingClientRect().top + window.scrollY - STICKY_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    const item = link.closest(".github-toc-item");
    if (item && item.parentElement?.classList.contains("github-toc-list")) {
      item.classList.toggle("is-open");
    }
  });

  const setActive = (id: string): void => {
    list
      .querySelectorAll(".github-toc-link.is-active")
      .forEach(el => el.classList.remove("is-active"));
    const link = Array.from(list.querySelectorAll<HTMLElement>(".github-toc-link")).find(
      el => el.dataset.id === id
    );
    if (!link) return;
    link.classList.add("is-active");
    openAncestors(link);
    const linkTop = link.getBoundingClientRect().top - list.getBoundingClientRect().top;
    if (list.scrollHeight > list.clientHeight) {
      list.scrollTop += linkTop - list.clientHeight / 2;
    }
  };

  const updateActive = (): void => {
    const marker = window.scrollY + STICKY_OFFSET + 8;
    let current = headings[0];
    headings.forEach(item => {
      const top = item.el.getBoundingClientRect().top + window.scrollY;
      if (top <= marker) current = item;
    });
    if (current) setActive(current.id);
  };

  const onScroll = throttle(updateActive, 160);
  document.addEventListener("scroll", onScroll, { passive: true });
  updateActive();
  teardown = () => document.removeEventListener("scroll", onScroll);
  console.log("[github-toc] mounted", headings.length, "headings");
};
