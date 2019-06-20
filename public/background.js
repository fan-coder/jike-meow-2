chrome.tabs.onUpdated.addListener(function(tabid, changeinfo, tab) {
  var url = tab.url;

  if (url !== undefined && changeinfo.status === "complete") {
    chrome.storage.local.get(null, function(res) {
      if (res["auto-login"] && url.indexOf("web.okjike.com") > -1) {
        chrome.tabs.executeScript(null, { file: "./content.js" }, function() {
          chrome.storage.local.set({
            "auto-login": false
          });
        });
      }
    });
  }
});
