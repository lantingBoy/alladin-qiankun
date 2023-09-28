import { createApp } from "vue";
import { renderWithQiankun, qiankunWindow } from "vite-plugin-qiankun/es/helper";
import App from "./App.vue";
// reset style sheet
import "@/styles/reset.scss";
// CSS common style sheet
import "@/styles/common.scss";
// iconfont css
import "@/assets/iconfont/iconfont.scss";
// font css
import "@/assets/fonts/font.scss";
// element css
import "element-plus/dist/index.css";

// custom element css
import "@/styles/element.scss";
// svg icons
import "virtual:svg-icons-register";
// element plus
import ElementPlus from "element-plus";
// element icons
import * as Icons from "@element-plus/icons-vue";
// custom directives
import directives from "@/directives/index";
// vue Router
import router from "@/routers";
// pinia store
import pinia from "@/stores";
// errorHandler
import errorHandler from "@/utils/errorHandler";

let app: any;
function render(props: any) {
  const { container } = props;
  app = createApp(App);
  // 注册自定义指令
  Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons]);
  });
  app.config.errorHandler = errorHandler;

  const c = container ? container.querySelector("#vue3-app") : document.getElementById("vue3-app");
  app.use(router).use(pinia).use(directives).use(ElementPlus).mount(c);
}

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
} else {
  // const qiankunStore = QiankunStore();
  console.log("qiankun环境");
  // qiankunStore.setQiankunFlag(true);
}

renderWithQiankun({
  mount(props) {
    props.setGlobalState({ microAppLoading: false });
    render(props);
  },
  bootstrap() {
    console.log("element-plus======子应用注册");
  },
  unmount() {
    console.log("element-plus=====子应用销毁");
    app.unmount();
  },
  update() {
    console.log("element-plus=====子应用更新");
  }
});
