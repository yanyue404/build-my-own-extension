// ==UserScript==
// @name        GitHub TOC 导航
// @description 为 GitHub 的 README / Issue / Wiki / Discussion 生成可嵌套的标题目录，支持滚动高亮与拖拽。移植自 GayHub TOC。
// @namespace   https://github.com/yanyue404/build-my-own-extension
// @version     1.0.0
// @author      yanyue404
// @match       https://github.com/*
// @supportURL  https://github.com/yanyue404/build-my-own-extension/issues
// @license     MIT License
// @installURL  https://github.com/yanyue404/build-my-own-extension
// @run-at      document-idle
// @grant       none
// ==/UserScript==
(function () {
  'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".github-toc-wrap{background-color:#fff;border:1px solid rgba(27,31,35,.15);border-radius:5px;box-shadow:0 3px 12px rgba(27,31,35,.15);display:block;position:fixed;right:3%;top:10%;transition:right .3s ease-out;width:300px;z-index:999}.github-toc-wrap[data-open=false]{right:-280px}.github-toc-btn{background-color:#eff3f6;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg height='16' width='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%234183c4' d='m7.5 8-5 5L1 11.5 4.75 8 1 4.5 2.5 3l5 5z'/%3E%3C/svg%3E\");background-position:50%;background-repeat:no-repeat;border:1px solid rgba(27,31,35,.2);border-radius:3px;cursor:pointer;height:30px;left:10px;padding:0;position:absolute;top:6px;width:30px}.github-toc-wrap[data-open=false] .github-toc-btn{background-color:#fff;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg height='16' width='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.5 3 7 4.5 3.25 8 7 11.5 5.5 13l-5-5 5-5z'/%3E%3C/svg%3E\");left:-36px}.github-toc-header{border-bottom:1px solid #d3d3d3;color:#333;cursor:move;font-size:16px;font-weight:700;line-height:40px;text-align:center;user-select:none}.github-toc-header a{color:green;font-size:12px;font-style:italic;font-weight:400;margin-left:8px;opacity:.7;text-decoration:none}.github-toc-header a:hover{opacity:1}.github-toc-list{list-style:none;margin:0;max-height:550px;overflow:auto;padding:1em}.github-toc-list::-webkit-scrollbar{height:0;width:0}.github-toc-list ul{list-style:none;margin:0;padding:0}.github-toc-item{font-size:12px;line-height:22px;list-style:none;max-height:22px;overflow:hidden;transition:max-height .4s ease-out}.github-toc-list>.github-toc-item{font-size:14px;font-weight:700;line-height:26px;max-height:26px}.github-toc-item.is-open,.github-toc-item:hover{max-height:800px}.github-toc-link{box-sizing:border-box;color:gray;cursor:pointer;display:inline-block;overflow:hidden;padding-left:1em;text-decoration:none;text-overflow:ellipsis;white-space:nowrap;width:100%}.github-toc-link.is-active,.github-toc-link:hover{background-color:#f3f3f3;border-left:2px solid #563d7c;color:#009a61;padding-left:calc(1em - 2px)}.github-toc-item[data-level=\"1\"]>.github-toc-link.is-active{border-left-width:3px;padding-left:calc(1em - 3px)}.github-toc-item[data-level=\"2\"]>.github-toc-link{padding-left:2.5em}.github-toc-item[data-level=\"2\"]>.github-toc-link.is-active,.github-toc-item[data-level=\"2\"]>.github-toc-link:hover{padding-left:calc(2.5em - 2px)}.github-toc-item[data-level=\"3\"]>.github-toc-link{padding-left:3.5em}.github-toc-item[data-level=\"3\"]>.github-toc-link.is-active,.github-toc-item[data-level=\"3\"]>.github-toc-link:hover{padding-left:calc(3.5em - 2px)}.github-toc-item[data-level=\"4\"]>.github-toc-link{padding-left:4.5em}.github-toc-item[data-level=\"4\"]>.github-toc-link.is-active,.github-toc-item[data-level=\"4\"]>.github-toc-link:hover{padding-left:calc(4.5em - 2px)}.github-toc-item[data-level=\"5\"]>.github-toc-link{padding-left:5.5em}.github-toc-item[data-level=\"5\"]>.github-toc-link.is-active,.github-toc-item[data-level=\"5\"]>.github-toc-link:hover{padding-left:calc(5.5em - 2px)}.github-toc-item[data-level=\"6\"]>.github-toc-link{padding-left:6.5em}.github-toc-item[data-level=\"6\"]>.github-toc-link.is-active,.github-toc-item[data-level=\"6\"]>.github-toc-link:hover{padding-left:calc(6.5em - 2px)}@media (prefers-color-scheme:dark){.github-toc-wrap{background-color:#161b22;border-color:#30363d}.github-toc-header{border-bottom-color:#30363d;color:#c9d1d9}.github-toc-link.is-active,.github-toc-link:hover{background-color:#21262d}}";
  styleInject(css_248z);

  const throttle = (fn, interval = 200) => {
    let timer = null;
    let first = true;
    return (...args) => {
      if (first) {
        first = false;
        fn(...args);
        return;
      }
      if (timer)
        return;
      timer = setTimeout(() => {
        timer = null;
        fn(...args);
      }, interval);
    };
  };
  const slugify = (text, index) => {
    const slug = text.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\u4e00-\u9fa5-]/g, "").slice(0, 40);
    return `github-toc-${index}-${slug || "heading"}`;
  };
  const headingLevel = (el) => {
    const match = /^H([1-6])$/.exec(el.tagName);
    return match ? Number(match[1]) : 0;
  };

  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  const collectHeadings = (container) => {
    const nodes = container.querySelectorAll("h1,h2,h3,h4,h5,h6");
    const items = [];
    nodes.forEach((el, index) => {
      const level = headingLevel(el);
      const text = (el.textContent || "").trim();
      if (!level || !text)
        return;
      if (!el.id) {
        el.id = slugify(text, index);
      }
      items.push({ level, text, id: el.id, el });
    });
    return items;
  };
  const buildTree = (headings) => {
    const root = [];
    const stack = [];
    headings.forEach((heading) => {
      const node = __spreadProps(__spreadValues({}, heading), { children: [] });
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

  const WRAP_CLASS = "github-toc-wrap";
  const STICKY_OFFSET = 88;
  const bindDrag = (wrap, handle) => {
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let originLeft = 0;
    let originTop = 0;
    handle.addEventListener("mousedown", (e) => {
      if (e.target.closest("a,button"))
        return;
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
    document.addEventListener("mousemove", (e) => {
      if (!dragging)
        return;
      wrap.style.left = `${originLeft + e.clientX - startX}px`;
      wrap.style.top = `${originTop + e.clientY - startY}px`;
    });
    document.addEventListener("mouseup", () => {
      dragging = false;
      wrap.style.transition = "";
    });
  };
  const lockParentScroll = (scroller) => {
    scroller.addEventListener(
      "wheel",
      (e) => {
        const atTop = scroller.scrollTop <= 0 && e.deltaY < 0;
        const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1 && e.deltaY > 0;
        if (atTop || atBottom)
          e.preventDefault();
      },
      { passive: false }
    );
  };
  const renderTree = (nodes, parent) => {
    nodes.forEach((node) => {
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
  const openAncestors = (link) => {
    let item = link.closest(".github-toc-item");
    while (item) {
      item.classList.add("is-open");
      const parentList = item.parentElement;
      item = parentList ? parentList.closest(".github-toc-item") : null;
    }
  };
  let teardown = null;
  const destroyToc = () => {
    teardown && teardown();
    teardown = null;
    document.querySelectorAll(`.${WRAP_CLASS}`).forEach((node) => node.remove());
  };
  const mountToc = (headings, tree) => {
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
    header.innerHTML = 'Table of Content <a href="https://github.com/jawil/GayHub" target="_blank" rel="noreferrer">by GayHub</a>';
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
    list.addEventListener("click", (e) => {
      var _a;
      const link = e.target.closest(".github-toc-link");
      if (!link || !link.dataset.id)
        return;
      const target = document.getElementById(link.dataset.id);
      if (!target) {
        console.warn("[github-toc] heading not found", link.dataset.id);
        return;
      }
      const top = target.getBoundingClientRect().top + window.scrollY - STICKY_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
      const item = link.closest(".github-toc-item");
      if (item && ((_a = item.parentElement) == null ? void 0 : _a.classList.contains("github-toc-list"))) {
        item.classList.toggle("is-open");
      }
    });
    const setActive = (id) => {
      list.querySelectorAll(".github-toc-link.is-active").forEach((el) => el.classList.remove("is-active"));
      const link = Array.from(list.querySelectorAll(".github-toc-link")).find(
        (el) => el.dataset.id === id
      );
      if (!link)
        return;
      link.classList.add("is-active");
      openAncestors(link);
      const linkTop = link.getBoundingClientRect().top - list.getBoundingClientRect().top;
      if (list.scrollHeight > list.clientHeight) {
        list.scrollTop += linkTop - list.clientHeight / 2;
      }
    };
    const updateActive = () => {
      const marker = window.scrollY + STICKY_OFFSET + 8;
      let current = headings[0];
      headings.forEach((item) => {
        const top = item.el.getBoundingClientRect().top + window.scrollY;
        if (top <= marker)
          current = item;
      });
      if (current)
        setActive(current.id);
    };
    const onScroll = throttle(updateActive, 160);
    document.addEventListener("scroll", onScroll, { passive: true });
    updateActive();
    teardown = () => document.removeEventListener("scroll", onScroll);
    console.log("[github-toc] mounted", headings.length, "headings");
  };

  const CONTAINER_SELECTOR = [
    "article.markdown-body",
    ".markdown-body",
    ".wiki-body",
    ".js-wiki-body",
    "#wiki-body",
    ".comment-body"
  ].join(",");
  const findContainer = () => {
    const candidates = Array.from(document.querySelectorAll(CONTAINER_SELECTOR));
    let best = null;
    let bestCount = 0;
    candidates.forEach((el) => {
      const count = el.querySelectorAll("h1,h2,h3,h4,h5,h6").length;
      if (count > bestCount) {
        best = el;
        bestCount = count;
      }
    });
    return bestCount ? best : null;
  };
  let lastSignature = "";
  const signatureOf = (container) => {
    return Array.from(container.querySelectorAll("h1,h2,h3,h4,h5,h6")).map((el) => `${el.tagName}:${(el.textContent || "").trim()}`).join("|");
  };
  const render = () => {
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
    if (signature === lastSignature && document.querySelector(".github-toc-wrap"))
      return;
    const headings = collectHeadings(container);
    if (headings.length < 2) {
      destroyToc();
      lastSignature = "";
      return;
    }
    lastSignature = signature;
    mountToc(headings, buildTree(headings));
  };
  const boot = () => {
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

}());
