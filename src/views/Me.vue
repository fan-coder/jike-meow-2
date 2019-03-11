<template>
  <div class="me">
    <Header/>

    <main v-if="isGettingProfileData">
      <vue-loading type="bubbles" color="#404040" :size="{ width: '60px', height: '60px' }"></vue-loading>
    </main>

    <main v-else>
      <div class="me-profile">
        <i
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
        <button @click.self.stop="$router.push('/me/settings')"></button>
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

      <!-- Log Out -->
      <div class="me-button">
        <button class="me-button me-button-warn" @click.self.stop="logOut()">退出登录</button>
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

  logOut() {
    this.$confirm("确认退出？", "注意", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        const STORAGE_TOKEN = localStorage["storageToken"];
        localStorage.clear();
        if (STORAGE_TOKEN && STORAGE_TOKEN.length > 0)
          localStorage.setItem("storageToken", STORAGE_TOKEN);
        this.$router.replace("/");
      })
      .catch(() => {});
  }
}
</script>
<style scoped>
main {
  display: block;
  width: 100%;
  padding: 50px 0 20px 0;
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
div.me-profile > i {
  display: inline-block;
  vertical-align: middle;
  height: 60px;
  width: 60px;
  background: #fff center no-repeat;
  background-size: cover;
  border: 1px solid #e1e2e3;
  border-radius: 50%;
}
div.me-profile > div {
  display: inline-block;
  vertical-align: middle;
  width: calc(100% - 115px);
  margin-left: 20px;
}
div.me-profile > button {
  cursor: pointer;
  display: block;
  height: 30px;
  width: 30px;
  position: absolute;
  top: 25px;
  right: 30px;
  background: url("../assets/switch.svg") center no-repeat;
  background-size: 30px;
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
  border-radius: 6px;
  transition: background-color 0.15s ease-in-out;
}
div.me-follow-item:hover {
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

/* Log Out */
div.me-button {
  display: block;
  width: 100%;
  margin: 20px auto;
  padding: 0 30px;
  text-align: center;
}
button.me-button {
  cursor: pointer;
  display: block;
  width: 100%;
  margin: auto;
  font-size: 14px;
  font-weight: 500;
  line-height: 2.8;
  border: 0;
  border-radius: 6px;
  background-color: #ffe411;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
button.me-button.me-button-warn {
  color: #fff;
  background-color: #f44336;
}
</style>
