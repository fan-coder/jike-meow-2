chrome.storage.local.get(null, res => {
  localStorage.setItem("auth-token", res["auth-token"]);
  localStorage.setItem("access-token", res["access-token"]);
  localStorage.setItem("token-timestamp", res["token-timestamp"]);
  location.reload();
});
