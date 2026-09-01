// ==UserScript==
// @name        🔥🔥🔥文本选中复制🔥🔥🔥
// @description 解除网站不允许复制的限制，文本选中后点击复制按钮即可复制，主要用于 百度文库 道客巴巴 腾讯文档 豆丁网 无忧考网 学习啦 蓬勃范文 思否社区 力扣 知乎 语雀 等
// @namespace   https://github.com/yanyue404/build-my-own-extension
// @version     6.2.5
// @author      yanyue404
// @match       *://wenku.baidu.com/view/*
// @match       *://wenku.baidu.com/share/*
// @match       *://wenku.baidu.com/link*
// @match       *://wenku.baidu.com/aggs/*
// @match       *://wenku.baidu.com/ndPureView/*
// @match       *://www.51test.net/show/*
// @match       *://www.xuexi.la/*
// @match       *://www.xuexila.com/*
// @match       *://www.cspengbo.com/*
// @match       *://*.doc88.com/*
// @match       *://segmentfault.com/*
// @match       *://wk.baidu.com/view/*
// @match       *://leetcode-cn.com/problems/*
// @match       *://*.zhihu.com/*
// @match       *://z.30edu.com.cn/*
// @match       *://docs.qq.com/doc/*
// @match       *://docs.qq.com/sheet/*
// @match       *://docs.qq.com/slide/*
// @match       *://boke112.com/post/*
// @match       *://*.yuque.com/*
// @match       *://www.commandlinux.com/*
// @match       *://*.diyifanwen.com/*
// @match       *://*.mbalib.com/*
// @match       *://*.cnitpm.com/*
// @match       *://bbs.mihoyo.com/ys/*
// @match       *://*.ruiwen.com/*
// @match       *://www.uemeds.cn/*
// @match       *://www.oh100.com/*
// @match       *://www.aiyuke.com/news/*
// @match       *://www.fwsir.com/*
// @match       *://www.wenxm.cn/*
// @match       *://www.unjs.com/*
// @match       *://www.ahsrst.cn/*
// @match       *://*.yjbys.com/*
// @match       *://*.qidian.com/*
// @match       *://*.zongheng.com/*
// @match       *://*.17k.com/*
// @match       *://*.ciweimao.com/*
// @match       *://book.qq.com/*
// @match       *://*.360doc.com/content/*
// @match       *://*.850500.com/news/*
// @match       *://utaten.com/lyric/*
// @match       *://*.jianbiaoku.com/*
// @match       *://*.kt250.com/*
// @match       *://www.kejudati.com/*
// @match       *://*.xiaohongshu.com/discovery/*
// @match       *://*.baibeike.com/*
// @match       *://*.blog.csdn.net/*
// @match       *://*.bilibili.com/read/*
// @match       *://*.cnki.net/KXReader/*
// @match       *://*.cnrencai.com/*
// @match       *://*.kodiplayer.cn/*
// @match       *://tongxiehui.net/*
// @match       *://*.jianshu.com/p/*
// @match       *://*.linovelib.com/novel/*
// @match       *://*.wjx.cn/*
// @match       *://*.wjx.top/*
// @match       *://*.chazidian.com/*
// @match       *://*.juejin.cn/post/*
// @match       *://*.zgbk.com/ecph/*
// @match       *://*.wenmi.com/article/*
// @match       *://yuedu.baidu.com/*
// @match       *://www.inrrp.com.cn/*
// @match       *://fanyi.baidu.com/mtpe/*
// @match       *://www.shubaoc.com/*
// @match       *://blog.51cto.com/*
// @match       *://www.ximalaya.com/*
// @match       *://*.tianqi.com/*
// @match       *://*.xiexiebang.com/*
// @match       *://*.docin.com/*
// @match       *://*.ddwk8.cn/*
// @match       *://*.php.cn/*
// @match       *://cooco.net.cn/*
// @match       *://fanqienovel.com/*
// @match       *://*.mobiletrain.org/*
// @match       *://*.examcoo.com/*
// @match       *://*.rrdynb.com/*
// @match       *://*.fuwu7.com/*
// @match       *://*.xiangqiqipu.com/*
// @match       *://note.youdao.com/*
// @match       *://*.163.com/*
// @match       *://*.aipiaxi.com/*
// @match       *://wenku.csdn.net/*
// @match       *://www.kdocs.cn/*
// @match       *://www.xiaoyuzhoufm.com/*
// @match       *://*.mcmod.cn/*
// @match       *://*.zsxq.com/
// @match       *://*.volcengine.com/*
// @match       *://*.lyrical-nonsense.com/*
// @match       *://*.xueqiu.com/*
// @match       *://*.php.cn/*
// @match       *://*.51cto.com/*
// @match       *://*.educoder.net/*
// @supportURL  https://github.com/yanyue404/build-my-own-extension/issues
// @license     GPL License
// @installURL  https://github.com/yanyue404/build-my-own-extension
// @run-at      document-start
// @connect     res3.doc88.com
// @grant       unsafeWindow
// @grant       GM_xmlhttpRequest
// ==/UserScript==
(function () {
  'use strict';

  var css_248z$1 = ".__copy-button{align-items:center;background:#4c98f7;border-radius:3px;color:#fff;cursor:pointer;display:flex;font-size:13px;height:30px;justify-content:center;opacity:0;position:absolute;transition:opacity .3s;width:60px;z-index:-1000}";
  var appStyle = css_248z$1;

  var css_248z = "#select-tooltip,#sfModal,.modal-backdrop,div[id^=reader-helper]{display:none!important}.modal-open{overflow:auto!important}._sf_adjust_body{padding-right:0!important}";
  var baseStyle = css_248z;

  const DOM_STAGE = {
    START: "document-start",
    END: "document-end"
  };
  const DOM_READY = "DOMContentLoaded";
  const PAGE_LOADED = "load";
  const MOUSE_UP = "mouseup";
  const MOUSE_DOWN = "mousedown";
  const MOUSE_MOVE = "mousemove";
  const COPY = "copy";
  const SELECT_START = "selectstart";
  const CONTEXT_MENU = "contextmenu";
  const KEY_DOWN = "keydown";

  const opt = Object.prototype.toString;
  function isString(value) {
    return opt.call(value) === "[object String]";
  }

  const dom = {
    query: function(selector) {
      return document.querySelector(selector);
    },
    attr: function(selector, attr, value) {
      const dom2 = document.querySelector(selector);
      dom2 && dom2.setAttribute(attr, value);
    },
    append: function(selector, content) {
      const container = document.createElement("div");
      if (isString(content)) {
        container.innerHTML = content;
      } else {
        container.appendChild(content);
      }
      const targetDOM = document.querySelector(selector);
      targetDOM && targetDOM.append(container);
      return container;
    },
    remove: function(selector) {
      const targetDOM = document.querySelector(selector);
      targetDOM && targetDOM.remove();
    }
  };
  var dom$1 = dom;

  const initBaseEvent = (websiteConfig) => {
    window.addEventListener(DOM_READY, () => {
      if (websiteConfig.initCopyEvent) {
        document.oncopy = (e) => e.stopPropagation();
        document.body.oncopy = (e) => e.stopPropagation();
        document.addEventListener(COPY, (e) => e.stopPropagation());
        document.body.addEventListener(COPY, (e) => e.stopPropagation());
      }
    });
  };
  const initBaseStyle = () => {
    window.addEventListener(DOM_READY, () => {
      dom$1.append("head", `<style>${appStyle}</style>`);
      dom$1.append("head", `<style>${baseStyle}</style>`);
    });
  };

  /*!
   * 外部引用`static.doc88.com`声明
   * 此部分是在处理`doc88.com`才会加载的资源文件，此资源文件由该网站加载时提供
   */
  let path = "";
  const website$u = {
    regexp: /.*doc88\.com\/.+/,
    init: () => {
      dom$1.append(
        "body",
        `<style id="copy-element-hide">#left-menu{display: none !important;}</style>`
      );
      GM_xmlhttpRequest({
        method: "GET",
        url: "https://res3.doc88.com/resources/js/modules/main-v2.min.js?v=2.56",
        onload: function(response) {
          const result = /\("#cp_textarea"\).val\(([\S]*?)\);/.exec(response.responseText);
          if (result)
            path = result[1];
        }
      });
      window.addEventListener("load", () => {
        const cpFn = unsafeWindow.copyText.toString();
        const fnResult = /<textarea[\s\S]*?>'\+([\S]*?)\+"<\/textarea>/.exec(cpFn);
        if (fnResult)
          path = fnResult[1];
      });
    },
    getSelectedText: () => {
      let select = unsafeWindow;
      path.split(".").forEach((v) => {
        select = select[v];
      });
      if (!select) {
        unsafeWindow.Config.vip = 1;
        unsafeWindow.Config.logined = 1;
        dom$1.remove("#copy-element-hide");
      }
      return select;
    }
  };
  var doc88 = website$u;

  const website$t = {
    regexp: /.*segmentfault\.com\/.+/,
    init: function() {
      const body = dom$1.query("body");
      if (body) {
        body.classList.add("_sf_adjust_body");
        body.onclick = () => {
          body.style.paddingRight = "0";
        };
      }
    }
  };
  var sf = website$t;

  const TEXT_PLAIN = "text/plain";
  const TEXT_HTML = "text/html";
  const execCopyCommand = (data) => {
    const textarea = document.createElement("textarea");
    const handler = (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      for (const [key, value] of Object.entries(data)) {
        event.clipboardData && event.clipboardData.setData(key, value);
      }
    };
    textarea.addEventListener(COPY, handler, true);
    textarea.style.position = "fixed";
    textarea.style.left = "-999999999px";
    textarea.style.top = "-999999999px";
    textarea.value = data[TEXT_PLAIN] || " ";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.removeEventListener(COPY, handler);
    document.body.removeChild(textarea);
  };
  const isEmptyContent = (data) => {
    if (!data)
      return true;
    return isString(data) ? !data : !data[TEXT_PLAIN];
  };
  const copy = (data) => {
    const params = isString(data) ? { [TEXT_PLAIN]: data } : data;
    const plainText = params[TEXT_PLAIN];
    if (!plainText)
      return false;
    if (navigator.clipboard && window.ClipboardItem) {
      const dataItems = {};
      for (const [key, value] of Object.entries(params)) {
        const blob = new Blob([value], { type: key });
        dataItems[key] = blob;
      }
      navigator.clipboard.write([new ClipboardItem(dataItems)]).catch(() => {
        execCopyCommand(params);
      });
    } else {
      execCopyCommand(params);
    }
    return true;
  };

  class Instance {
    constructor() {
      this.id = "__copy";
      this.className = "__copy-button";
      this.isReadyToHidden = false;
      this.dom = null;
      this.enable = () => {
        const dom = this.getInstance();
        dom.style.display = "flex";
      };
      this.disable = () => {
        const dom = this.getInstance();
        dom.style.display = "none";
      };
      this.destroy = () => {
        const el = this.getInstance();
        el.remove();
        this.dom = null;
      };
      this.init = (name) => {
        const container = document.createElement("div");
        container.id = this.id;
        container.className = this.className;
        container.innerText = name || "复制";
        container.addEventListener("mouseup", (e) => e.stopPropagation(), true);
        container.addEventListener("mousedown", (e) => e.stopPropagation(), true);
        this.dom = container;
        document.body.appendChild(this.dom);
      };
      this.getInstance = () => {
        if (this.dom === null) {
          this.init();
        }
        return this.dom;
      };
      this.show = (event) => {
        if (this.isReadyToHidden)
          return void 0;
        const dom = this.getInstance();
        dom.style.left = `${event.pageX + 30}px`;
        dom.style.top = `${event.pageY}px`;
        dom.style.opacity = "1";
        dom.style.zIndex = "1000";
      };
      this.hide = (keep = 350) => {
        const dom = this.getInstance();
        dom.style.opacity = "0";
        if (keep) {
          this.isReadyToHidden = true;
          setTimeout(() => {
            dom.style.zIndex = "-10000";
            this.isReadyToHidden = false;
          }, keep);
        }
      };
      this.onCopy = (content, event) => {
        const dom = this.getInstance();
        this.show(event);
        dom.onclick = () => {
          copy(content);
          this.hide();
        };
      };
    }
  }
  const instance = new Instance();
  var instance$1 = instance;

  const stopNativePropagation = (event2) => {
    event2.stopPropagation();
  };
  const event = {
    hideButton: () => {
      instance$1.disable();
    },
    showButton: () => {
      instance$1.enable();
    },
    removeAttributes: (selector, attr = []) => {
      const dom = isString(selector) ? document.querySelector(selector) : selector;
      dom && attr.forEach((item) => dom.removeAttribute(item));
    },
    enableUserSelectByCSS: () => {
      const css = "*{user-select: auto !important;-webkit-user-select: auto !important;}";
      const style = document.createElement("style");
      style.innerText = css;
      const head = document.getElementsByTagName("head")[0];
      if (head) {
        head.appendChild(style);
      } else {
        window.addEventListener(
          PAGE_LOADED,
          () => document.getElementsByTagName("head")[0].appendChild(style)
        );
      }
    },
    enableOnSelectStart: (selector) => {
      const dom = document.querySelector(selector);
      dom && dom.addEventListener(SELECT_START, stopNativePropagation);
    },
    enableOnContextMenu: (selector) => {
      const dom = document.querySelector(selector);
      dom && dom.addEventListener(CONTEXT_MENU, stopNativePropagation);
    },
    enableOnCopy: (selector) => {
      const dom = document.querySelector(selector);
      dom && dom.addEventListener(COPY, stopNativePropagation);
    },
    enableOnKeyDown: (selector) => {
      const dom = document.querySelector(selector);
      dom && dom.addEventListener(KEY_DOWN, (e) => {
        if (e.key === "c" && e.ctrlKey)
          return e.stopPropagation();
      });
    },
    enableOnSelectStartByCapture: () => {
      window.addEventListener(SELECT_START, stopNativePropagation, true);
      document.addEventListener(SELECT_START, stopNativePropagation, true);
    },
    enableOnContextMenuByCapture: () => {
      window.addEventListener(CONTEXT_MENU, stopNativePropagation, true);
      document.addEventListener(CONTEXT_MENU, stopNativePropagation, true);
    },
    enableOnCopyByCapture: () => {
      window.addEventListener(COPY, stopNativePropagation, true);
      document.addEventListener(COPY, stopNativePropagation, true);
    },
    enableOnKeyDownByCapture: () => {
      document.addEventListener(
        KEY_DOWN,
        (e) => e.ctrlKey && e.key.toLocaleUpperCase() === "C" && e.stopPropagation(),
        true
      );
    }
  };
  var utils = event;

  const website$s = {
    regexp: /.*wk\.baidu\.com\/view\/.+/,
    init: function() {
      utils.hideButton();
      utils.enableOnSelectStartByCapture();
      window.onload = () => {
        dom$1.attr(".sf-edu-wenku-vw-container", "style", "");
      };
    }
  };
  var wk = website$s;

  const website$r = {
    regexp: /.*zhihu\.com\/.*/,
    init: function() {
      utils.hideButton();
      utils.enableUserSelectByCSS();
      utils.enableOnCopyByCapture();
      if (location.hostname === "zhuanlan.zhihu.com") {
        const removeFocalPointModal = (mutationsList) => {
          for (const mutation of mutationsList) {
            const addedNodes = mutation.addedNodes;
            for (let i = 0; i < addedNodes.length; i++) {
              const target = addedNodes[i];
              if (target.nodeType != 1)
                return void 0;
              if (target instanceof HTMLDivElement && target.querySelector("[data-focus-scope-start]")) {
                const element = target.querySelector("[data-focus-scope-start]");
                element && element.parentElement && element.parentElement.textContent && element.parentElement.textContent.indexOf("立即登录/注册") > -1 && element.parentElement.parentElement && element.parentElement.parentElement.removeChild(element.parentElement);
              }
            }
          }
        };
        const observer = new MutationObserver(removeFocalPointModal);
        observer.observe(document, { childList: true, subtree: true });
      }
    }
  };
  var zhihu = website$r;

  const website$q = {
    regexp: /.*30edu\.com\.cn\/.+/,
    init: function() {
      window.onload = () => {
        var _a;
        const iframes = document.getElementsByTagName("iframe");
        if (iframes.length === 2) {
          const body = (_a = iframes[1].contentWindow) == null ? void 0 : _a.document.querySelector("body");
          body && utils.removeAttributes(body, ["oncopy", "oncontextmenu", "onselectstart"]);
        }
      };
    }
  };
  var edu30 = website$q;

  const website$p = {
    regexp: /.*docs\.qq\.com\/(doc)|(sheet)\/.+/,
    config: {
      initCopyEvent: false,
      captureInstance: true,
      delay: 100
    },
    init: function() {
      window.onload = () => {
        instance.disable();
      };
    },
    getSelectedText: function() {
      var _a;
      if (unsafeWindow.pad && unsafeWindow.pad.editor && !unsafeWindow.pad.editor.isCopyable()) {
        instance.enable();
        const editor = unsafeWindow.pad.editor;
        if (editor.getCopyContent) {
          const content = editor.getCopyContent() || {};
          const plainText = content.plain || "";
          const htmlText = content.html || "";
          return {
            [TEXT_PLAIN]: plainText,
            [TEXT_HTML]: htmlText
          };
        } else {
          editor._docEnv.copyable = true;
          editor.clipboardManager.copy();
          const plainText = editor.clipboardManager.customClipboard.plain || "";
          const htmlText = editor.clipboardManager.customClipboard.html || "";
          editor._docEnv.copyable = false;
          return {
            [TEXT_PLAIN]: plainText,
            [TEXT_HTML]: htmlText
          };
        }
      }
      if (unsafeWindow.SpreadsheetApp && unsafeWindow.SpreadsheetApp.permissions && unsafeWindow.SpreadsheetApp.permissions.sheetStatus && unsafeWindow.SpreadsheetApp.permissions.sheetStatus.canCopy === false && unsafeWindow.SpreadsheetApp.permissions.sheetStatus.canEdit && unsafeWindow.SpreadsheetApp.permissions.sheetStatus.canEdit() === false) {
        instance.enable();
        const SpreadsheetApp = unsafeWindow.SpreadsheetApp;
        const [selection] = SpreadsheetApp.view.getSelectionRanges();
        if (selection) {
          const text = [];
          const { startColIndex, startRowIndex, endColIndex, endRowIndex } = selection;
          for (let i = startRowIndex; i <= endRowIndex; i++) {
            for (let k = startColIndex; k <= endColIndex; k++) {
              const cell = SpreadsheetApp.workbook.activeSheet.getCellDataAtPosition(i, k);
              if (!cell)
                continue;
              text.push(" ", ((_a = cell.formattedValue) == null ? void 0 : _a.value) || cell.value || "");
            }
            i !== endRowIndex && text.push("\n");
          }
          const str = text.join("");
          return /^\s*$/.test(str) ? "" : str;
        }
      }
      return "";
    }
  };
  var docqq = website$p;

  const website$o = {
    regexp: /.*docs\.qq\.com\/slide\/.+/,
    config: {
      initCopyEvent: false,
      captureInstance: true,
      runAt: "document-start"
    },
    init: function() {
      let webpackJsonp = unsafeWindow.webpackJsonp;
      Object.defineProperty(unsafeWindow, "webpackJsonp", {
        get() {
          return webpackJsonp;
        },
        set(newValue) {
          if (newValue.push.__HOOKED__) {
            return;
          }
          webpackJsonp = newValue;
          const originPush = webpackJsonp.push;
          function push(...args) {
            const [, mods] = args[0];
            for (const [key, fn] of Object.entries(mods)) {
              const stringifyFn = String(fn);
              if (/this\.shouldResponseCopy\(/.test(stringifyFn)) {
                const next = stringifyFn.replace(/this\.shouldResponseCopy\(/g, "(() => true)(");
                mods[key] = new Function(`return (${next})`)();
              }
            }
            return originPush.call(this, ...args);
          }
          push.__HOOKED__ = 1;
          webpackJsonp.push = push;
        }
      });
      window.onload = () => {
        instance.disable();
      };
    }
  };
  var qqSlider = website$o;

  const website$n = {
    regexp: new RegExp(".+://boke112.com/post/.+"),
    init: function() {
      utils.enableOnCopyByCapture();
      const template = `
            <style>
                :not(input):not(textarea)::selection {
                    background-color: #2440B3 !important;
                    color: #fff !important;
                }

                :not(input):not(textarea)::-moz-selection {
                    background-color: #2440B3 !important;
                    color: #fff !important;
                }
            </style>
        `;
      dom$1.append("head", template);
    }
  };
  var boke112 = website$n;

  const website$m = {
    regexp: /diyifanwen/,
    init: function() {
      utils.hideButton();
      utils.enableOnCopyByCapture();
      utils.enableOnKeyDownByCapture();
    }
  };
  var diyifanwen = website$m;

  const website$l = {
    regexp: /mbalib/,
    init: function() {
      window.onload = () => {
        utils.removeAttributes("fullScreenContainer", ["oncopy", "oncontextmenu", "onselectstart"]);
      };
    }
  };
  var mbalib = website$l;

  const website$k = {
    regexp: /cnitpm/,
    init: function() {
      utils.hideButton();
      window.onload = () => {
        utils.removeAttributes("body", ["oncopy", "oncontextmenu", "onselectstart"]);
      };
    }
  };
  var cnitpm = website$k;

  const website$j = {
    regexp: new RegExp(".+bbs.mihoyo.com/.+"),
    init: function() {
      utils.hideButton();
      utils.enableOnCopyByCapture();
      utils.enableOnSelectStartByCapture();
      utils.enableUserSelectByCSS();
    }
  };
  var mihoyo = website$j;

  const website$i = {
    regexp: new RegExp(".+www.uemeds.cn/.+"),
    init: function() {
      utils.hideButton();
      utils.enableUserSelectByCSS();
    }
  };
  var uemeds = website$i;

  const website$h = {
    regexp: new RegExp(".+aiyuke.com/news/.+"),
    init: function() {
      utils.hideButton();
      utils.enableUserSelectByCSS();
    }
  };
  var aiyuke = website$h;

  const website$g = {
    regexp: new RegExp("qidian"),
    init: function() {
      utils.hideButton();
      utils.enableUserSelectByCSS();
      utils.enableOnCopy(".main-read-container");
      utils.enableOnContextMenu(".main-read-container");
    }
  };
  var qidian = website$g;

  const website$f = {
    regexp: new RegExp("zongheng"),
    init: function() {
      utils.removeAttributes(".reader_box", ["style", "unselectable", "onselectstart"]);
      utils.removeAttributes(".reader_main", ["style", "unselectable", "onselectstart"]);
      utils.hideButton();
      utils.enableOnKeyDown("body");
      utils.enableUserSelectByCSS();
      utils.enableOnCopy(".content");
      utils.enableOnContextMenu("body");
      utils.enableOnSelectStart(".content");
    }
  };
  var zongheng = website$f;

  const website$e = {
    regexp: new RegExp("17k"),
    init: () => {
      utils.hideButton();
      utils.enableOnCopy(".readAreaBox .p");
    }
  };
  var k17 = website$e;

  const website$d = {
    regexp: new RegExp("ciweimao"),
    init: function() {
      utils.hideButton();
      utils.enableUserSelectByCSS();
      utils.enableOnCopy("#J_BookCnt");
      utils.enableOnContextMenu("body");
      utils.enableOnSelectStart("#J_BookCnt");
    }
  };
  var ciweimao = website$d;

  const website$c = {
    regexp: new RegExp("book\\.qq"),
    init: function() {
      utils.hideButton();
      utils.enableOnCopy("body");
      utils.enableUserSelectByCSS();
      utils.enableOnContextMenu("body");
      utils.enableOnSelectStart("body");
    }
  };
  var qqbook = website$c;

  const website$b = {
    regexp: new RegExp("utaten"),
    init: function() {
      utils.hideButton();
      utils.enableUserSelectByCSS();
      utils.enableOnSelectStartByCapture();
    }
  };
  var utaten = website$b;

  const website$a = {
    config: {
      runAt: "document-start"
    },
    regexp: new RegExp("wenku.baidu.com/(view|link|aggs).*"),
    init: function() {
      dom$1.append("head", `<style>@media print { body{ display:block; } }</style>`);
      let canvasDataGroup = [];
      const originObject = {
        context2DPrototype: unsafeWindow.document.createElement("canvas").getContext("2d").__proto__
      };
      document.createElement = new Proxy(document.createElement, {
        apply: function(target, thisArg, argumentsList) {
          const element = Reflect.apply(target, thisArg, argumentsList);
          if (argumentsList[0] === "canvas") {
            const tmpData = {
              canvas: element,
              data: []
            };
            element.getContext("2d").fillText = function(...args) {
              tmpData.data.push(args);
              originObject.context2DPrototype.fillText.apply(this, args);
            };
            canvasDataGroup.push(tmpData);
          }
          return element;
        }
      });
      let pageData = {};
      Object.defineProperty(unsafeWindow, "pageData", {
        set: (v) => pageData = v,
        get: function() {
          if (!pageData.vipInfo)
            return pageData.vipInfo = {};
          pageData.vipInfo.global_svip_status = 1;
          pageData.vipInfo.global_vip_status = 1;
          pageData.vipInfo.isVip = 1;
          pageData.vipInfo.isWenkuVip = 1;
          return pageData;
        }
      });
      const templateCSS = [
        "<style id='copy-template-css'>",
        "body{overflow: hidden !important}",
        "#copy-template-html{position: fixed; top: 0; right: 0; bottom: 0; left: 0; display: flex; align-items: center; justify-content: center;z-index: 999999; background: rgba(0,0,0,0.5);}",
        "#copy-template-html > .template-container{height: 80%; width: 80%; background: #fff; }",
        ".template-container > .title-container{display: flex; align-items: center; justify-content: space-between;padding: 10px;border-bottom: 1px solid #eee;}",
        "#copy-template-text{height: 100%; width: 100%;position: relative; overflow: auto;background: #fff;}",
        "#copy-template-html #template-close{cursor: pointer;}",
        "</style>"
      ].join("");
      const render = () => {
        canvasDataGroup = canvasDataGroup.filter((item) => item.canvas.id);
        const templateText = canvasDataGroup.map((canvasData, index) => {
          const computedTop = index * Number(canvasData.canvas.clientHeight);
          const textItem = canvasData.data.map(
            (item) => `<div style="position: absolute; left: ${item[1]}px; top: ${item[2] + computedTop}px">${item[0]}</div>`
          );
          return textItem.join("");
        });
        const templateHTML = [
          "<div id='copy-template-html'>",
          "<div class='template-container'>",
          "<div class='title-container'>",
          "<div>请自行复制</div>",
          "<div id='template-close'>关闭</div>",
          "</div>",
          "<div id='copy-template-text'>",
          templateText.join(""),
          "</div>",
          "</div>",
          "</div>"
        ].join("");
        dom$1.append("body", templateHTML);
        dom$1.append("body", templateCSS);
        const closeButton = document.querySelector("#copy-template-html #template-close");
        const close = () => {
          dom$1.remove("#copy-template-html");
          dom$1.remove("#copy-template-css");
          closeButton && closeButton.removeEventListener("click", close);
        };
        closeButton && closeButton.addEventListener("click", close);
      };
      document.addEventListener("DOMContentLoaded", () => {
        dom$1.append(
          "head",
          `<style>#copy-btn-wk{padding: 10px; background: rgba(0,0,0,0.5);position: fixed; left:0; top: 40%;cursor: pointer;color: #fff; z-index: 99999;}</style>`
        );
        dom$1.append("body", "<div id='copy-btn-wk'>复制</div>");
        const btn = dom$1.query("#copy-btn-wk");
        btn && (btn.onclick = render);
      });
    },
    getSelectedText: () => {
      if (window.getSelection && (window.getSelection() || "").toString()) {
        return (window.getSelection() || "").toString();
      }
      const result = /查看全部包含“([\s\S]*?)”的文档/.exec(document.body.innerHTML);
      if (result)
        return result[1];
      return "";
    }
  };
  var baiduwk = website$a;

  const website$9 = {
    regexp: new RegExp("xiaohongshu"),
    init: function() {
      utils.hideButton();
      utils.enableUserSelectByCSS();
      utils.enableOnKeyDownByCapture();
    }
  };
  var xiaohongshu = website$9;

  const website$8 = {
    regexp: new RegExp("leetcode"),
    init: function() {
      utils.hideButton();
      utils.enableOnCopy("#lc-home");
    }
  };
  var leetcode = website$8;

  const website$7 = {
    regexp: /csdn/,
    init: function() {
      utils.hideButton();
      utils.enableOnCopyByCapture();
      utils.enableUserSelectByCSS();
    }
  };
  var csdn = website$7;

  const website$6 = {
    regexp: new RegExp("bilibili"),
    init: function() {
      utils.hideButton();
      utils.enableOnCopyByCapture();
    }
  };
  var bilibili = website$6;

  const website$5 = {
    regexp: new RegExp("cnki"),
    init: function() {
      utils.hideButton();
      utils.enableOnContextMenuByCapture();
      utils.enableOnKeyDownByCapture();
      utils.enableOnCopyByCapture();
    }
  };
  var cnki = website$5;

  const website$4 = {
    regexp: new RegExp("docin.com/.*"),
    config: {
      initCopyEvent: false,
      captureInstance: true,
      delay: 100
    },
    init: function() {
      window.addEventListener(PAGE_LOADED, () => {
        var _a;
        return (_a = dom$1.query("#j_select")) == null ? void 0 : _a.click();
      });
      dom$1.append("head", "<style>#reader-copy-el{display: none;}</style>");
    },
    getSelectedText: function() {
      if (unsafeWindow.docinReader && unsafeWindow.docinReader.st) {
        return unsafeWindow.docinReader.st;
      }
      return "";
    }
  };
  var docin = website$4;

  const website$3 = {
    config: {
      initCopyEvent: false
    },
    regexp: /note\.youdao\.com\/newEditorV1\/bulb\.html.*/,
    init: function() {
      utils.hideButton();
      if (window.parent && window.parent.location.href.indexOf("ynoteshare") > -1) {
        utils.enableUserSelectByCSS();
        document.addEventListener(MOUSE_DOWN, stopNativePropagation, true);
        document.addEventListener(MOUSE_MOVE, stopNativePropagation, true);
      }
    }
  };
  var youdao = website$3;

  const website$2 = {
    regexp: new RegExp(
      [
        "commandlinux",
        "cnki",
        "ruiwen",
        "oh100",
        "fwsir",
        "wenxm",
        "unjs",
        "ahsrst",
        "yjbys",
        "360doc",
        "850500",
        "jianbiaoku",
        "kt250",
        "kejudati",
        "baibeike",
        "yuque",
        "cnrencai",
        "kodiplayer",
        "tongxiehui",
        "ndPureView",
        "jianshu",
        "linovelib",
        "chazidian",
        "juejin",
        "zgbk",
        "wenmi",
        "yuedu\\.baidu",
        "inrrp",
        "shubaoc",
        "51cto",
        "ximalaya",
        "xiexiebang",
        "ddwk8",
        "php\\.cn",
        "fanqienovel\\.com/reader",
        "cooco\\.net\\.cn",
        "mobiletrain",
        "xiangqiqipu",
        "m\\.163\\.com",
        "aipiaxi",
        "wenku\\.csdn\\.net",
        "xiaoyuzhoufm\\.com",
        "mcmod\\.cn",
        "zsxq\\.com",
        "volcengine\\.com",
        "lyrical-nonsense\\.com",
        "xueqiu\\.com",
        "php\\.cn",
        "51cto\\.com",
        "educoder\\.net"
      ].join("|")
    ),
    init: function() {
      utils.hideButton();
      utils.enableUserSelectByCSS();
      utils.enableOnCopyByCapture();
    }
  };
  var common = website$2;

  const website$1 = {
    regexp: new RegExp(["wjx", "fanyi\\.baidu", "tianqi", "rrdynb", "fuwu7"].join("|")),
    init: function() {
      utils.hideButton();
      utils.enableUserSelectByCSS();
      utils.enableOnCopyByCapture();
      utils.enableOnKeyDownByCapture();
      utils.enableOnSelectStartByCapture();
      utils.enableOnContextMenuByCapture();
    }
  };
  var commonEnhance = website$1;

  const website = {
    config: {
      runAt: DOM_STAGE.START
    },
    regexp: new RegExp(["examcoo"].join("|")),
    init: function() {
      utils.hideButton();
      utils.enableUserSelectByCSS();
      utils.enableOnCopyByCapture();
      utils.enableOnKeyDownByCapture();
      utils.enableOnSelectStartByCapture();
      utils.enableOnContextMenuByCapture();
    }
  };
  var commonPreLoad = website;

  const kdoc = {
    config: {
      runAt: DOM_STAGE.START
    },
    regexp: new RegExp("kdocs"),
    init: function() {
      const patch = () => {
        unsafeWindow.APP && (unsafeWindow.APP.canCopy = () => true);
      };
      if (unsafeWindow.APP) {
        patch();
      } else {
        let APP = void 0;
        Object.defineProperty(unsafeWindow, "APP", {
          configurable: false,
          set: (value) => {
            APP = value;
            value && patch();
          },
          get: () => APP
        });
      }
    }
  };

  const websites = [
    sf,
    wk,
    zhihu,
    edu30,
    qqSlider,
    docqq,
    boke112,
    diyifanwen,
    mbalib,
    cnitpm,
    mihoyo,
    uemeds,
    aiyuke,
    qidian,
    zongheng,
    k17,
    ciweimao,
    qqbook,
    utaten,
    baiduwk,
    xiaohongshu,
    doc88,
    leetcode,
    csdn,
    bilibili,
    cnki,
    docin,
    youdao,
    kdoc,
    common,
    commonEnhance,
    commonPreLoad
  ];
  var websites$1 = websites;

  let siteGetSelectedText = null;
  const initWebsite = () => {
    let websiteConfig = {
      initCopyEvent: true,
      runAt: DOM_STAGE.END,
      captureInstance: false,
      delay: 0
    };
    const mather = (regex, website) => {
      if (regex.test(window.location.href)) {
        if (website.config) {
          websiteConfig = Object.assign(websiteConfig, website.config);
        }
        if (websiteConfig.runAt === DOM_STAGE.END) {
          window.addEventListener(DOM_READY, () => website.init());
        } else {
          website.init();
        }
        if (website.getSelectedText) {
          siteGetSelectedText = website.getSelectedText;
        }
        return true;
      }
      return false;
    };
    websites$1.some((website) => mather(website.regexp, website));
    return websiteConfig;
  };
  const getSelectedText = () => {
    if (siteGetSelectedText)
      return siteGetSelectedText();
    if (window.getSelection)
      return (window.getSelection() || "").toString();
    if (document.getSelection)
      return (document.getSelection() || "").toString();
    if (document.selection)
      return document.selection.createRange().text;
    return "";
  };

  (function() {
    const websiteConfig = initWebsite();
    initBaseEvent(websiteConfig);
    initBaseStyle();
    window.addEventListener(
      MOUSE_UP,
      (e) => {
        const handler = () => {
          const content = getSelectedText();
          if (isEmptyContent(content)) {
            instance$1.hide();
            return void 0;
          }
          instance$1.onCopy(content, e);
        };
        websiteConfig.delay ? setTimeout(handler, websiteConfig.delay) : handler();
      },
      websiteConfig.captureInstance
    );
  })();

}());
