<template>
  <div class="follow" :class="{ dark: $store.state.isDarkMode }">
    <div @click.stop="$router.push('/me/following?username=' + data.user.username)">
      <p>关注</p>
      <span>{{ data.user.statsCount.followingCount > 99999 ? '9999+' : data.user.statsCount.followingCount }}</span>
    </div>
    <div @click.stop="$router.push('/me/follower?username=' + data.user.username)">
      <p>粉丝</p>
      <span>{{ data.user.statsCount.followedCount > 99999 ? '99999+' : data.user.statsCount.followedCount }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: ["data"]
})
export default class Follow extends Vue {}
</script>

<style lang="scss" scoped>
div.follow {
  display: block;
  width: 100%;
  margin-top: 10px;
  padding: 0 30px;
  font-size: 0;

  & > div {
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    width: calc(50% - 7.5px);
    padding: 10px;
    text-align: center;
    background-color: #e4e7ed;
    border-radius: 4px;
    transition: background-color 0.15s ease-in-out;

    &:hover {
      color: #303133;
      background-color: #ffe411;
    }
    & > p {
      display: block;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.6;
    }
    & > span {
      display: block;
      font-size: 18px;
      font-weight: 500;
      line-height: 1.6;
    }
  }
  & > div + div {
    margin-left: 15px;
  }
}

/* Dark Theme */
div.follow.dark {
  & > div {
    background-color: #262626;

    &:hover {
      background-color: #ffe411;
    }
  }
}
</style>
