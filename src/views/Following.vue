<template>
  <div class="ff" :class="{ dark: $store.state.isDarkMode }">
    <!-- Navbar -->
    <Back title="我关注的人"/>

    <!-- Loading Animation -->
    <main v-if="isGettingFollowingList">
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
      <meow-loading v-if="isLoadingMoreKey" style="margin-top: 0"/>

      <!-- No data  -->
      <div class="empty" v-if="!isGettingFollowingList && data.length <= 0">
        <div>
          <i></i>
          <p>
            可能你只是想 “树洞”
            <br>但既然来到这里
            <br>就说明你至少还在乎
            <br>去试试关注一些新朋友吧～
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
export default class Following extends Vue {
  isGettingFollowingList: boolean = true;
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

    this.isGettingFollowingList = true;
    this.getFollowingList();
  }

  /* Scroll Fire Point */
  scrollToLoadMore(e: any) {
    const OFFSET_TOP = e.target.scrollTop + 500;
    const FIRE_POINT = this.data.length * 80;

    if (OFFSET_TOP > FIRE_POINT) {
      if (
        this.isGettingFollowingList === true ||
        this.isLoadingMoreKey === true ||
        this.isLoadMoreKeyEnabled === false
      )
        return;
      this.loadMoreData();
    }
  }

  /* Fetch */
  getFollowingList() {
    api
      .getFollowingList(this.loadMoreKey, this.$route.query.username)
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

        this.isGettingFollowingList = false;
        this.isLoadingMoreKey = false;
      })
      .catch(err => {
        if (err.response.status === 401) {
          func.refreshToken(this.getFollowingList());
          return;
        }
        this.isGettingFollowingList = false;
        this.isLoadingMoreKey = false;
      });
  }

  /* Fetch More */
  loadMoreData() {
    if (!this.isLoadMoreKeyEnabled) return;
    this.isLoadingMoreKey = true;
    this.getFollowingList();
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
@import "../style/following-and-follower.scss";

main {
  display: block;
  height: 500px;
  width: 100%;
  padding: 50px 0 15px 0;
  overflow-y: auto;
}
</style>
