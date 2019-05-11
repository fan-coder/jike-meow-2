/* Store token to localStorage */
(function() {
  var refreshToken = localStorage["auth-token"],
    accessToken = localStorage["access-token"],
    timestamp = localStorage["token-timestamp"];

  if (!refreshToken || !accessToken || !timestamp) {
    chrome.storage.local.get(null, res => {
      localStorage.setItem("auth-token", res["auth-token"]);
      localStorage.setItem("access-token", res["access-token"]);
      localStorage.setItem("token-timestamp", res["token-timestamp"]);
      location.reload();
    });
  }
})();
