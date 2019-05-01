import Vue from "vue";
import Router from "vue-router";

import api from "@/api";
import func from "@/function";

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
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      component: LogIn
    },
    {
      path: "/notifications",
      component: Notification
    },
    {
      path: "/tools",
      component: Tools
    },
    {
      path: "/me",
      component: Me
    },
    {
      path: "/me/settings",
      name: "settings",
      component: Settings
    },
    {
      path: "/me/following",
      component: Following
    },
    {
      path: "/me/follower",
      component: Follower
    }
  ]
});

router.beforeEach((to, from, next) => {
  const ID_TOKEN: string = localStorage["idToken"];
  const ACCESS_TOKEN: string = localStorage["accessToken"];
  const REFRESH_TOKEN: string = localStorage["refreshToken"];

  if (!ID_TOKEN || !ACCESS_TOKEN || !REFRESH_TOKEN) {
    if (to.path === "/") {
      next();
      return;
    }

    next("/");
    return;
  }

  /* Redirect logged user to default page */
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
  if (to.path !== "/") {
    /* 401 */
    api.profile().catch(err => {
      if (err.response.status === 401) {
        func.refreshToken();
      }
    });
    localStorage.setItem("routeHistory", to.fullPath);
  }
});

export default router;
