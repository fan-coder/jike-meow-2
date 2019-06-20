<template>
  <div class="notification-center" :class="{ dark: $store.state.isDarkMode }">
    <!-- Text -->
    <div class="text">
      <a
        :href="`https://web.okjike.com/user/${data.actionItem.users[0].username}/post`"
        target="_blank"
      >{{ data.actionItem.users[0].screenName }}</a>&nbsp;
      <span>{{ actionDescription }}</span>

      <!-- 内容审核中 -->
      <div class="content hidden" v-if="data.actionItem.status === 'HIDDEN'">
        <span>{{ data.actionItem.content }}</span>
      </div>

      <!-- 内容已删除 -->
      <div class="content hidden" v-else-if="data.actionItem.status === 'DELETED'">
        <span>{{ data.actionItem.content }}</span>
      </div>

      <!-- 正常显示 -->
      <div class="content" v-else>
        {{ data.actionItem.content || '' }}
        <span
          class="content-picture"
          v-if="data.actionItem.pictures && data.actionItem.pictures.length > 0"
          @click.self.stop="$store.commit('enlargeImage', data)"
        >查看图片</span>
      </div>
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
export default class ThreeCenter extends Vue {}
</script>

<style lang="scss" scoped>
div.notification-center {
  display: inline-block;
  vertical-align: top;
  width: calc(100% - 135px);
  margin-right: 15px;

  div.text {
    display: block;
    min-height: 44px;
    width: 100%;
    font-size: 14px;
    line-height: 1.6;
    color: #606266;

    & > a {
      color: #303133;
    }

    div.content {
      display: block;
      width: 100%;
      margin-top: 3px;
      font-size: 13px;
      line-height: 1.6;
      color: #909399;

      &.hidden > span {
        padding: 3px 6px;
        font-size: 11px;
        line-height: 1.6;
        color: #fff;
        background-color: #909399;
        border-radius: 4px;
      }

      span.content-picture {
        cursor: pointer;
        color: #409eff;
      }
    }
  }

  div.time {
    display: block;
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: 12px;
    line-height: 1.6;
    color: #909399;
  }
}

div.notification-center.dark {
  div.text {
    color: #c0c4cc;

    & > a {
      color: #fff;
    }
  }

  div.time {
    color: #c0c4cc;
  }
}
</style>
