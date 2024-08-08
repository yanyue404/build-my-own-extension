import type { Website } from "../websites";

//   gitlab 优化, 主页 master 分支需要 history 按钮
const website: Website = {
  regexp: /gitlab/,
  init: function () {
    $(document).ready(function () {
      const allText = Array.from(Array.from($(".tree-controls .d-block"))[0].children).map(
        v => v.innerText
      );
      // History 按钮只创建一个
      if (!allText.includes("History")) {
        $(".tree-controls .d-block").prepend(
          `<a class="gl-button btn btn-md btn-default shortcuts-find-file" rel="nofollow" href="${pathname}/-/commits/master/"><span class="gl-button-text">History</span></a>`
        );
      }
    });
  },
};

export default website;
