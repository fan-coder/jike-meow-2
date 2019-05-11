import Vue from "vue";
import moment from "moment";

/* Convert timestamp to countdown time or a specific date */
Vue.filter("reformatTime", (updateTime: string) => {
  const MESSAGE_DATE = new Date(updateTime).getTime(),
    NOW_DATE = new Date().getTime(),
    LAST_TIME = NOW_DATE - MESSAGE_DATE;

  if (LAST_TIME < 0) {
    return "未知时间";
  } else {
    if (LAST_TIME < 120000) {
      return "刚刚";
    } else if (LAST_TIME >= 120000 && LAST_TIME < 3600000) {
      return Math.round(LAST_TIME / 60000) + "分钟前";
    } else if (LAST_TIME >= 3600000 && LAST_TIME < 86400000) {
      return Math.round(LAST_TIME / 3600000) + "小时前";
    } else if (LAST_TIME >= 86400000 && LAST_TIME < 259200000) {
      return Math.round(LAST_TIME / 86400000) + "天前";
    } else if (LAST_TIME >= 259200000) {
      if (
        moment(new Date()).format("YYYY") ===
        moment(MESSAGE_DATE).format("YYYY")
      ) {
        return moment(MESSAGE_DATE).format("MM/DD");
      }
      return moment(MESSAGE_DATE).format("YYYY/MM/DD");
    }
  }
});
