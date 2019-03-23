import Vue from "vue";

const reformatTime = (updateTime: string) => {
  const oldTimestamp = new Date(updateTime).getTime(),
    newTimestamp = new Date().getTime(),
    lastTime = newTimestamp - oldTimestamp;
  if (lastTime < 0) {
    return "未知时间";
  } else {
    if (lastTime < 60000) {
      return "刚刚";
    } else if (lastTime >= 60000 && lastTime < 3600000) {
      return Math.round(lastTime / 60000) + "分钟前";
    } else if (lastTime >= 3600000 && lastTime < 86400000) {
      return Math.round(lastTime / 3600000) + "小时前";
    } else if (lastTime >= 86400000 && lastTime < 2592000000) {
      return Math.round(lastTime / 86400000) + "天前";
    } else if (lastTime >= 2592000000 && lastTime < 31104000000) {
      return Math.round(lastTime / 2592000000) + "月前";
    } else if (lastTime >= 31104000000) {
      return Math.round(lastTime / 31104000000) + "年前";
    }
  }
};

Vue.filter("reformatTime", reformatTime);
