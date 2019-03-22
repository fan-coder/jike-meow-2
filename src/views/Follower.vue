<template>
  <div class="follower" :class="{ dark: $store.state.isDarkMode }">
    <Back title="关注我的人"/>

    <main v-if="isGettingFollowerList">
      <vue-loading
        type="bubbles"
        :color="$store.state.isDarkMode ? '#ffffff' : '#404040'"
        :size="{ width: '60px', height: '60px' }"
      ></vue-loading>
    </main>

    <main v-else @scroll="scrollToLoadMore">
      <div class="follower-profile" v-for="(people, index) in data" :key="index">
        <!-- Avatar -->
        <i
          :style="{backgroundImage: 'url(' + people.avatarImage.smallPicUrl + ')'}"
          :title="people.screenName"
          :class="{ isVerified: people.isVerified }"
          @click.stop="openHomePage(people.username)"
        ></i>
        <div>
          <!-- Screen Name -->
          <p class="follower-profile-name" :title="people.screenName">{{ people.screenName }}</p>

          <!-- Verified Message -->
          <p class="follower-profile-title" v-if="people.isVerified">
            <span>{{ people.verifyMessage }}</span>
          </p>
        </div>

        <!-- Follow/Unfollow -->
        <button
          v-if="people.following === true"
          @mouseover="people.isHover = true;"
          @mouseleave="people.isHover = false;"
          @click.self.stop="unfollow(people, people.username)"
        >{{ people.isHover === true ? '取消关注' : '已关注' }}</button>
        <button class="notFollowing" v-else @click.self.stop="follow(people, people.username)">关注</button>
      </div>

      <vue-loading
        type="bubbles"
        style="margin-top: 0;"
        :color="$store.state.isDarkMode ? '#ffffff' : '#404040'"
        :size="{ width: '60px', height: '60px' }"
        v-if="isLoadMoreKeyEnabled"
      ></vue-loading>

      <div class="follower-empty" v-if="!isGettingFollowerList && data.length <= 0">
        <div>
          <i></i>
          <p>没有粉丝
            <br>不代表没有魅力
            <br>很有可能是因为…
            <br>你更在意真实世界的自己
          </p>
        </div>
      </div>

      <!-- Prevent to load more data -->
      <div
        class="follower-full-data"
        v-if="!isLoadMoreKeyEnabled && data.length > 0 && data.length % 20 === 0"
      >
        <i></i>
        <p>去客户端里看吧～</p>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { setTimeout } from "timers";
import api from "@/api";
import func from "@/function";
import Back from "@/components/Back.vue";

@Component({
  components: {
    Back
  }
})
export default class Home extends Vue {
  isGettingFollowerList: boolean = true;
  isLoadMoreKeyEnabled: boolean = false;
  isLoadingMoreKey: boolean = false;
  loadMoreKey: string = "";
  data: Array<Object> = [];

  @Watch("data")
  preventLoadMore() {
    if (this.data.length >= 200) {
      this.isLoadMoreKeyEnabled = false;
    }
  }

  created() {
    if (!this.$route.query.username) {
      this.$router.replace("/me");
      return;
    }

    this.isGettingFollowerList = true;
    this.getFollowerList();
  }

  scrollToLoadMore(e: any) {
    const OFFSET_TOP = e.target.scrollTop + 500;
    const FIRE_POINT = this.data.length * 80;

    if (OFFSET_TOP > FIRE_POINT) {
      if (
        this.isGettingFollowerList === true ||
        this.isLoadingMoreKey === true ||
        this.isLoadMoreKeyEnabled === false
      )
        return;
      this.loadMoreData();
    }
  }

  loadMoreData() {
    if (!this.isLoadMoreKeyEnabled) return;

    this.isLoadingMoreKey = true;
    this.getFollowerList();
  }

  getFollowerList() {
    api
      .getFollowerList(this.loadMoreKey, this.$route.query.username)
      .then((data: any) => {
        const RESPONSE = data.data;

        if (RESPONSE.success === true) {
          let arr: object[] = [];

          RESPONSE.data.map((item: any) => {
            item.isHover = false;
            arr.push(item);
          });

          this.isLoadMoreKeyEnabled = true;
          if (RESPONSE.data.length < 20) this.isLoadMoreKeyEnabled = false;
          this.data = this.data.concat(arr);
          this.loadMoreKey = RESPONSE.loadMoreKey;
        }

        setTimeout(() => {
          this.isGettingFollowerList = false;
        }, 1000);
        this.isLoadingMoreKey = false;
      })
      .catch(err => {
        this.isGettingFollowerList = false;
        this.isLoadingMoreKey = false;
        if (err.response.status === 401) {
          func.refreshToken(this.getFollowerList());
        }
      });
  }

  // Open homepage in browser
  openHomePage(username: string) {
    window.open(`https://web.okjike.com/user/${username}/post`);
  }

  follow(item: { following: boolean }, username: string) {
    api.follow(username).then((res: any) => {
      const RESPONSE = res.data;

      if (RESPONSE.success === true) {
        item.following = true;
        return;
      }
    });
  }

  unfollow(item: { following: boolean }, username: string) {
    api.unfollow(username).then((res: any) => {
      const RESPONSE = res.data;

      if (RESPONSE.success === true) {
        item.following = false;
        return;
      }
    });
  }
}
</script>
<style scoped>
main {
  display: block;
  height: 500px;
  width: 100%;
  padding: 50px 0 15px 0;
  overflow-y: auto;
}

div.vue-loading {
  margin-top: 150px;
}

div.follower-profile {
  display: block;
  width: 100%;
  padding: 15px 20px;
  font-size: 0;
  transition: background-color 0.3s ease-in-out;
}
div.follower-profile > i {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  height: 50px;
  width: 50px;
  background: #fff center no-repeat;
  background-size: cover;
  border: 1px solid #e1e2e3;
  border-radius: 50%;
}
div.follower.dark div.follower-profile > i {
  background-color: #262626;
  border-color: #262626;
}
div.follower-profile > i.isVerified::after {
  content: "";
  position: absolute;
  right: -2px;
  bottom: -2px;
  height: 16px;
  width: 16px;
  background: url("../assets/verified.svg") center no-repeat;
  background-size: 100%;
  z-index: 5;
}
div.follower-profile > div {
  display: inline-block;
  vertical-align: middle;
  width: calc(100% - 170px);
  margin-left: 20px;
}
div.follower-profile > button {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  width: 90px;
  margin-left: 10px;
  font-size: 13px;
  font-weight: 500;
  line-height: 30px;
  color: #fff;
  background-color: #dbdbdb;
  border-radius: 30px;
  text-align: center;
}
div.follower.dark div.follower-profile > button {
  background-color: #262626;
}
div.follower-profile > button:hover {
  background-color: #909090;
}
div.follower.dark div.follower-profile > button:hover {
  background-color: #888;
}
div.follower.dark div.follower-profile > button.notFollowing,
div.follower-profile > button.notFollowing {
  color: #000;
  background-color: #ffe411;
}
div.follower-profile > button.notFollowing:hover {
  color: #000;
  background-color: #ffe411;
}
p.follower-profile-name {
  display: block;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Verified Message */
p.follower-profile-title {
  display: block;
  margin-top: 3px;
  width: 100%;
}
p.follower-profile-title > span {
  display: block;
  width: 100%;
  color: #909090;
  font-size: 12px;
  line-height: 1.6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 空数据 */
div.follower-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 435px;
  width: 100%;
}
div.follower-empty i {
  display: block;
  height: 100px;
  width: 100px;
  margin: auto;
  background: url("../assets/chicken-legs.svg") center no-repeat;
  background-size: 100px;
}
div.follower-empty p {
  display: block;
  margin-top: 25px;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.6;
}

/* Prevent to load more data */
div.follower-full-data {
  display: block;
  width: 100%;
  padding: 15px 0 30px 0;
  box-shadow: 0px -30px 15px 0 rgba(255, 255, 255, 1);
}
div.follower.dark div.follower-full-data {
  box-shadow: 0px -30px 15px 0 rgba(50, 54, 57, 1);
}
div.follower-full-data i {
  display: block;
  height: 150px;
  width: 150px;
  margin: auto;
  background: url("../assets/submarine.svg") center no-repeat;
  background-size: 100%;
}
div.follower-full-data p {
  display: block;
  margin: auto;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.6;
  text-align: center;
}
</style>
