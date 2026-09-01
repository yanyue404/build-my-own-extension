import { headingLevel, slugify } from "./utils";

export type HeadingItem = {
  level: number;
  text: string;
  id: string;
  el: HTMLElement;
};

export type TocNode = HeadingItem & { children: TocNode[] };

export const collectHeadings = (container: HTMLElement): HeadingItem[] => {
  const nodes = container.querySelectorAll<HTMLElement>("h1,h2,h3,h4,h5,h6");
  const items: HeadingItem[] = [];
  nodes.forEach((el, index) => {
    const level = headingLevel(el);
    const text = (el.textContent || "").trim();
    if (!level || !text) return;
    if (!el.id) {
      el.id = slugify(text, index);
    }
    items.push({ level, text, id: el.id, el });
  });
  return items;
};

/** 按标题层级压栈生成任意深度的目录树，对应 GayHub 的 h1h2h3 正则嵌套。 */
export const buildTree = (headings: HeadingItem[]): TocNode[] => {
  const root: TocNode[] = [];
  const stack: TocNode[] = [];
  headings.forEach(heading => {
    const node: TocNode = { ...heading, children: [] };
    while (stack.length && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }
    if (!stack.length) {
      root.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }
    stack.push(node);
  });
  return root;
};
