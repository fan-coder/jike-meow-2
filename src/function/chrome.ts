/// <reference types="chrome"/>

export default {
  openLink: (url: string) => {
    chrome.tabs.create({ url: url, active: false });
  }
};
