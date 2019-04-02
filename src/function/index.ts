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
        Message.error("授权过期，请重新登录");
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
      DATA.type === "UPVOTE_ANSWER"
    ) {
      Message.warning("该动态暂不支持网页版");
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
    if (LINK !== "") window.open(LINK);
  }
};
