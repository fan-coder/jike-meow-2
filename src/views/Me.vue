<template>
  <div class="me">
    <Header/>

    <main v-if="isGettingProfileData">
      <meow-loading style="margin-top: 150px"/>
    </main>

    <main v-else>
      <Profile :data="data"/>
      <Bio :data="data"/>
      <Follow :data="data"/>
      <Theme/>
      <LogOut/>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from "@/api";
import func from "@/function";

import Header from "@/components/Header.vue";
import Profile from "@/components/me/Profile.vue";
import Bio from "@/components/me/Bio.vue";
import Follow from "@/components/me/Follow.vue";
import Theme from "@/components/me/Theme.vue";
import LogOut from "@/components/me/Logout.vue";

@Component({
  components: { Header, Profile, Bio, Follow, Theme, LogOut }
})
export default class Me extends Vue {
  isGettingProfileData: boolean = true;
  data: any = {};

  created() {
    this.getData();
  }

  /* Fetch */
  getData() {
    api
      .profile()
      .then((data: any) => {
        this.data = data.data;
        this.isGettingProfileData = false;
      })
      .catch(err => {
        if (err.response.status === 401) {
          func.refreshToken(this.getData());
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
</style>
