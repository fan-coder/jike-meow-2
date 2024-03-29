<template>
  <div class="settings" :class="{ dark: $store.state.isDarkMode }">
    <Back title="账号设置"/>

    <main v-if="isGettingProfileData">
      <meow-loading style="margin-top: 150px"/>
    </main>

    <main ref="main" v-else>
      <!-- Account List -->
      <div
        class="settings-profile"
        :class="{ current: account.username === currentUsername }"
        v-for="account in accountList"
        :key="account.id"
        @click.stop="login(account)"
      >
        <i
          :style="{backgroundImage: 'url(' + account.avatarImage.smallPicUrl + ')'}"
          :title="account.screenName"
        >{{ account.screenName }}</i>
        <div>
          <p class="settings-profile-name" :title="account.screenName">{{ account.screenName }}</p>
          <!-- Verified Message -->
          <p class="settings-profile-title" v-if="account.isVerified" :title="account.screenName">
            <i></i>
            <span>{{ account.verifyMessage }}</span>
          </p>
        </div>
      </div>

      <!-- Cache New Account -->
      <i
        class="el-icon-circle-plus"
        v-if="accountList.length <= 3"
        @click.self.stop="saveAccountToStorage()"
      ></i>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import api from "@/api";
import func from "@/function";
import Back from "@/components/Back.vue";

@Component({
  components: {
    Back
  }
})
export default class Settings extends Vue {
  isGettingProfileData: boolean = true;
  currentUsername: string = "";
  accountList: Array<object> = [];

  created() {
    this.getData();
  }

  /* Fetch */
  getData() {
    api
      .profile()
      .then((data: any) => {
        /* Get Current User Data */
        const RESPONSE = data.data;

        RESPONSE.user.idToken = localStorage["idToken"];
        RESPONSE.user.accessToken = localStorage["accessToken"];
        RESPONSE.user.refreshToken = localStorage["refreshToken"];

        /* Add Current User To Accounts List */
        this.accountList = this.accountList.concat(RESPONSE.user);
        this.currentUsername = RESPONSE.user.username;

        /* Get Cached Account(s) */
        const STORAGE_TOKEN = localStorage["storageToken"];

        /* When There's No Cached Account(s) */
        if (!STORAGE_TOKEN) {
          this.isGettingProfileData = false;
          return;
        }

        /* Check Cache Scheme */
        try {
          JSON.parse(STORAGE_TOKEN);
        } catch {
          localStorage.removeItem("storageToken");
          this.isGettingProfileData = false;
          return;
        }

        /* Found Valid Account(s) */
        const STORAGE_ACCOUNT = JSON.parse(STORAGE_TOKEN);
        STORAGE_ACCOUNT.map((account: any) => {
          if (account.username !== this.currentUsername) {
            this.accountList.push(account);
          }
        });
        localStorage.setItem("storageToken", JSON.stringify(this.accountList));
        this.isGettingProfileData = false;
      })
      .catch(err => {
        if (err.response.status === 401) {
          func.refreshToken(this.getData());
        }
      });
  }

  /* Cache Account(s) */
  saveAccountToStorage() {
    /* Add Current Account(s) To List */
    let CURRENT_ACCOUNT: any = {};

    this.accountList.map((account: any) => {
      if (account.username === this.currentUsername) {
        CURRENT_ACCOUNT = account;
      }
    });

    /* When There's No Valid Account(s) */
    if (CURRENT_ACCOUNT === {}) {
      this.$message({
        showClose: true,
        message: "无法缓存当前帐号",
        type: "error"
      });
      return;
    }

    /* Confirmation */
    this.$confirm("添加新账号会将当前账号临时注销，是否继续？", "警告", {
      showClose: false,
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        /* Get Current User Data */
        const STORAGE_TOKEN = localStorage["storageToken"];

        CURRENT_ACCOUNT.idToken = localStorage["idToken"];
        CURRENT_ACCOUNT.accessToken = localStorage["accessToken"];
        CURRENT_ACCOUNT.refreshToken = localStorage["refreshToken"];

        /* Only Current Account Is Existed  */
        if (!STORAGE_TOKEN) {
          localStorage.setItem(
            "storageToken",
            JSON.stringify([CURRENT_ACCOUNT])
          );
          localStorage.removeItem("idToken");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          this.$router.push("/");
          return;
        }

        /* Cache Multiple Account */
        let STORAGE_ACCOUNT = JSON.parse(STORAGE_TOKEN);
        STORAGE_ACCOUNT.map((account: any, index: Number) => {
          if (account.username === this.currentUsername) {
            STORAGE_ACCOUNT.splice(index, 1);
          }
        });
        STORAGE_ACCOUNT = [CURRENT_ACCOUNT].concat(STORAGE_ACCOUNT);

        localStorage.setItem("storageToken", JSON.stringify(STORAGE_ACCOUNT));
        localStorage.removeItem("idToken");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        this.$router.push("/");
      })
      .catch(() => {});
  }

  /* Log In Cached Account */
  login(account: any) {
    if (this.accountList.length <= 1) return;

    /* Cannot Log In To The Same Account */
    if (account.username === this.currentUsername) return;

    /* Confirmation */
    this.$confirm(`确认登录 ID 为「${account.screenName}」的账号吗？`, "警告", {
      showClose: false,
      confirmButtonText: "登录",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        let NEW_STORAGE_TOKEN: Array<object> = [];
        this.accountList.map((id: any, index) => {
          /* Filter Other Sessions */
          if (account.idToken !== id.idToken) {
            id.idToken = NEW_STORAGE_TOKEN.push(id);
          } else {
            localStorage.setItem("idToken", account.idToken);
            localStorage.setItem("accessToken", account.accessToken);
            localStorage.setItem("refreshToken", account.refreshToken);
          }
        });

        /* Cache Other Sessions */
        localStorage.setItem("storageToken", JSON.stringify(NEW_STORAGE_TOKEN));

        this.$router.push("/me");
      })
      .catch(() => {});
  }
}
</script>

<style lang="scss" scoped>
main {
  display: block;
  width: 100%;
  padding: 50px 0 15px 0;
}

div.settings {
  div.settings-profile {
    cursor: pointer;
    display: block;
    width: 100%;
    padding: 10px 30px;
    font-size: 0;
    transition: background-color 0.3s ease-in-out;

    &.current {
      cursor: auto;
      background-color: #e4e7ed;
    }

    & > i {
      display: inline-block;
      vertical-align: middle;
      height: 50px;
      width: 50px;
      background: #fff center no-repeat;
      background-size: cover;
      border: 1px solid #fff;
      border-radius: 50%;
    }

    & > div {
      display: inline-block;
      vertical-align: middle;
      width: calc(100% - 70px);
      margin-left: 20px;

      p.settings-profile-name {
        display: block;
        font-size: 16px;
        font-weight: bold;
        line-height: 1.6;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* Verified Message */
      p.settings-profile-title {
        display: block;
        margin-top: 3px;
        width: 100%;

        & > i {
          content: "";
          display: inline-block;
          vertical-align: middle;
          margin-right: 5px;
          height: 16px;
          width: 16px;
          background: url("../assets/verified.svg") center no-repeat;
          background-size: 100%;
        }

        & > span {
          display: inline-block;
          vertical-align: middle;
          width: calc(100% - 21px);
          color: #909090;
          font-size: 12px;
          line-height: 1.6;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  /* Cache New Account */
  i.el-icon-circle-plus {
    cursor: pointer;
    display: block;
    margin: 20px auto 15px auto;
    font-size: 34px;
    line-height: 34px;
    width: 34px;
    border: 0;
    border-radius: 50%;
  }
}

div.settings.dark {
  div.settings-profile {
    &.current {
      background-color: #262626;
    }

    & > i {
      background-color: #262626;
      border-color: #262626;
    }
  }
}
</style>
