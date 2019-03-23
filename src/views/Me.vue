<template>
  <div class="me" :class="{ dark: $store.state.isDarkMode }">
    <Header/>

    <main v-if="isGettingProfileData">
      <vue-loading
        type="bubbles"
        :color="$store.state.isDarkMode ? '#ffffff' : '#404040'"
        :size="{ width: '60px', height: '60px' }"
      ></vue-loading>
    </main>

    <main v-else>
      <div class="me-profile">
        <i
          class="me-profile-avatar"
          :style="{backgroundImage: 'url(' + data.user.avatarImage.smallPicUrl + ')'}"
          :title="data.user.screenName"
        ></i>
        <div>
          <p class="me-profile-name" :title="data.user.screenName">{{ data.user.screenName }}</p>
          <!-- Verified Message -->
          <p class="me-profile-title" v-if="data.user.isVerified" :title="data.user.verifyMessage">
            <i></i>
            <span>{{ data.user.verifyMessage }}</span>
          </p>
        </div>
        <i class="el-icon-refresh" @click.self.stop="$router.push('/me/settings')"></i>
      </div>

      <!-- Bio -->
      <div class="me-bio" v-if="data.user.bio">
        <span>{{ data.user.bio }}</span>
      </div>

      <!-- Following & Followers -->
      <div class="me-follow">
        <div
          class="me-follow-item"
          @click.stop="$router.push('/me/following?username=' + data.user.username)"
        >
          <p>关注</p>
          <span>{{ data.user.statsCount.followingCount > 99999 ? '9999+' : data.user.statsCount.followingCount }}</span>
        </div>
        <div
          class="me-follow-item"
          @click.stop="$router.push('/me/follower?username=' + data.user.username)"
        >
          <p>粉丝</p>
          <span>{{ data.user.statsCount.followedCount > 99999 ? '99999+' : data.user.statsCount.followedCount }}</span>
        </div>
      </div>

      <!-- Dark Mode -->
      <div class="me-dark-mode">
        <span>夜间模式</span>
        <el-switch v-model="$store.state.isDarkMode" @change="toggleTheme"></el-switch>
      </div>

      <!-- Log Out -->
      <div class="me-button">
        <el-button type="danger" @click.stop="logOut()">退出登录</el-button>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { setTimeout } from "timers";
import api from "@/api";
import func from "@/function";
import Header from "@/components/Header.vue";

@Component({
  components: {
    Header
  }
})
export default class Home extends Vue {
  isGettingProfileData: boolean = true;
  isSelectingProfile: boolean = false;
  data: any = {};

  created() {
    this.getData();
  }

  getData() {
    api
      .profile()
      .then((data: any) => {
        const RESPONSE = data.data;
        this.data = RESPONSE;
        setTimeout(() => {
          this.isGettingProfileData = false;
        }, 1000);
      })
      .catch(err => {
        if (err.response.status === 401) {
          func.refreshToken(this.getData());
        }
      });
  }

  toggleTheme(e: boolean) {
    this.$store.commit("changeTheme", e);
  }

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
<style scoped>
main {
  display: block;
  height: 500px;
  width: 100%;
  padding: 50px 0 20px 0;
  overflow-y: auto;
}

div.vue-loading {
  margin-top: 150px;
}

div.me-profile {
  display: block;
  width: 100%;
  padding: 10px 30px;
  font-size: 0;
  transition: background-color 0.3s ease-in-out;
}
i.me-profile-avatar {
  display: inline-block;
  vertical-align: middle;
  height: 60px;
  width: 60px;
  background: #fff center no-repeat;
  background-size: cover;
  border: 1px solid #e1e2e3;
  border-radius: 50%;
}
div.me.dark i.me-profile-avatar {
  background-color: #262626;
  border-color: #262626;
}
div.me-profile > div {
  display: inline-block;
  vertical-align: middle;
  width: calc(100% - 115px);
  margin-left: 20px;
}
i.el-icon-refresh {
  cursor: pointer;
  display: block;
  width: 30px;
  position: absolute;
  top: 27px;
  right: 30px;
  font-size: 26px;
}
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
}
p.me-profile-title > i {
  content: "";
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
  height: 18px;
  width: 18px;
  background: url("../assets/verified.svg") center no-repeat;
  background-size: 100%;
}
p.me-profile-title > span {
  display: inline-block;
  vertical-align: middle;
  width: calc(100% - 23px);
  color: #909090;
  font-size: 13px;
  line-height: 1.6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Bio */
div.me-bio {
  display: block;
  width: 100%;
  padding: 10px 30px;
  font-size: 14px;
  line-height: 1.6;
  color: #606060;
}
div.me.dark div.me-bio {
  color: #e1e2e3;
}
div.me-bio > span {
  white-space: pre-wrap;
}

/* Following & Followers */
div.me-follow {
  display: block;
  width: 100%;
  margin-top: 10px;
  padding: 0 30px;
  font-size: 0;
}
div.me-follow-item {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  width: calc(50% - 7.5px);
  padding: 10px;
  text-align: center;
  background-color: #efefef;
  border-radius: 4px;
  transition: background-color 0.15s ease-in-out;
}
div.me.dark div.me-follow-item {
  background-color: #262626;
}
div.me-follow-item:hover,
div.me.dark div.me-follow-item:hover {
  color: #000;
  background-color: #ffe411;
}
div.me-follow-item + div {
  margin-left: 15px;
}
div.me-follow-item > p {
  display: block;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.6;
}
div.me-follow-item > span {
  display: block;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.6;
}

/* Dark Mode */
div.me-dark-mode {
  display: block;
  width: 100%;
  margin: 20px auto 0 auto;
  padding: 0 30px;
  text-align: right;
}
div.me-dark-mode > span {
  margin-right: 10px;
}

/* Log Out */
div.me-button {
  display: block;
  width: 100%;
  margin: 20px auto;
  padding: 0 30px;
  text-align: center;
}
button.el-button.el-button--danger {
  width: 100%;
}
</style>
