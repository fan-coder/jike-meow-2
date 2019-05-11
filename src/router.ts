import Vue from "vue";
import Router from "vue-router";

import LogIn from "@/views/LogIn.vue";
import Tools from "@/views/Tools.vue";
import Notification from "@/views/Notification.vue";
import Me from "@/views/Me.vue";
import Settings from "@/views/Settings.vue";
import Following from "@/views/Following.vue";
import Follower from "@/views/Follower.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      name: "all",
      path: "*",
      redirect: "/"
    },
    {
      name: "root",
      path: "/",
      component: LogIn
    },
    {
      name: "notification",
      path: "/notifications",
      component: Notification
    },
    {
      name: "tools",
      path: "/tools",
      component: Tools
    },
    {
      name: "me",
      path: "/me",
      component: Me
    },
    {
      name: "settings",
      path: "/me/settings",
      component: Settings
    },
    {
      name: "following",
      path: "/me/following",
      component: Following
    },
    {
      name: "follower",
      path: "/me/follower",
      component: Follower
    }
  ]
});

router.beforeEach((to, from, next) => {
  const ID_TOKEN: string = localStorage["idToken"];
  const ACCESS_TOKEN: string = localStorage["accessToken"];
  const REFRESH_TOKEN: string = localStorage["refreshToken"];

  /* Unvalid user token  */
  if (!ID_TOKEN || !ACCESS_TOKEN || !REFRESH_TOKEN) {
    if (to.path === "/") {
      next();
      return;
    }

    next("/");
    return;
  }

  /* Redirect logged user to root (login) path */
  if (to.path === "/") {
    const ROUTE_HISTORY: string = localStorage["routeHistory"];

    if (ROUTE_HISTORY) {
      if (ROUTE_HISTORY === "/") localStorage.removeItem("routeHistory");
      next(ROUTE_HISTORY);
      return;
    }

    next("/recommend");
    return;
  }

  next();
});

router.afterEach((to, from) => {
  /* Save route path to localStorage
  To prevent visiting root path when reopen extension's window */
  if (to.path !== "/") localStorage.setItem("routeHistory", to.fullPath);
});

export default router;
