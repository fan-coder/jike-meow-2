<template>
  <div class="ff" :class="{ dark: $store.state.isDarkMode }">
    <!-- Navbar -->
    <Back title="关注我的人"/>

    <!-- Loading Animation -->
    <main v-if="isGettingFollowerList">
      <meow-loading style="margin-top: 150px"/>
    </main>

    <main v-else @scroll="scrollToLoadMore">
      <!-- Profile List -->
      <div class="profile" v-for="(people, index) in data" :key="index">
        <!-- Avatar -->
        <i
          :style="{backgroundImage: 'url(' + people.avatarImage.smallPicUrl + ')'}"
          :title="people.screenName"
          :class="{ isVerified: people.isVerified }"
          @click.stop="openHomePage(people.username)"
        ></i>
        <div>
          <!-- Screen Name -->
          <p class="name" :title="people.screenName">{{ people.screenName }}</p>

          <!-- Verified Message -->
          <p class="title" v-if="people.isVerified">
            <span>{{ people.verifyMessage }}</span>
          </p>
        </div>

        <!-- Follow/Unfollow -->
        <button
          v-if="people.following === true"
          @mouseover="people.isHover = true;"
          @mouseleave="people.isHover = false;"
          @click.self.stop="unfollow(people, people.username)"
        ></button>
        <button class="notFollowing" v-else @click.self.stop="follow(people, people.username)"></button>
      </div>

      <!-- LoadingMore Animation -->
      <meow-loading v-if="isLoadMoreKeyEnabled" style="margin-top: 0"/>

      <!-- No data  -->
      <div class="empty" v-if="!isGettingFollowerList && data.length <= 0">
        <div>
          <i></i>
          <p>
            没有粉丝
            <br>不代表没有魅力
            <br>很有可能是因为…
            <br>你更在意真实世界的自己
          </p>
        </div>
      </div>

      <!-- Prevent to load more data -->
      <div
        class="full-data"
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
import api from "@/api";
import func from "@/function";
import Back from "@/components/Back.vue";

@Component({
  components: { Back }
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

  /* Scroll Fire Point */
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

  /* Fetch */
  getFollowerList() {
    api
      .getFollowerList(this.loadMoreKey, this.$route.query.username)
      .then((data: any) => {
        const RESPONSE = data.data;

        if (RESPONSE.success === true) {
          if (!RESPONSE.loadMoreKey) {
            this.isLoadMoreKeyEnabled = false;
          } else {
            this.isLoadMoreKeyEnabled = true;
            this.loadMoreKey = RESPONSE.loadMoreKey;
          }

          let arr: object[] = [];
          arr.push(...RESPONSE.data);
          this.data = this.data.concat(arr);
        }

        this.isGettingFollowerList = false;
        this.isLoadingMoreKey = false;
      })
      .catch(err => {
        if (err.response.status === 401) {
          func.refreshToken(this.getFollowerList());
          return;
        }
        this.isGettingFollowerList = false;
        this.isLoadingMoreKey = false;
      });
  }

  /* Fetch More */
  loadMoreData() {
    if (!this.isLoadMoreKeyEnabled) return;
    this.isLoadingMoreKey = true;
    this.getFollowerList();
  }

  // Open homepage in browser
  openHomePage(username: string) {
    window.open(`https://web.okjike.com/user/${username}/post`);
  }

  /* Follow & Unfollow */
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

<style lang="scss" scoped>
@import "../style/ff.scss";

main {
  display: block;
  height: 500px;
  width: 100%;
  padding: 50px 0 15px 0;
  overflow-y: auto;
}
</style>
