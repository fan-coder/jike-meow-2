import Vue from "vue";
import Router from "vue-router";
import api from "@/api";
import func from "@/function";
import LogIn from "@/views/LogIn.vue";
import Recommend from "@/views/Recommend.vue";
import Me from "@/views/Me.vue";

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
      path: "/recommend",
      component: Recommend
    },
    {
      path: "/me",
      component: Me
    }
  ]
});

router.beforeEach((to, from, next) => {
  const ID_TOKEN: string = localStorage["idToken"];
  const ACCESS_TOKEN: string = localStorage["accessToken"];
  const REFRESH_TOKEN: string = localStorage["refreshToken"];

  // Log status detection
  if (!ID_TOKEN || !ACCESS_TOKEN || !REFRESH_TOKEN) {
    if (to.path === "/") {
      next();
      return;
    }
    next("/");
    return;
  }

  // Redirect logged user to default page
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
    // 401
    api.profile().catch(err => {
      if (err.response.status === 401) {
        func.refreshToken();
      }
    });
    localStorage.setItem("routeHistory", to.fullPath);
  }
});

export default router;
