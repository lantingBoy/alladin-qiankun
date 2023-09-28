import { defineStore } from "pinia";
import { QiankunState } from "@/stores/interface";

export const useQiankunStore = defineStore({
  id: "geeker-qiankun",
  state: (): QiankunState => ({
    microAppLoading: false,
    mainApp: false
  }),
  getters: {},
  actions: {
    // Set loading
    setMicroAppLoading(loading: boolean) {
      this.microAppLoading = loading;
    },
    // Set mainApp
    setMainApp(isMainApp: boolean) {
      this.mainApp = isMainApp;
    }
  }
});
