import Vue from "vue";

/* Convert timestamp to countdown time or a specific date */
Vue.filter("reformatTime", (updateTime: string) => {
  const MESSAGE_DATE = new Date(updateTime).getTime(),
    NOW_DATE = new Date().getTime(),
    LAST_TIME = NOW_DATE - MESSAGE_DATE;

  if (LAST_TIME < 0) {
    return "未知时间";
  } else {
    if (LAST_TIME < 60000) {
      return "刚刚";
    } else if (LAST_TIME >= 60000 && LAST_TIME < 3600000) {
      return Math.round(LAST_TIME / 60000) + "分钟前";
    } else if (LAST_TIME >= 3600000 && LAST_TIME < 86400000) {
      return Math.round(LAST_TIME / 3600000) + "小时前";
    } else if (LAST_TIME >= 86400000 && LAST_TIME < 2592000000) {
      return Math.round(LAST_TIME / 86400000) + "天前";
    } else if (LAST_TIME >= 2592000000) {
      const FULL_DATE = new Date(MESSAGE_DATE);
      return `${FULL_DATE.getFullYear()}/${FULL_DATE.getMonth()}/${FULL_DATE.getDay()}`;
    }
  }
});
