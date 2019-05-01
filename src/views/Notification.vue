<template>
  <div class="notification" :class="{ dark: $store.state.isDarkMode }">
    <Header/>

    <main v-if="isGettingNotificationList">
      <meow-loading style="margin-top: 150px"/>
    </main>

    <main v-else @scroll="scrollToLoadMore">
      <div v-for="item in notificationList" :key="item.id">
        <keep-alive>
          <component
            v-if="notificationComponents[item.type]"
            :is="notificationComponents[item.type].component"
            :data="item"
            @follow="follow(item)"
            @unfollow="unfollow(item)"
          />
          <Unknown v-else/>
        </keep-alive>
      </div>

      <!-- loadMoreKey -->
      <meow-loading v-if="isLoadMoreKeyEnabled" style="margin-top: 10px"/>

      <!-- Prevent to loadMoreKey -->
      <div
        class="notification-full-data"
        v-if="!isLoadMoreKeyEnabled && notificationList.length >= 300"
      >
        <i></i>
        <p>去客户端里看吧～</p>
      </div>
    </main>

    <!-- Refresh -->
    <el-button
      type="primary"
      icon="el-icon-refresh"
      circle
      :loading="isGettingNotificationList"
      @click.stop="refresh"
    ></el-button>
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
  notificationComponents: Object = {
    ANSWER_QUESTION: {
      component: AnswerQuestion
    },
    COMMENT_AND_REPOST: {
      component: CommentAndRepost
    },
    COMMENT_ANSWER: {
      component: CommentAnswer
    },
    COMMENT_PERSONAL_UPDATE: {
      component: CommentPersonalUpdate
    },
    LIKE_ANSWER_COMMENT: {
      component: LikeAnswerComment
    },
    LIKE_AVATAR: {
      component: LikeAvatar
    },
    LIKE_COMMENT: {
      component: LikeComment
    },
    LIKE_PERSONAL_UPDATE: {
      component: LikePersonalUpdate
    },
    LIKE_PERSONAL_UPDATE_COMMENT: {
      component: LikePersonalUpdateComment
    },
    LIKE_QUESTION: {
      component: LikeQuestion
    },
    MENTION: {
      component: Mention
    },
    PERSONAL_UPDATE_REPOSTED: {
      component: PersonalUpdateReposted
    },
    REPLIED_TO_ANSWER_COMMENT: {
      component: RepliedToAnswerComment
    },
    REPLIED_TO_PERSONAL_UPDATE_COMMENT: {
      component: RepliedToPersonalUpdateComment
    },
    REPLY_TO_COMMENT: {
      component: ReplyToComment
    },
    REPOST: {
      component: Repost
    },
    UPVOTE_ANSWER: {
      component: UpvoteAnswer
    },
    USER_FOLLOWED: {
      component: UserFollowed
    }
  };
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

  /* Fetch */
  getNotificationList() {
    api
      .getNotificationList(this.loadMoreKey)
      .then((data: any) => {
        const RESPONSE = data.data;

        this.notificationList = this.notificationList.concat(RESPONSE.data);
        this.loadMoreKey = RESPONSE.loadMoreKey;
        this.isLoadMoreKeyEnabled = true;

        if (!RESPONSE.loadMoreKey) this.isLoadMoreKeyEnabled = false;

        this.isGettingNotificationList = false;
        this.isLoadingMoreKey = false;
      })
      .catch((err: any) => {
        if (err.response.status === 401) {
          func.refreshToken(this.getNotificationList());
          return;
        }

        this.isGettingNotificationList = false;
        this.isLoadingMoreKey = false;
      });
  }

  /* Scroll Fire Point */
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

  /* Fetch More */
  loadMoreData() {
    if (!this.isLoadMoreKeyEnabled) return;
    this.isLoadingMoreKey = true;
    this.getNotificationList();
  }

  /* Refetch */
  refresh() {
    this.loadMoreKey = {};
    this.isLoadMoreKeyEnabled = true;
    this.notificationList = [];
    this.isGettingNotificationList = true;
    this.getNotificationList();
  }

  /* Follow & Unfollow */
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

/* Refresh */
button.el-button.el-button--primary.is-circle {
  position: fixed;
  right: 20px;
  bottom: 20px;
  color: #303133;
  font-size: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
