import router from "@/router";
import api from "@/api";
import { Message } from "element-ui";

export default {
  refreshToken: (func?: any) => {
    api
      .refreshToken()
      .then((data: any) => {
        const RESPONSE: any = data.data;

        if (RESPONSE.success === true) {
          localStorage.setItem("accessToken", RESPONSE["x-jike-access-token"]);
          localStorage.setItem(
            "refreshToken",
            RESPONSE["x-jike-refresh-token"]
          );
          if (func) func();
        }
      })
      .catch(() => {
        Message("授权过期，请重新登录");
        localStorage.clear();
        router.push("/");
      });
  }
};
