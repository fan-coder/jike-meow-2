<template>
  <div class="notification">
    <Header/>

    <main v-if="isGettingNotificationList">
      <vue-loading
        type="bubbles"
        :color="$store.state.isDarkMode ? '#ffffff' : '#404040'"
        :size="{ width: '60px', height: '60px' }"
      ></vue-loading>
    </main>

    <main v-else>
      <div v-for="item in notificationList" :key="item.id">
        <LikeAvatar v-if="item.type === 'LIKE_AVATAR'" :data="item"/>
        <!-- <LikePost v-else-if="item.type === ''"/> -->
        <!-- <LikeReply v-else-if="item.type === ''"/> -->
        <UserFollowed v-else-if="item.type === 'USER_FOLLOWED'" :data="item"/>
        <Repost v-else-if="item.type === 'REPOST'" :data="item"/>
        <Unknown v-else/>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import api from "@/api";
import func from "@/function";
import Header from "@/components/Header.vue";
import LikeAvatar from "@/components/notification/LikeAvatar.vue";
import LikePost from "@/components/notification/LikePost.vue";
import LikeReply from "@/components/notification/LikeReply.vue";
import UserFollowed from "@/components/notification/UserFollowed.vue";
import Repost from "@/components/notification/Repost.vue";
import Unknown from "@/components/notification/Unknown.vue";

@Component({
  components: {
    Header,
    LikeAvatar,
    LikePost,
    LikeReply,
    UserFollowed,
    Repost,
    Unknown
  }
})
export default class Home extends Vue {
  isGettingNotificationList: boolean = true;
  notificationList: Array<object> = [];
  loadMoreKey: object = {};

  created() {
    this.isGettingNotificationList = true;
    this.getNotificationList();
  }

  getNotificationList() {
    api
      .getNotificationList(this.loadMoreKey)
      .then((data: any) => {
        const RESPONSE = data.data;
        this.notificationList = RESPONSE.data;

        setTimeout(() => {
          this.isGettingNotificationList = false;
        }, 1000);
      })
      .catch((err: any) => {
        if (err.response.status === 401) {
          func.refreshToken(this.getNotificationList());
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
  padding: 50px 0 20px 0;
  overflow-y: auto;
}

div.vue-loading {
  margin-top: 150px;
}
</style>
