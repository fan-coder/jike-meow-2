import axios from "axios";

export default {
  createSessions: () => axios.get("/sessions.create"),
  waitForLogin: (uuid: string) =>
    axios.get(`/sessions.wait_for_login?uuid=${uuid}`),
  waitForConfirmation: (uuid: string) =>
    axios.get(`/sessions.wait_for_confirmation?uuid=${uuid}`),
  refreshToken: () =>
    axios.get("/app_auth_tokens.refresh", {
      headers: {
        "x-jike-refresh-token": localStorage["refreshToken"]
      }
    }),
  profile: () =>
    axios.get("/1.0/users/profile", {
      headers: {
        "x-jike-access-token": localStorage["accessToken"]
      }
    }),
  getNotificationList: (loadMoreKey: object) =>
    axios.post(
      "/1.0/notifications/list",
      {
        loadMoreKey: loadMoreKey
      },
      {
        headers: {
          "x-jike-access-token": localStorage["accessToken"],
          "app-version": "6.0.0"
        }
      }
    ),
  getFollowingList: (loadMoreKey: string, username: any) =>
    axios.post(
      "/1.0/userRelation/getFollowingList",
      {
        limit: 20,
        loadMoreKey: loadMoreKey,
        username: username
      },
      {
        headers: { "x-jike-access-token": localStorage["accessToken"] }
      }
    ),
  getFollowerList: (loadMoreKey: string, username: any) =>
    axios.post(
      "/1.0/userRelation/getFollowerList",
      {
        limit: 20,
        loadMoreKey: loadMoreKey,
        username: username
      },
      {
        headers: { "x-jike-access-token": localStorage["accessToken"] }
      }
    ),
  unfollow: (username: string) =>
    axios.post(
      "/1.0/userRelation/unfollow",
      {
        username: username
      },
      {
        headers: { "x-jike-access-token": localStorage["accessToken"] }
      }
    ),
  follow: (username: string) =>
    axios.post(
      "/1.0/userRelation/follow",
      {
        username: username
      },
      {
        headers: { "x-jike-access-token": localStorage["accessToken"] }
      }
    )
};
