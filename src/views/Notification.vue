<template>
  <div class="notification" :class="{ dark: $store.state.isDarkMode }">
    <Header/>

    <main v-if="isGettingNotificationList">
      <vue-loading
        type="bubbles"
        :color="$store.state.isDarkMode ? '#ffffff' : '#404040'"
        :size="{ width: '60px', height: '60px' }"
      ></vue-loading>
    </main>

    <main v-else @scroll="scrollToLoadMore">
      <div v-for="item in notificationList" :key="item.id">
        <AnswerQuestion
          v-if="item.type === 'ANSWER_QUESTION'"
          :data="item"
          v-on:enlargeImage="enlargeImage(item)"
        />
        <CommentAndRepost
          v-else-if="item.type === 'COMMENT_AND_REPOST'"
          :data="item"
          v-on:enlargeImage="enlargeImage(item)"
        />
        <CommentAnswer
          v-else-if="item.type === 'COMMENT_ANSWER'"
          :data="item"
          v-on:enlargeImage="enlargeImage(item)"
        />
        <CommentPersonalUpdate
          v-else-if="item.type === 'COMMENT_PERSONAL_UPDATE'"
          :data="item"
          v-on:enlargeImage="enlargeImage(item)"
        />
        <LikeAnswerComment v-else-if="item.type === 'LIKE_ANSWER_COMMENT'" :data="item"/>
        <LikeAvatar v-else-if="item.type === 'LIKE_AVATAR'" :data="item"/>
        <LikeComment v-else-if="item.type === 'LIKE_COMMENT'" :data="item"/>
        <LikePersonalUpdate v-else-if="item.type === 'LIKE_PERSONAL_UPDATE'" :data="item"/>
        <LikePersonalUpdateComment
          v-else-if="item.type === 'LIKE_PERSONAL_UPDATE_COMMENT'"
          :data="item"
        />
        <LikeQuestion v-else-if="item.type === 'LIKE_QUESTION'" :data="item"/>
        <Mention
          v-else-if="item.type === 'MENTION'"
          :data="item"
          v-on:enlargeImage="enlargeImage(item)"
        />
        <PersonalUpdateReposted v-else-if="item.type === 'PERSONAL_UPDATE_REPOSTED'" :data="item"/>
        <RepliedToAnswerComment v-else-if="item.type === 'REPLIED_TO_ANSWER_COMMENT'" :data="item"/>
        <RepliedToPersonalUpdateComment
          v-else-if="item.type === 'REPLIED_TO_PERSONAL_UPDATE_COMMENT'"
          :data="item"
          v-on:enlargeImage="enlargeImage(item)"
        />
        <ReplyToComment v-else-if="item.type === 'REPLY_TO_COMMENT'" :data="item"/>
        <Repost
          v-else-if="item.type === 'REPOST'"
          :data="item"
          v-on:enlargeImage="enlargeImage(item)"
        />
        <UpvoteAnswer v-else-if="item.type === 'UPVOTE_ANSWER'" :data="item"/>
        <UserFollowed
          v-else-if="item.type === 'USER_FOLLOWED'"
          :data="item"
          v-on:follow="follow(item)"
          v-on:unfollow="unfollow(item)"
        />
        <Unknown v-else/>
      </div>

      <vue-loading
        type="bubbles"
        style="margin-top: 10px"
        :color="$store.state.isDarkMode ? '#ffffff' : '#404040'"
        :size="{ width: '60px', height: '60px' }"
        v-if="isLoadMoreKeyEnabled"
      ></vue-loading>

      <!-- Prevent to load more data -->
      <div
        class="notification-full-data"
        v-if="!isLoadMoreKeyEnabled && notificationList.length >= 300"
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
import Header from "@/components/Header.vue";
import AnswerQuestion from "@/components/notification/AnswerQuestion.vue";
import CommentAndRepost from "@/components/notification/CommentAndRepost.vue";
import CommentAnswer from "@/components/notification/CommentAnswer.vue";
import CommentPersonalUpdate from "@/components/notification/CommentPersonalUpdate.vue";
import LikeAnswerComment from "@/components/notification/LikeAnswerComment.vue";
import LikeAvatar from "@/components/notification/LikeAvatar.vue";
import LikeComment from "@/components/notification/LikeComment.vue";
import LikePersonalUpdate from "@/components/notification/LikePersonalUpdate.vue";
import LikePersonalUpdateComment from "@/components/notification/LikePersonalUpdateComment.vue";
import LikeQuestion from "@/components/notification/LikeQuestion.vue";
import Mention from "@/components/notification/Mention.vue";
import PersonalUpdateReposted from "@/components/notification/PersonalUpdateReposted.vue";
import RepliedToAnswerComment from "@/components/notification/RepliedToAnswerComment.vue";
import RepliedToPersonalUpdateComment from "@/components/notification/RepliedToPersonalUpdateComment.vue";
import ReplyToComment from "@/components/notification/ReplyToComment.vue";
import Repost from "@/components/notification/Repost.vue";
import Unknown from "@/components/notification/Unknown.vue";
import UpvoteAnswer from "@/components/notification/UpvoteAnswer.vue";
import UserFollowed from "@/components/notification/UserFollowed.vue";

@Component({
  components: {
    Header,
    AnswerQuestion,
    CommentAndRepost,
    CommentAnswer,
    LikeAnswerComment,
    CommentPersonalUpdate,
    LikeAvatar,
    LikeComment,
    LikePersonalUpdate,
    LikePersonalUpdateComment,
    LikeQuestion,
    Mention,
    PersonalUpdateReposted,
    RepliedToAnswerComment,
    RepliedToPersonalUpdateComment,
    ReplyToComment,
    Repost,
    Unknown,
    UpvoteAnswer,
    UserFollowed
  }
})
export default class Home extends Vue {
  isGettingNotificationList: boolean = true;
  isLoadMoreKeyEnabled: boolean = false;
  isLoadingMoreKey: boolean = false;
  notificationList: Array<object> = [];
  loadMoreKey: object = {};

  @Watch("notificationList")
  preventLoadMore() {
    if (this.notificationList.length >= 300) {
      this.isLoadMoreKeyEnabled = false;
    }
  }

  created() {
    this.isGettingNotificationList = true;
    this.getNotificationList();
  }

  getNotificationList() {
    api
      .getNotificationList(this.loadMoreKey)
      .then((data: any) => {
        const RESPONSE = data.data;
        this.notificationList = this.notificationList.concat(RESPONSE.data);
        this.loadMoreKey = RESPONSE.loadMoreKey;

        this.isLoadMoreKeyEnabled = true;
        if (RESPONSE.data.length <= 0) this.isLoadMoreKeyEnabled = false;

        setTimeout(() => {
          this.isGettingNotificationList = false;
        }, 1000);
        this.isLoadingMoreKey = false;
      })
      .catch((err: any) => {
        this.isGettingNotificationList = false;
        this.isLoadingMoreKey = false;
        if (err.response.status === 401) {
          func.refreshToken(this.getNotificationList());
        }
      });
  }

  scrollToLoadMore(e: any) {
    const OFFSET_TOP = e.target.scrollTop + 500;
    const FIRE_POINT = this.notificationList.length * 100;

    if (OFFSET_TOP > FIRE_POINT) {
      if (
        this.isGettingNotificationList === true ||
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
    this.getNotificationList();
  }

  enlargeImage(item: any) {
    this.$confirm(
      `<img class='alert-image' src='${item.actionItem.pictures[0].picUrl}'>`,
      "",
      {
        dangerouslyUseHTMLString: true,
        closeOnClickModal: true,
        showClose: true,
        confirmButtonText: "查看原图",
        cancelButtonText: "关闭"
      }
    )
      .then(() => {
        window.open(item.actionItem.pictures[0].picUrl);
      })
      .catch(() => {});
  }

  follow(item: any) {
    api.follow(item.actionItem.users[0].username).then((res: any) => {
      const RESPONSE = res.data;

      if (RESPONSE.success === true) {
        item.actionItem.users[0].following = true;
        return;
      }
    });
  }

  unfollow(item: any) {
    api.unfollow(item.actionItem.users[0].username).then((res: any) => {
      const RESPONSE = res.data;

      if (RESPONSE.success === true) {
        item.actionItem.users[0].following = false;
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
  padding: 50px 0 20px 0;
  overflow-y: auto;
}

div.vue-loading {
  margin-top: 150px;
}

/* Prevent to load more data */
div.notification-full-data {
  display: block;
  width: 100%;
  padding: 15px 0 30px 0;
  box-shadow: 0px -30px 15px 0 rgba(255, 255, 255, 1);
}
div.notification.dark div.notification-full-data {
  box-shadow: 0px -30px 15px 0 rgba(50, 54, 57, 1);
}
div.notification-full-data i {
  display: block;
  height: 150px;
  width: 150px;
  margin: auto;
  background: url("../assets/submarine.svg") center no-repeat;
  background-size: 100%;
}
div.notification-full-data p {
  display: block;
  margin: auto;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.6;
  text-align: center;
}
</style>
