import { onGlobalStateChange } from "qiankun";

// ...

onGlobalStateChange(state => {
  // 获取当前微应用实例信息
  const appInstance = state?.container?.instance || {};

  if (appInstance.activeRule === "/vite") {
    // 当前加载的是 app1 微应用
    // 执行相应逻辑
    console.log(22);
  }

  // 检查其他微应用的判断逻辑...
});
