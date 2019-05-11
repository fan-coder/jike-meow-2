<template>
  <div class="notification-left" :class="{ dark: $store.state.isDarkMode }">
    <!-- Text -->
    <div class="text">
      <a
        v-for="user in data.actionItem.users"
        :key="user.id"
        :href="`https://web.okjike.com/user/${user.username}/post`"
        target="_blank"
      >{{ user.screenName }}</a>&nbsp;
      <span v-if="data.actionItem.usersCount >= 3">等 {{ data.actionItem.usersCount }} 人</span>
      <span>{{ actionDescription }}</span>
    </div>

    <!-- Avatars -->
    <div class="avatars">
      <i
        v-for="avatar in data.actionItem.users"
        :key="avatar.id"
        :style="{backgroundImage: 'url(' + avatar.profileImageUrl + ')'}"
        :class="{ isVerified: avatar.isVerified }"
      ></i>
    </div>

    <!-- Post Time -->
    <div class="time">{{ data.createdAt | reformatTime }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["data", "actionDescription"]
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
div.notification-left {
  display: inline-block;
  vertical-align: top;
  width: calc(100% - 85px);
  margin-right: 15px;

  div.text {
    display: block;
    width: 100%;
    font-size: 14px;
    line-height: 1.6;
    color: #606266;

    & > a {
      color: #303133;
    }
    & > a + a::before {
      content: "、";
    }
  }

  div.avatars {
    display: block;
    padding-top: 10px;

    & > i {
      display: inline-block;
      position: relative;
      vertical-align: middle;
      height: 30px;
      width: 30px;
      border: 2px solid #fff;
      border-radius: 50%;
      background: #e4e7ed center no-repeat;
      background-size: cover;
    }

    & > i:first-child {
      margin-left: -2px;
    }

    & > i + i {
      margin-left: -5px;
    }

    & > i.isVerified::after {
      content: "";
      position: absolute;
      right: -1px;
      bottom: -1px;
      height: 11px;
      width: 11px;
      background: url("../../assets/verified.svg") center no-repeat;
      background-size: 100%;
    }
  }

  div.time {
    display: block;
    margin-top: 10px;
    font-size: 12px;
    line-height: 1.6;
    color: #909399;
  }
}

div.notification-left.dark {
  div.text {
    color: #c0c4cc;

    & > a {
      color: #fff;
    }
  }

  div.avatars > i {
    border-color: #323639;
    background-color: #262626;
  }

  div.time {
    color: #c0c4cc;
  }
}
</style>
