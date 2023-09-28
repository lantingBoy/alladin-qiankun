<template>
  <Maximize v-if="maximize" />
  <Tabs v-if="tabs" />

  <el-main class="app-main">
    <MicroLoading :loading="microAppLoading"></MicroLoading>

    <div id="subapp-viewport" class="ts" v-if="!mainApp"></div>
    <router-view v-slot="{ Component, route }" v-if="mainApp">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="keepAliveName">
          <component :is="Component" v-if="isRouterShow" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
  <el-footer v-if="footer">
    <Footer />
  </el-footer>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, provide, watch, onMounted, computed } from "vue";
import { registerMicroApps } from "qiankun";
import wsp from "@/config/qiankun.config";
import { storeToRefs } from "pinia";
import { start } from "qiankun";
import "vue-loading-overlay/dist/css/index.css";
import { useDebounceFn } from "@vueuse/core";
import { useGlobalStore } from "@/stores/modules/global";
import { useQiankunStore } from "@/stores/modules/qiankun";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import Maximize from "./components/Maximize.vue";
import Tabs from "@/layouts/components/Tabs/index.vue";
import Footer from "@/layouts/components/Footer/index.vue";
import MicroLoading from "@/components/MicroLoading/index.vue";
import { microAppLoading } from "@/utils/qiankun/loading";

const globalStore = useGlobalStore();
const keepAliveStore = useKeepAliveStore();
const qiankunStore = useQiankunStore();
const { maximize, isCollapse, layout, tabs, footer } = storeToRefs(globalStore);
const { keepAliveName } = storeToRefs(keepAliveStore);
const mainApp = computed(() => qiankunStore.mainApp);
// 注入刷新页面方法
const isRouterShow = ref(true);
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val);
provide("refresh", refreshCurrentPage);

/**
 * @TODO
 * 此处需判断是在基座还是子应用然后去决定显示哪个应用
 */
onMounted(() => {
  const microList = import.meta.env.MODE === "development" ? wsp.Local_Mico : wsp.Remote_Mico;
  registerMicroApps(microList, {
    beforeLoad: () => {},
    afterMount: () => {}
  } as any);

  start({ prefetch: true, sandbox: { experimentalStyleIsolation: true } });
});
// 监听当前页面是否最大化，动态添加 class
watch(
  () => maximize.value,
  () => {
    const app = document.getElementById("main-app") as HTMLElement;
    if (maximize.value) app.classList.add("main-maximize");
    else app.classList.remove("main-maximize");
  },
  { immediate: true }
);

// 监听布局变化，在 body 上添加相对应的 layout class
watch(
  () => layout.value,
  () => {
    const body = document.body as HTMLElement;
    body.setAttribute("class", layout.value);
  },
  { immediate: true }
);

// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref(0);
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth;
  if (!isCollapse.value && screenWidth.value < 1200) globalStore.setGlobalState("isCollapse", true);
  if (isCollapse.value && screenWidth.value > 1200) globalStore.setGlobalState("isCollapse", false);
}, 100);
window.addEventListener("resize", listeningWindow, false);
onBeforeUnmount(() => {
  window.removeEventListener("resize", listeningWindow);
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
