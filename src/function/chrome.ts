/// <reference types="chrome"/>
import func from "@/function";
import { Message, MessageBox } from "element-ui";

export default {
  openLink: (url: string) => {
    if (process.env.NODE_ENV === "development") {
      window.open(url);
      return;
    }
    chrome.tabs.create({ url: url, active: false });
  },
  storeToken: () => {
    // Now allowed in "development" env
    if (process.env.NODE_ENV === "development") {
      Message.error("请在 Chrome Extension 上运行该功能");
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      if (tabs[0].url.indexOf("web.okjike.com") > -1) {
        MessageBox.confirm("即将登录网页版", "提示", {
          confirmButtonText: "登录",
          cancelButtonText: "取消",
          type: "info",
          iconClass: "el-icon-question"
        })
          .then(() => {
            // Set data to chrome.storage
            chrome.storage.local.set({
              "auth-token": localStorage["refreshToken"],
              "access-token": localStorage["accessToken"],
              "token-timestamp": func.generateTimestamp(new Date())
            });

            // Run content script
            chrome.tabs.executeScript({
              file: "./content.js"
            });
          })
          .catch(() => {});
      } else {
        Message.error("请先在浏览器中打开网页版即刻");
        return;
      }
    });
  }
};
