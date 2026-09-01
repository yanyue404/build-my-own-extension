<template>
  <section id="hero">
    <img id="uwu" alt="Vue.js Kawaii Logo by @icarusgkx" />
    <h1 class="tagline">
      <span @click="clickFn" class="accent">渐进式 JS 框架</span>
      <br />
      {{ message }}
    </h1>
    <p class="description">
      易学易用，性能出色，适用场景丰富的 Web 前端框架。
      <el-popover
        placement="top-start"
        title="说明"
        width="200"
        trigger="hover"
        content="2024年8月4日， Github Star（https://github.com/vuejs/core） 46.1k。"
      >
        <el-button slot="reference" type="success" plain round @click="toVue">前往点赞</el-button>
      </el-popover>
    </p>
    <p class="actions">
      <a class="get-started" href="/guide/introduction.html">
        快速上手
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
        >
          <path
            d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"
          ></path>
        </svg>
      </a>
      <a class="setup" href="/guide/quick-start.html">安装</a>
      <a class="security" href="https://v2.cn.vuejs.org/eol/" target="_blank">
        获取针对 Vue 2 的安全更新
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"
          ></path>
        </svg>
      </a>
    </p>
  </section>
</template>

<script>
export default {
  name: "App",
  props: ["message"],
  data() {
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
};
</script>
<style scoped>
#hero {
  padding: 96px 32px;
  text-align: center;
  #uwu {
    display: none;
  }
  .tagline {
    font-size: 76px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    max-width: 960px;
    margin: 0 auto;
    .accent {
      background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .description {
    max-width: 960px;
    line-height: 1.5;
    color: rgba(60, 60, 60, 0.7);
    transition: color 0.5s;
    font-size: 22px;
    margin: 24px auto 40px;
  }

  .actions a {
    font-size: 16px;
    display: inline-block;
    background-color: #f1f1f1;
    padding: 8px 18px;
    font-weight: 500;
    border-radius: 8px;
    transition: background-color 0.5s, color 0.5s;
  }

  .actions .security {
    background: linear-gradient(#f1f1f1 #f1f1f1) padding-box,
      linear-gradient(45deg, #42d392, #647eff) border-box;
    border: 2px solid transparent;
  }

  .actions .security:hover {
    background: linear-gradient(#e5e5e5, #e5e5e5) padding-box,
      linear-gradient(45deg, #42d392, #647eff) border-box;
  }

  .dark .actions .security:hover {
    background: linear-gradient(#3a3a3a, #3a3a3a) padding-box,
      linear-gradient(45deg, #42d392, #647eff) border-box;
  }

  .actions .security .icon {
    width: 12px;
    height: 12px;
    margin-left: 4px;
  }

  .actions .get-started,
  .actions .setup {
    margin-right: 18px;
  }

  .actions .icon {
    display: inline;
    position: relative;
    top: -1px;
    margin-left: 2px;
    fill: currentColor;
    transition: transform 0.2s;
  }

  .actions .get-started:hover {
    transition-duration: 0.2s;
  }

  .actions .get-started:hover .icon {
    transform: translate(2px);
  }

  .actions .get-started,
  .actions .setup,
  .actions .security {
    color: #476582;
  }

  .actions .get-started:hover,
  .actions .setup:hover,
  .actions .security:hover {
    background-color: #e5e5e5;
    transition-duration: 0.2s;
  }
}
.description {
  color: #32cd32;
}
</style>
