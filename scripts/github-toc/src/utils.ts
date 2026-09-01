export const throttle = <T extends (...args: unknown[]) => void>(
  fn: T,
  interval = 200
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let first = true;
  return (...args: Parameters<T>) => {
    if (first) {
      first = false;
      fn(...args);
      return;
    }
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, interval);
  };
};

export const slugify = (text: string, index: number): string => {
  const slug = text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u4e00-\u9fa5-]/g, "")
    .slice(0, 40);
  return `github-toc-${index}-${slug || "heading"}`;
};

export const headingLevel = (el: Element): number => {
  const match = /^H([1-6])$/.exec(el.tagName);
  return match ? Number(match[1]) : 0;
};
