import type { Website } from "../../websites";
import Vue from "vue";
import App from "./App.vue";
import ElementUI, { Notification } from "element-ui";

/**
 * 页面添加样式表
 * @param {String} style 样式资源链接或者样式文本
 */
function loadCss(style: string) {
  // 外部资源链接
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

function mount(
  component: Record<string, unknown>,
  opt: Record<string, unknown>,
  el: HTMLElement | null
) {
  if (!component) {
    console.warn("亲，请传入正确的组件");
  }
  if (!el) {
    el = document.createElement("div");
    document.body.appendChild(el);
  }
  const vm = new Vue({
    el,
    render(h) {
      return h(component, opt);
    },
  });
  return vm;
}

function destroy(vm: any) {
  vm.$el.remove();
  vm.$destroy();
}

const website: Website = {
  regexp: /vuejs\.org/,
  init: function () {
    $(document).ready(function () {
      // 加载elementUI样式表 https://unpkg.com/
      loadCss("https://unpkg.com/element-ui@2.15.14/lib/theme-chalk/index.css");

      // 全局启用elementUI
      Vue.use(ElementUI);
      // 全局toast
      Vue.prototype.$toast = function ({
        message = "",
        title = "",
        type = "info",
        duration = 4000,
        offset = 80,
        showClose = false,
      } = {}) {
        title =
          type == "error"
            ? "错误"
            : type == "warning"
            ? "警告"
            : type == "success"
            ? "成功"
            : "消息";
        return Notification({
          title,
          message,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          type,
          duration,
          showClose,
          offset,
        });
      };
      // 创建 App 实例，并挂载到一个元素上。
      mount(
        App,
        {
          props: {
            message: "Awesome Vue.js!",
          },
        },
        document.querySelector("#hero")
      );
    });
  },
};

export default website;
