<template>
  <div class="loadingWrap" v-if="props.loading">
    <div class="root-loading">
      <img :src="props.logo || LOGO" width="70" />
      <div class="loading">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <!-- <div class="title">恒达智控-智能制造平台</div> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import LOGO from "@/assets/icons/logo.svg";
const props = defineProps({
  loading: Boolean,
  logo: String
});
</script>
<style scoped lang="scss">
.loadingWrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  .root-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .loading.la-dark {
    color: #333333;
  }
  .loading > div {
    position: relative;
    box-sizing: border-box;
    display: inline-block;
    float: none;
    width: 10px;
    height: 10px;
    margin: 4px;
    background-color: currentcolor;
    border: 0 solid currentcolor;
    border-radius: 100%;
    animation: ball-beat 0.7s -0.15s infinite linear;
  }
  .loading {
    position: relative;
    box-sizing: border-box;
    display: block;
    width: 54px;
    height: 18px;
    margin-top: 18px;
    font-size: 0;
    color: #000000;
  }
  .loading > div:nth-child(2n-1) {
    animation-delay: -0.5s;
  }
  .title {
    margin-top: 15px;
    font-size: 16px;
    color: #666666;
  }
  @keyframes ball-beat {
    50% {
      opacity: 0.2;
      transform: scale(0.75);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
