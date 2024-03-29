import router from "@/router";
import api from "@/api";
import chrome from "@/function/chrome";
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
        Message({
          showClose: true,
          message: "授权过期，请重新登录",
          type: "error"
        });
        
        localStorage.clear();
        router.push("/");
      });
  },
  linkURL: (data: any) => {
    const DATA = data;
    let LINK = "";

    // Refuse some type of notifications
    if (
      DATA.type === "ANSWER_QUESTION" ||
      DATA.type === "COMMENT_ANSWER" ||
      DATA.type === "LIKE_AVATAR" ||
      DATA.type === "LIKE_QUESTION" ||
      DATA.type === "UPVOTE_ANSWER" ||
      DATA.type === 'LIKE_STORY' ||
      DATA.type === 'COMMENT_STORY' ||
      DATA.type === 'REPLIED_TO_STORY_COMMENT'
    ) {
      Message({
        showClose: true,
        message: "该动态暂不支持网页版",
        type: "warning"
      });
      return;
    }

    switch (DATA.type) {
      case "LIKE_PERSONAL_UPDATE_COMMENT":
      case "LIKE_COMMENT":
      case "LIKE_ANSWER_COMMENT":
      case "REPLIED_TO_ANSWER_COMMENT":
      case "REPLIED_TO_PERSONAL_UPDATE_COMMENT":
      case "REPLY_TO_COMMENT":
        LINK = `https://web.okjike.com/${
          DATA.referenceItem.targetType === "OFFICIAL_MESSAGE"
            ? "message-detail/"
            : "post-detail/"
        }${DATA.referenceItem.targetId}/${
          DATA.referenceItem.targetType === "ORIGINAL_POST"
            ? "originalPost"
            : DATA.referenceItem.targetType === "OFFICIAL_MESSAGE"
            ? "officialMessage"
            : DATA.referenceItem.targetType
        }`;
        break;
      case "COMMENT_AND_REPOST":
      case "COMMENT_PERSONAL_UPDATE":
      case "LIKE_PERSONAL_UPDATE":
      case "MENTION":
      case "PERSONAL_UPDATE_REPOSTED":
      case "REPOST":
        LINK = `https://web.okjike.com/${
          DATA.referenceItem.type === "OFFICIAL_MESSAGE"
            ? "message-detail/"
            : "post-detail/"
        }${DATA.referenceItem.id}/${
          DATA.referenceItem.type === "ORIGINAL_POST"
            ? "originalPost"
            : DATA.referenceItem.type === "OFFICIAL_MESSAGE"
            ? "officialMessage"
            : DATA.referenceItem.type
        }`;
        break;
      default:
        break;
    }

    // Open link in new tab
    if (LINK !== "") chrome.openLink(LINK);
  },
  generateTimestamp: (date: Date) => {
    let tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? "+" : "-",
      pad = function(num: number) {
        var norm = Math.floor(Math.abs(num));
        return (norm < 10 ? "0" : "") + norm;
      };
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds()) +
      dif +
      pad(tzo / 60) +
      ":" +
      pad(tzo % 60)
    );
  }
};
