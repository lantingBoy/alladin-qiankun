<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <template #title>
        <i :class="[subItem.meta.icon, 'iconfont']"></i>
        <span class="sle">{{ subItem.meta.title }}</span>
      </template>
      <SubMenu :menu-list="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
      <!-- <el-icon>
        <component :is="subItem.meta.icon"></component>
      </el-icon> -->
      <i :class="[subItem.meta.icon, 'iconfont']"></i>
      <template #title>
        <span class="sle">{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

defineProps<{ menuList: Menu.MenuOptions[] }>();

const router = useRouter();
const handleClickMenu = (subItem: Menu.MenuOptions) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
  router.push(subItem.path);
};
</script>

<style lang="scss">
.el-sub-menu .el-sub-menu__title:hover {
  color: var(--el-menu-hover-text-color) !important;
  background-color: $el-menu-hoverBg;
}
.sle {
  margin: 0 10px;
}
.el-menu--collapse {
  .is-active {
    .el-sub-menu__title {
      color: #ffffff !important;
      background-color: var(--el-color-primary) !important;
    }
  }
  .el-menu-item {
    height: $el-menu-collapse-height;
  }
}

.el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container) .el-menu-item,
.el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container) .el-sub-menu__title {
  height: $el-menu-height;
  line-height: $el-menu-height;
  border-radius: $el-menu-radius;
}
.el-menu-item {
  height: $el-menu-height;
  line-height: $el-menu-height;
  border-radius: $el-menu-radius;
}
.el-menu-item {
  &:hover {
    color: var(--el-menu-hover-text-color);
    background-color: $el-menu-hoverBg;
    border-radius: $el-menu-radius;
    .iconfont {
      scale: (1.25);
      transition: all 0.4s;
    }
  }
  &.is-active {
    color: var(--el-menu-active-color) !important;
    background-color: var(--el-menu-active-bg-color) !important;
    border-radius: $el-menu-radius;
    /*  &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      content: "";
      background-color: var(--el-color-primary);
    } */
  }
}
.vertical,
.classic,
.transverse {
  .el-menu-item {
    &.is-active {
      &::before {
        left: 0;
      }
    }
  }
}
.columns {
  .el-menu-item {
    &.is-active {
      &::before {
        right: 0;
      }
    }
  }
}
.classic,
.transverse {
  #driver-highlighted-element-stage {
    background-color: #606266 !important;
  }
}
</style>
