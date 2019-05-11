<template>
  <div class="me" :class="{ dark: $store.state.isDarkMode }">
    <Header/>

    <main v-if="isGettingProfileData">
      <meow-loading style="margin-top: 150px"/>
    </main>

    <main v-else>
      <!-- Profile -->
      <div class="me-profile">
        <!-- Avatar -->
        <i
          :style="{backgroundImage: 'url(' + data.user.avatarImage.smallPicUrl + ')'}"
          :title="data.user.screenName"
        ></i>
        <div>
          <p class="me-profile-name" :title="data.user.screenName">{{ data.user.screenName }}</p>
          <p class="me-profile-title" v-if="data.user.isVerified" :title="data.user.verifyMessage">
            <i></i>
            <span>{{ data.user.verifyMessage }}</span>
          </p>
        </div>
        <!-- Account Settings -->
        <i class="el-icon-setting" @click.self.stop="$router.push('/me/settings')"></i>
      </div>

      <!-- Bio -->
      <div class="me-bio" v-if="data.user.bio">
        <span>{{ data.user.bio }}</span>
      </div>

      <!-- Following & Followers -->
      <div class="me-follow">
        <div @click.stop="$router.push('/me/following?username=' + data.user.username)">
          <p>关注</p>
          <span>{{ data.user.statsCount.followingCount > 99999 ? '9999+' : data.user.statsCount.followingCount }}</span>
        </div>
        <div @click.stop="$router.push('/me/follower?username=' + data.user.username)">
          <p>粉丝</p>
          <span>{{ data.user.statsCount.followedCount > 99999 ? '99999+' : data.user.statsCount.followedCount }}</span>
        </div>
      </div>

      <!-- Dark Mode -->
      <div class="me-dark-mode">
        <span>夜间模式</span>
        <el-switch v-model="$store.state.isDarkMode" @change="updateTheme"></el-switch>
      </div>

      <!-- Log Out -->
      <div class="me-logout">
        <el-button type="danger" @click.stop="logOut()">退出登录</el-button>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from "@/api";
import func from "@/function";
import Header from "@/components/Header.vue";

@Component({
  components: { Header }
})
export default class Home extends Vue {
  isGettingProfileData: boolean = true;
  isSelectingProfile: boolean = false;
  data: any = {};

  created() {
    this.getData();
  }

  /* Fetch */
  getData() {
    api
      .profile()
      .then((data: any) => {
        this.data = data.data;
        this.isGettingProfileData = false;
      })
      .catch(err => {
        if (err.response.status === 401) {
          func.refreshToken(this.getData());
        }
      });
  }

  /* Update Theme */
  updateTheme(e: boolean) {
    this.$store.commit({
      type: "updateTheme",
      status: e
    });
  }

  /* Log Out */
  logOut() {
    this.$confirm("确认退出？", "警告", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "info",
      iconClass: "el-icon-download"
    })
      .then(() => {
        const STORAGE_TOKEN = localStorage["storageToken"];
        const THEME = localStorage["theme"];
        localStorage.clear();

        if (STORAGE_TOKEN && STORAGE_TOKEN.length > 0)
          localStorage.setItem("storageToken", STORAGE_TOKEN);
        if (THEME && THEME.length > 0) localStorage.setItem("theme", THEME);

        this.$router.replace("/");
      })
      .catch(() => {});
  }
}
</script>

<style lang="scss" scoped>
div.me {
  main {
    display: block;
    height: 500px;
    width: 100%;
    padding: 50px 0 20px 0;
    overflow-y: auto;

    /* Profile */
    div.me-profile {
      display: block;
      position: relative;
      width: 100%;
      padding: 10px 30px;
      font-size: 0;
      transition: background-color 0.3s ease-in-out;

      & > i:first-child {
        display: inline-block;
        vertical-align: middle;
        height: 60px;
        width: 60px;
        background: #e4e7ed center no-repeat;
        background-size: cover;
        border: 1px solid #e4e7ed;
        border-radius: 50%;
      }

      & > div {
        display: inline-block;
        vertical-align: middle;
        width: calc(100% - 115px);
        margin-left: 20px;

        p.me-profile-name {
          display: block;
          font-size: 17px;
          font-weight: bold;
          line-height: 1.6;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Verified Message */
        p.me-profile-title {
          display: block;
          margin-top: 5px;
          width: 100%;

          & > i {
            content: "";
            display: inline-block;
            vertical-align: middle;
            margin-right: 5px;
            height: 18px;
            width: 18px;
            background: url("../assets/verified.svg") center no-repeat;
            background-size: 100%;
          }
          & > span {
            display: inline-block;
            vertical-align: middle;
            width: calc(100% - 23px);
            color: #606266;
            font-size: 13px;
            line-height: 1.6;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }

      & > i:last-child {
        cursor: pointer;
        display: block;
        width: 30px;
        position: absolute;
        top: 27px;
        right: 30px;
        font-size: 26px;
      }
    }

    /* Bio */
    div.me-bio {
      display: block;
      width: 100%;
      padding: 10px 30px;

      & > span {
        font-size: 14px;
        line-height: 1.6;
        color: #606266;
        white-space: pre-wrap;
      }
    }

    /* Following & Followers */
    div.me-follow {
      display: block;
      width: 100%;
      margin-top: 10px;
      padding: 0 30px;
      font-size: 0;

      & > div {
        cursor: pointer;
        display: inline-block;
        vertical-align: middle;
        width: calc(50% - 7.5px);
        padding: 10px;
        text-align: center;
        background-color: #e4e7ed;
        border-radius: 4px;
        transition: background-color 0.15s ease-in-out;

        &:hover {
          color: #303133;
          background-color: #ffe411;
        }
        & > p {
          display: block;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.6;
        }
        & > span {
          display: block;
          font-size: 18px;
          font-weight: 500;
          line-height: 1.6;
        }
      }
      & > div + div {
        margin-left: 15px;
      }
    }

    /* Dark Mode */
    div.me-dark-mode {
      display: block;
      width: 100%;
      margin: 20px auto 0 auto;
      padding: 0 30px;
      text-align: right;

      & > span {
        margin-right: 10px;
      }
    }

    /* Log Out */
    div.me-logout {
      display: block;
      width: 100%;
      margin: 20px auto;
      padding: 0 30px;
      text-align: center;

      & > button {
        width: 100%;
      }
    }
  }
}

div.me.dark {
  main {
    /* Profile */
    div.me-profile {
      & > i:first-child {
        background-color: #262626;
        border-color: #262626;
      }
    }

    /* Bio */
    div.me-bio {
      & > span {
        color: #fff;
      }
    }

    /* Following & Followers */
    div.me-follow {
      & > div {
        background-color: #262626;

        &:hover {
          background-color: #ffe411;
        }
      }
    }
  }
}
</style>
