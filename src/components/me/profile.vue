<template>
  <div class="profile" :class="{ dark: $store.state.isDarkMode }">
    <!-- Avatar -->
    <i
      :style="{backgroundImage: 'url(' + data.user.avatarImage.smallPicUrl + ')'}"
      :title="data.user.screenName"
    ></i>

    <!-- Text -->
    <div>
      <p class="name" :title="data.user.screenName">{{ data.user.screenName }}</p>
      <p class="title" v-if="data.user.isVerified" :title="data.user.verifyMessage">
        <i></i>
        <span>{{ data.user.verifyMessage }}</span>
      </p>
    </div>

    <!-- Account Settings -->
    <i class="el-icon-s-tools" @click.self.stop="$router.push('/me/settings')"></i>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["data"]
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
div.profile {
  display: block;
  position: relative;
  width: 100%;
  padding: 10px 30px;
  font-size: 0;
  transition: background-color 0.3s ease-in-out;

  & > i:first-child {
    display: inline-block;
    vertical-align: middle;
    height: 60px;
    width: 60px;
    background: #e4e7ed center no-repeat;
    background-size: cover;
    border: 1px solid #e4e7ed;
    border-radius: 50%;
  }

  & > div {
    display: inline-block;
    vertical-align: middle;
    width: calc(100% - 115px);
    margin-left: 20px;

    p.name {
      display: block;
      font-size: 17px;
      font-weight: bold;
      line-height: 1.6;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    p.title {
      display: block;
      margin-top: 5px;
      width: 100%;

      & > i {
        content: "";
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
        height: 18px;
        width: 18px;
        background: url("../../assets/verified.svg") center no-repeat;
        background-size: 100%;
      }
      & > span {
        display: inline-block;
        vertical-align: middle;
        width: calc(100% - 23px);
        color: #606266;
        font-size: 13px;
        line-height: 1.6;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  & > i:last-child {
    cursor: pointer;
    display: block;
    width: 30px;
    position: absolute;
    top: 27px;
    right: 30px;
    font-size: 26px;
  }
}

/* Dark Theme */
div.profile.dark {
  & > i:first-child {
    background-color: #262626;
    border-color: #262626;
  }

  & > div {
    p.title {
      & > span {
        color: #c0c4cc;
      }
    }
  }
}
</style>
