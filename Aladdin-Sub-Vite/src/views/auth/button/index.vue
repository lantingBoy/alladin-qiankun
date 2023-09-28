<template>
  <div class="card content-box">
    <span class="text"> 按钮权限 🍓🍇🍈🍉</span>
    <el-alert
      class="mb20"
      :title="`当前用户按钮权限：${JSON.stringify(Object.keys(BUTTONS))}`"
      type="success"
      :closable="false"
    />
    <el-divider content-position="left"> 使用 Hooks 方式绑定权限 </el-divider>
    <el-row class="mb20">
      <el-button type="primary" :icon="CirclePlus"> 新增 </el-button>
      <el-button type="warning" :icon="EditPen"> 编辑 </el-button>
      <el-button type="danger" plain :icon="Delete"> 删除 </el-button>
      <el-button type="info" plain :icon="Upload"> 导入数据 </el-button>
      <el-button type="info" plain :icon="Download"> 导出数据 </el-button>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="authButton">
import { useAuthButtons } from "@/hooks/useAuthButtons";
import { CirclePlus, Delete, EditPen, Download, Upload } from "@element-plus/icons-vue";

const { BUTTONS } = useAuthButtons();
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
