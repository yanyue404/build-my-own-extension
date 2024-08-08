import type { Website } from "../websites";

declare const GM_addStyle: (css: string) => void; // 声明GM_addStyle函数

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

const website: Website = {
  regexp: /vuejs\.org/,
  init: function () {
    $(document).ready(function () {
      // 加载elementUI样式表
      loadCss("https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.14/theme-chalk/index.min.css");

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
        return ELEMENT.Notification({
          title,
          message,
          type,
          duration,
          showClose,
          offset,
        });
      };
      const App = Vue.extend({
        template: `<section id="hero" data-v-74e6ee14="">
          <img id="uwu" alt="Vue.js Kawaii Logo by @icarusgkx" data-v-74e6ee14="" />
          <h1 class="tagline" data-v-74e6ee14="">
            <span @click="clickFn" class="accent" data-v-74e6ee14="">渐进式 JS 框架</span><br data-v-74e6ee14="" />{{message}}
          </h1>
          <p class="description" data-v-74e6ee14="">易学易用，性能出色，适用场景丰富的 Web 前端框架。
            <el-popover
            placement="top-start"
            title="说明"
            width="200"
            trigger="hover"
            content="2024年8月4日， Github Star（https://github.com/vuejs/core） 46.1k。">
            <el-button slot="reference" type="success" plain round @click="toVue">前往点赞</el-button>
          </el-popover>
          </p>
          <p class="actions" data-v-74e6ee14="">
            <a class="get-started" href="/guide/introduction.html" data-v-74e6ee14="">
              快速上手
              <svg
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                data-v-74e6ee14=""
              >
                <path
                  d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"
                  data-v-74e6ee14=""
                ></path></svg></a
            ><a class="setup" href="/guide/quick-start.html" data-v-74e6ee14="">安装</a
            ><a class="security" href="https://v2.cn.vuejs.org/eol/" target="_blank" data-v-74e6ee14="">
              获取针对 Vue 2 的安全更新
              <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-v-74e6ee14="">
                <path
                  d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"
                  data-v-74e6ee14=""
                ></path></svg
            ></a>
          </p>
          </section>`,
        props: ["message"],
        components: {
          [ELEMENT.Button.name]: ELEMENT.Button,
          [ELEMENT.Popover.name]: ELEMENT.Popover,
        },
        // data 选项是特例，需要注意 - 在 Vue.extend() 中它必须是函数
        data: function () {
          return {
            extendData: "这是extend扩展的数据",
          };
        },
        methods: {
          clickFn() {
            this.$toast({
              message: "点击了标题",
              type: "success",
            });
          },
          toVue() {
            window.open("https://github.com/vuejs/core", "_blank");
          },
        },
      });
      // 创建 App 实例，并挂载到一个元素上。
      // propsData: 创建实例时传递 props(只用于 new 创建的实例中。)。主要作用是方便测试。
      new App({ propsData: { message: "Awesome Vue.js!" } }).$mount("#hero");
    });
  },
};

export default website;
