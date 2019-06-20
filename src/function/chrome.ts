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
      Message({
        showClose: true,
        message: "当前环境错误",
        type: "error"
      });
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      if (tabs[0].url.indexOf("web.okjike.com") > -1) {
        MessageBox.confirm("即将登录网页版", "提示", {
          showClose: false,
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
        // Open official website
        window.open("https://web.okjike.com");

        // Set data to chrome.storage
        chrome.storage.local.set({
          "auth-token": localStorage["refreshToken"],
          "access-token": localStorage["accessToken"],
          "token-timestamp": func.generateTimestamp(new Date())
        });

        // Run content script
        chrome.storage.local.set({
          "auto-login": true
        });
      }
    });
  }
};
