import { setMicroAppLoading } from "@/utils/qiankun/loading";
class WSP {
  // * 子应用列表
  readonly Mico_LIST = ["vite", "dashboard", "scm", "ntc", "wms", "bpms", "rptp", "micro", "mdm", "mdc", "pms"];

  // * 获取子应用路由code
  readonly App_Code = "ntc,scm,wms,bpms,rptp,micro,mdm,mdc,pms";

  // 门户client id
  readonly Client_Id = "wsp";

  // * 首页地址（默认）
  readonly Home_Url = "/wsp";

  // * Tabs（白名单地址，不需要添加到 tabs 的路由地址）
  readonly Tabs_White_List = ["/403", "/404", "/500", this.Home_Url];

  // * 不需要要校验token的白名单
  readonly Router_Whitelist = ["/403", "/404", "/500"];

  // * 默认主题颜色
  readonly Default_Primary = "#1e8fa0";

  // * 主应用名称
  readonly MainApp_Name = "wsp";

  // * 本地子应用
  public Local_Mico = [
    {
      name: "dashboard",
      entry: "//localhost:8881",
      container: "#subapp-viewport",
      activeRule: "/dashboard",
      loader: (loading: boolean) => {
        console.log("loading:=>>> ", loading);
        setMicroAppLoading(loading);
      }
    },
    {
      name: "vite",
      entry: "//localhost:8850",
      container: "#subapp-viewport",
      activeRule: "/vite",
      loader: (loading: boolean) => {
        console.log("loading:=>>> ", loading);
        setMicroAppLoading(loading);
      }
    }
  ];
  // * 生产子应用
  public Remote_Mico = [
    {
      name: "scm",
      entry: "/bgscm-ui/",
      container: "#subapp-viewport",
      activeRule: "/scm"
    }
  ];
}

export default new WSP();
