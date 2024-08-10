// ==UserScript==
// @name        🔥🔥🔥站点魔改(Customize my website style)🔥🔥🔥
// @description 自定义我想修改的站点
// @namespace   https://github.com/yanyue404/build-my-own-extension
// @version     0.0.7
// @author      yanyue404
// @match       https://chinadigitaltimes.net/*
// @match       https://golden-axe.vercel.app/*
// @match       https://yanyue404.github.io/*
// @match       https://developer.mozilla.org/*
// @match       *://*.feishu.cn/*
// @match       *://link.juejin.cn/*
// @match       https://cn.vuejs.org/*
// @match       *://*.csdn.net/*
// @include     /https://gitlab.(.*?){2}.com/((w|-)+/){2,3}/
// @license     MIT License
// @supportURL  https://github.com/yanyue404/build-my-own-extension/issues
// @installURL  https://github.com/yanyue404/build-my-own-extension
// @run-at      document-start
// @require     https://cdn.bootcdn.net/ajax/libs/jquery/3.4.1/jquery.min.js
// @require     https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js
// @require     https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.14/index.min.js
// @icon        https://www.google.com/s2/favicons?sz=64&domain=www.hellofont.cn
// @grant       GM_addStyle
// @grant       unsafeWindow
// @grant       GM_xmlhttpRequest
// ==/UserScript==
(function (Vue, ElementUI) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);
  var ElementUI__default = /*#__PURE__*/_interopDefaultLegacy(ElementUI);

  const website$6 = {
    regexp: /csdn/,
    init: function() {
      $(document).ready(function() {
        (function openCopy() {
          const $$ = (Selector) => document.querySelectorAll(Selector);
          $$(
            "pre, code, div, p, span,a,i, strong,article, h1,h2,h3,h4,h5,h6, table, caption, tbody, tfoot, thead, tr, th, td"
          ).forEach((el) => {
            [
              "user-select",
              "-webkit-user-select",
              "-moz-user-select",
              "-ms-user-select",
              "-khtml-user-select",
              "pointer-events"
            ].forEach((prop) => el.style.setProperty(prop, "unset", "important"));
            [
              "onselect",
              "onselectstart",
              "onselectionchange",
              "oncopy",
              "onbeforecopy",
              "onpaste",
              "onbeforepaste"
            ].forEach((xcanwin) => {
              el[xcanwin] = (e) => {
                e.stopImmediatePropagation();
              };
            });
          });
        })();
      });
    }
  };

  const website$5 = {
    regexp: /chinadigitaltimes|golden-axe|yanyue404\.github|developer\.mozilla|vuejs\.org/,
    init: function() {
      const globol_font_style = `
    * { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji" !important
     }
  `;
      GM_addStyle(globol_font_style);
    }
  };

  const website$4 = {
    regexp: /gitlab/,
    init: function() {
      $(document).ready(function() {
        const allText = Array.from(Array.from($(".tree-controls .d-block"))[0].children).map(
          (v) => v.innerText
        );
        if (!allText.includes("History")) {
          $(".tree-controls .d-block").prepend(
            `<a class="gl-button btn btn-md btn-default shortcuts-find-file" rel="nofollow" href="${pathname}/-/commits/master/"><span class="gl-button-text">History</span></a>`
          );
        }
      });
    }
  };

  const website$3 = {
    regexp: /link\.zhihu/,
    init: function() {
      const result = /.*link.zhihu.com\/\?target=(.*)/.exec(location.href);
      if (result) {
        const url = decodeURIComponent(result[1]);
        if (url) {
          console.log(url);
          location.href = url;
        }
      }
    }
  };

  const website$2 = {
    regexp: /jianshu/,
    init: function() {
      const result = /.*jianshu.com\/go-wild.*url=(.*)/.exec(location.href);
      if (result) {
        const url = decodeURIComponent(result[1]);
        if (url) {
          location.href = url;
        }
      }
    }
  };

  const website$1 = {
    regexp: /link\.juejin/,
    init: function() {
      const result = new URL(location.href).searchParams.get("target");
      if (result) {
        location.href = decodeURIComponent(result);
      }
    }
  };

  var script = {
    name: "App",
    props: ["message"],
    data() {
      return {
        extendData: "这是extend扩展的数据"
      };
    },
    methods: {
      clickFn() {
        this.$toast({
          message: "点击了标题",
          type: "success"
        });
      },
      toVue() {
        window.open("https://github.com/vuejs/core", "_blank");
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
    return function (id, style) {
      return addStyle(id, style);
    };
  }
  var HEAD = document.head || document.getElementsByTagName('head')[0];
  var styles = {};

  function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: new Set(),
      styles: []
    });

    if (!style.ids.has(id)) {
      style.ids.add(id);
      var code = css.source;

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
      }

      if (!style.element) {
        style.element = document.createElement('style');
        style.element.type = 'text/css';
        if (css.media) style.element.setAttribute('media', css.media);
        HEAD.appendChild(style.element);
      }

      if ('styleSheet' in style.element) {
        style.styles.push(code);
        style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
      } else {
        var index = style.ids.size - 1;
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  }

  var browser = createInjector;

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("section", { attrs: { id: "hero", "data-v-74e6ee14": "" } }, [
      _c("img", {
        attrs: {
          id: "uwu",
          alt: "Vue.js Kawaii Logo by @icarusgkx",
          "data-v-74e6ee14": ""
        }
      }),
      _vm._v(" "),
      _c("h1", { staticClass: "tagline", attrs: { "data-v-74e6ee14": "" } }, [
        _c(
          "span",
          {
            staticClass: "accent",
            attrs: { "data-v-74e6ee14": "" },
            on: { click: _vm.clickFn }
          },
          [_vm._v("渐进式 JS 框架")]
        ),
        _vm._v(" "),
        _c("br", { attrs: { "data-v-74e6ee14": "" } }),
        _vm._v("\n    " + _vm._s(_vm.message) + "\n  ")
      ]),
      _vm._v(" "),
      _c(
        "p",
        { staticClass: "description", attrs: { "data-v-74e6ee14": "" } },
        [
          _vm._v("\n    易学易用，性能出色，适用场景丰富的 Web 前端框架。\n    "),
          _c(
            "el-popover",
            {
              attrs: {
                placement: "top-start",
                title: "说明",
                width: "200",
                trigger: "hover",
                content:
                  "2024年8月4日， Github Star（https://github.com/vuejs/core） 46.1k。"
              }
            },
            [
              _c(
                "el-button",
                {
                  attrs: {
                    slot: "reference",
                    type: "success",
                    plain: "",
                    round: ""
                  },
                  on: { click: _vm.toVue },
                  slot: "reference"
                },
                [_vm._v("前往点赞")]
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("p", { staticClass: "actions", attrs: { "data-v-74e6ee14": "" } }, [
        _c(
          "a",
          {
            staticClass: "get-started",
            attrs: { href: "/guide/introduction.html", "data-v-74e6ee14": "" }
          },
          [
            _vm._v("\n      快速上手\n      "),
            _c(
              "svg",
              {
                staticClass: "icon",
                attrs: {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "10",
                  height: "10",
                  viewBox: "0 0 24 24",
                  "data-v-74e6ee14": ""
                }
              },
              [
                _c("path", {
                  attrs: {
                    d:
                      "M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z",
                    "data-v-74e6ee14": ""
                  }
                })
              ]
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "a",
          {
            staticClass: "setup",
            attrs: { href: "/guide/quick-start.html", "data-v-74e6ee14": "" }
          },
          [_vm._v("安装")]
        ),
        _vm._v(" "),
        _c(
          "a",
          {
            staticClass: "security",
            attrs: {
              href: "https://v2.cn.vuejs.org/eol/",
              target: "_blank",
              "data-v-74e6ee14": ""
            }
          },
          [
            _vm._v("\n      获取针对 Vue 2 的安全更新\n      "),
            _c(
              "svg",
              {
                staticClass: "icon",
                attrs: {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 512 512",
                  "data-v-74e6ee14": ""
                }
              },
              [
                _c("path", {
                  attrs: {
                    d:
                      "M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z",
                    "data-v-74e6ee14": ""
                  }
                })
              ]
            )
          ]
        )
      ])
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-202122a0_0", { source: "\n.description[data-v-202122a0] {\r\n  color: #32cd32;\n}\r\n", map: {"version":3,"sources":["F:\\yanyue404\\build-my-own-extension\\packages\\site-modify\\src\\modules\\vue\\App.vue"],"names":[],"mappings":";AA+EA;EACA,cAAA;AACA","file":"App.vue","sourcesContent":["<template>\r\n  <section id=\"hero\" data-v-74e6ee14=\"\">\r\n    <img id=\"uwu\" alt=\"Vue.js Kawaii Logo by @icarusgkx\" data-v-74e6ee14=\"\" />\r\n    <h1 class=\"tagline\" data-v-74e6ee14=\"\">\r\n      <span @click=\"clickFn\" class=\"accent\" data-v-74e6ee14=\"\">渐进式 JS 框架</span>\r\n      <br data-v-74e6ee14=\"\" />\r\n      {{ message }}\r\n    </h1>\r\n    <p class=\"description\" data-v-74e6ee14=\"\">\r\n      易学易用，性能出色，适用场景丰富的 Web 前端框架。\r\n      <el-popover\r\n        placement=\"top-start\"\r\n        title=\"说明\"\r\n        width=\"200\"\r\n        trigger=\"hover\"\r\n        content=\"2024年8月4日， Github Star（https://github.com/vuejs/core） 46.1k。\"\r\n      >\r\n        <el-button slot=\"reference\" type=\"success\" plain round @click=\"toVue\">前往点赞</el-button>\r\n      </el-popover>\r\n    </p>\r\n    <p class=\"actions\" data-v-74e6ee14=\"\">\r\n      <a class=\"get-started\" href=\"/guide/introduction.html\" data-v-74e6ee14=\"\">\r\n        快速上手\r\n        <svg\r\n          class=\"icon\"\r\n          xmlns=\"http://www.w3.org/2000/svg\"\r\n          width=\"10\"\r\n          height=\"10\"\r\n          viewBox=\"0 0 24 24\"\r\n          data-v-74e6ee14=\"\"\r\n        >\r\n          <path\r\n            d=\"M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z\"\r\n            data-v-74e6ee14=\"\"\r\n          ></path>\r\n        </svg>\r\n      </a>\r\n      <a class=\"setup\" href=\"/guide/quick-start.html\" data-v-74e6ee14=\"\">安装</a>\r\n      <a class=\"security\" href=\"https://v2.cn.vuejs.org/eol/\" target=\"_blank\" data-v-74e6ee14=\"\">\r\n        获取针对 Vue 2 的安全更新\r\n        <svg\r\n          class=\"icon\"\r\n          xmlns=\"http://www.w3.org/2000/svg\"\r\n          viewBox=\"0 0 512 512\"\r\n          data-v-74e6ee14=\"\"\r\n        >\r\n          <path\r\n            d=\"M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z\"\r\n            data-v-74e6ee14=\"\"\r\n          ></path>\r\n        </svg>\r\n      </a>\r\n    </p>\r\n  </section>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: \"App\",\r\n  props: [\"message\"],\r\n  data() {\r\n    return {\r\n      extendData: \"这是extend扩展的数据\",\r\n    };\r\n  },\r\n  methods: {\r\n    clickFn() {\r\n      this.$toast({\r\n        message: \"点击了标题\",\r\n        type: \"success\",\r\n      });\r\n    },\r\n    toVue() {\r\n      window.open(\"https://github.com/vuejs/core\", \"_blank\");\r\n    },\r\n  },\r\n};\r\n</script>\r\n<style scoped>\r\n.description {\r\n  color: #32cd32;\r\n}\r\n</style>\r\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = "data-v-202122a0";
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject SSR */
    

    
    var App = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      browser,
      undefined
    );

  function loadCss(style) {
    if (/\.css/.test(style)) {
      const ele = document.createElement("link");
      ele.rel = "stylesheet";
      ele.href = style;
      document.getElementsByTagName("head")[0].appendChild(ele);
      return ele;
    } else {
      return GM_addStyle(style);
    }
  }
  function mount(component, opt, el) {
    if (!component) {
      console.warn("亲，请传入正确的组件");
    }
    if (!el) {
      el = document.createElement("div");
      document.body.appendChild(el);
    }
    const vm = new Vue__default['default']({
      el,
      render(h) {
        return h(component, opt);
      }
    });
    return vm;
  }
  const website = {
    regexp: /vuejs\.org/,
    init: function() {
      $(document).ready(function() {
        loadCss("https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.14/theme-chalk/index.min.css");
        Vue__default['default'].use(ElementUI__default['default']);
        Vue__default['default'].prototype.$toast = function({
          message = "",
          title = "",
          type = "info",
          duration = 4e3,
          offset = 80,
          showClose = false
        } = {}) {
          title = type == "error" ? "错误" : type == "warning" ? "警告" : type == "success" ? "成功" : "消息";
          return ElementUI.Notification({
            title,
            message,
            type,
            duration,
            showClose,
            offset
          });
        };
        mount(
          App,
          {
            props: {
              message: "Awesome Vue.js!"
            }
          },
          document.querySelector("#hero")
        );
      });
    }
  };

  const websites = [website$6, website$3, website$5, website$4, website$6, website$2, website$1, website];

  (() => {
    const mather = (regex, website) => {
      if (regex.test(window.location.href)) {
        website.init();
      }
    };
    websites.forEach((website) => mather(website.regexp, website));
  })();

}(Vue, ELEMENT));
