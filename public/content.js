/* Store token to localStorage */
(function() {
  var refreshToken = localStorage["auth-token"],
    accessToken = localStorage["access-token"],
    timestamp = localStorage["token-timestamp"];

  if (!refreshToken || !accessToken || !timestamp) {
    chrome.storage.local.get(null, function(res) {
      localStorage.setItem("auth-token", res["auth-token"]);
      localStorage.setItem("access-token", res["access-token"]);
      localStorage.setItem("token-timestamp", res["token-timestamp"]);
      location.reload();
    });
  } else {
    if (
      confirm("检测到当前为 “已登录” 状态，是否强制登录新的账号？") === true
    ) {
      chrome.storage.local.get(null, function(res) {
        localStorage.setItem("auth-token", res["auth-token"]);
        localStorage.setItem("access-token", res["access-token"]);
        localStorage.setItem("token-timestamp", res["token-timestamp"]);
        location.reload();
      });
    }
  }
})();
