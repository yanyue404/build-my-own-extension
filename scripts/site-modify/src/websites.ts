import csdn from "./modules/csdn";
import fontStyle from "./modules/font-style";
import gitlab from "./modules/gitlab";
import zhihu from "./modules/zhihu";
import jianshu from "./modules/jianshu";
import juejin from "./modules/juejin";
import vue from "./modules/vue";

export interface Website {
  regexp: RegExp;
  init: () => void;
}

const websites: Website[] = [csdn, zhihu, fontStyle, gitlab, csdn, jianshu, juejin, vue];

export default websites;
