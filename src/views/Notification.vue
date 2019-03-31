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
        <AnswerQuestion v-if="item.type === 'ANSWER_QUESTION'" :data="item"/>
        <CommentAnswer v-else-if="item.type === 'COMMENT_ANSWER'" :data="item"/>
        <CommentPersonalUpdate v-else-if="item.type === 'COMMENT_PERSONAL_UPDATE'" :data="item"/>
        <LikeAnswerComment v-else-if="item.type === 'LIKE_ANSWER_COMMENT'" :data="item"/>
        <LikeAvatar v-else-if="item.type === 'LIKE_AVATAR'" :data="item"/>
        <LikeComment v-else-if="item.type === 'LIKE_COMMENT'" :data="item"/>
        <LikePersonalUpdate v-else-if="item.type === 'LIKE_PERSONAL_UPDATE'" :data="item"/>
        <LikePersonalUpdateComment
          v-else-if="item.type === 'LIKE_PERSONAL_UPDATE_COMMENT'"
          :data="item"
        />
        <LikeQuestion v-else-if="item.type === 'LIKE_QUESTION'" :data="item"/>
        <Mention v-else-if="item.type === 'MENTION'" :data="item"/>
        <PersonalUpdateReposted v-else-if="item.type === 'PERSONAL_UPDATE_REPOSTED'" :data="item"/>
        <RepliedToPersonalUpdateComment
          v-else-if="item.type === 'REPLIED_TO_PERSONAL_UPDATE_COMMENT'"
          :data="item"
          v-on:enlargeImage="enlargeImage(item)"
        />
        <Repost v-else-if="item.type === 'REPOST'" :data="item"/>
        <UpvoteAnswer v-else-if="item.type === 'UPVOTE_ANSWER'" :data="item"/>
        <UserFollowed
          v-else-if="item.type === 'USER_FOLLOWED'"
          :data="item"
          v-on:follow="follow(item)"
          v-on:unfollow="unfollow(item)"
        />
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
import AnswerQuestion from "@/components/notification/AnswerQuestion.vue";
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
import RepliedToPersonalUpdateComment from "@/components/notification/RepliedToPersonalUpdateComment.vue";
import Repost from "@/components/notification/Repost.vue";
import Unknown from "@/components/notification/Unknown.vue";
import UpvoteAnswer from "@/components/notification/UpvoteAnswer.vue";
import UserFollowed from "@/components/notification/UserFollowed.vue";

@Component({
  components: {
    Header,
    AnswerQuestion,
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
    RepliedToPersonalUpdateComment,
    Repost,
    Unknown,
    UpvoteAnswer,
    UserFollowed
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

  enlargeImage(item: any) {
    this.$confirm(
      `<img class='alert-image' src='${
        item.actionItem.pictures[0].middlePicUrl
      }'>`,
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
</style>
