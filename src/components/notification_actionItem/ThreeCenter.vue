<template>
  <div class="notification-center" :class="{ dark: $store.state.isDarkMode }">
    <div class="text">
      <a
        :href="`https://web.okjike.com/user/${data.actionItem.users[0].username}/post`"
        target="_blank"
      >{{ data.actionItem.users[0].screenName }}</a>&nbsp;
      <span>{{ actionDescription }}</span>
      <div class="content hidden" v-if="data.actionItem.status === 'HIDDEN'">
        <span>{{ data.actionItem.content }}</span>
      </div>
      <div class="content hidden" v-else-if="data.actionItem.status === 'DELETED'">
        <span>{{ data.actionItem.content }}</span>
      </div>
      <div class="content" v-else>
        {{ data.actionItem.content || '' }}
        <span
          class="content-picture"
          v-if="data.actionItem.pictures && data.actionItem.pictures.length > 0"
          @click.self.stop="$store.commit('enlargeImage', data)"
        >查看图片</span>
      </div>
    </div>
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

<style scoped>
div.notification-center {
  display: inline-block;
  vertical-align: top;
  width: calc(100% - 135px);
  margin-right: 15px;
}

div.text {
  display: block;
  min-height: 44px;
  width: 100%;
  font-size: 14px;
  line-height: 1.6;
  color: #808080;
}
div.notification-center.dark div.text {
  color: #bbb;
}
div.text > a {
  color: #000;
}
div.notification-center.dark div.text > a {
  color: #fff;
}
div.content {
  display: block;
  width: 100%;
  margin-top: 3px;
  font-size: 13px;
  line-height: 1.6;
  color: #999;
}
div.content.hidden > span {
  padding: 3px 6px;
  font-size: 11px;
  line-height: 1.6;
  color: #fff;
  background-color: #999;
  border-radius: 4px;
}
span.content-picture {
  cursor: pointer;
  color: #409eff;
}

div.time {
  display: block;
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 12px;
  line-height: 1.6;
  color: #999;
}
div.notification-center.dark div.time {
  color: #bbb;
}
</style>
