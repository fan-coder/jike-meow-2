/// <reference types="chrome"/>

export default {
  openLink: (url: string) => {
    if (process.env.NODE_ENV === "development") {
      window.open(url);
      return;
    }
    chrome.tabs.create({ url: url, active: false });
  }
};
