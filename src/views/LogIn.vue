<template>
  <div class="home" :class="{ dark: $store.state.isDarkMode }">
    <div class="body">
      <!-- Title -->
      <p class="title">扫描下方二维码登录</p>

      <!-- QR Code -->
      <div class="qr">
        <vue-loading
          v-if="isQRcodeGenerating"
          type="bubbles"
          :color="$store.state.isDarkMode ? '#ffffff' : '#404040'"
          :size="{ width: '60px', height: '60px' }"
        ></vue-loading>
        <img class="src" v-if="dataQRcode" :src="dataQRcode">
        <div class="hover" v-if="isWaitingForLogin">
          <span @click.stop="createSessions()">
            若二维码过期
            <br>点击此处手动刷新
          </span>
        </div>
      </div>

      <!-- Notice -->
      <p class="notice">
        使用说明:
        <br>
        <span :class="{ display: !isWaitingForLogin }">
          1. 打开「即刻」官方客户端
          <br>2. 进入到「首页」
          <br>3. 点击右上角「二维码」图标
          <br>4. 扫描上方二维码
        </span>
        <br>
        <span :class="{ display: isWaitingForLogin }">5. 点击「确认」即可</span>
      </p>

      <!-- Cached Account(s) -->
      <div class="account" v-if="storageToken.length > 0">
        <h3>检测到可登录账号</h3>
        <i
          v-for="account in storageToken"
          :key="account.id"
          :title="account.screenName"
          :style="{backgroundImage: 'url(' + account.avatarImage.smallPicUrl + ')'}"
          @click.self.stop="login(account)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QRCode from "qrcode";
import api from "@/api";

@Component
export default class LogIn extends Vue {
  isQRcodeGenerating: boolean = false;
  isWaitingForLogin: boolean = false;
  dataQRcode: string = "";
  storageToken: Array<object> = [];

  created() {
    this.isQRcodeGenerating = true;
    this.createSessions();

    /* Get Cached Sessions */
    const STORAGE_TOKEN = localStorage["storageToken"];
    if (!STORAGE_TOKEN) return;

    try {
      JSON.parse(STORAGE_TOKEN);
    } catch {
      localStorage.removeItem("storageToken");
      return;
    }

    this.storageToken = JSON.parse(STORAGE_TOKEN);
  }

  /* Get UUID */
  createSessions() {
    this.isWaitingForLogin = false;

    api.createSessions().then((data: any) => {
      const res: any = data.data;

      setTimeout(() => {
        const qrURL = `jike://page.jk/web?url=https%3A%2F%2Fruguoapp.com%2Faccount%2Fscan%3Fuuid%3D${
          res.uuid
        }&displayHeader=false&displayFooter=false`;
        this.generateQRcode(qrURL);
      }, 1000);

      this.waitForLogin(res.uuid);
    });
  }

  /* Wait For Login */
  waitForLogin(uuid: string) {
    api
      .waitForLogin(uuid)
      .then((data: any) => {
        const RESPONSE = data.data;

        if (RESPONSE && RESPONSE.logged_in === true) {
          this.isWaitingForLogin = true;
          this.waitForConfirmation(uuid);
          return;
        }

        this.createSessions();
      })
      .catch(() => {
        this.createSessions();
        return;
      });
  }

  /* Get Token */
  waitForConfirmation(uuid: string) {
    api
      .waitForConfirmation(uuid)
      .then((data: any) => {
        const RESPONSE = data.data;

        if (RESPONSE.confirmed === true) {
          if (
            !RESPONSE.token ||
            !RESPONSE["x-jike-access-token"] ||
            !RESPONSE["x-jike-refresh-token"]
          ) {
            /* Error Detection */
            this.$message({
              showClose: true,
              message: "登录失败，或与官方数据更新有关",
              type: "warning"
            });
            return;
          }

          localStorage.setItem("idToken", RESPONSE.token);
          localStorage.setItem("accessToken", RESPONSE["x-jike-access-token"]);
          localStorage.setItem(
            "refreshToken",
            RESPONSE["x-jike-refresh-token"]
          );

          this.$router.replace("/me");
          return;
        }
      })
      .catch(() => {
        this.$message({
          showClose: true,
          message: "登录失败，请重新扫描二维码登录",
          type: "error"
        });
        return;
      });
  }

  /* Generate QRCode */
  generateQRcode(text: string) {
    QRCode.toDataURL(text, {
      margin: 3,
      width: 600
    })
      .then((url: string) => {
        this.isQRcodeGenerating = false;
        this.dataQRcode = url;
      })
      .catch(() => {
        this.isQRcodeGenerating = false;
        return;
      });
  }

  /* LogIn Cached Account */
  login(account: any) {
    this.$confirm(`确认登录 ID 为「${account.screenName}」的账号吗？`, "提示", {
      showClose: false,
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        const idToken = account.idToken;
        const accessToken = account.accessToken;
        const refreshToken = account.refreshToken;

        /* Get Cached Sessions */
        if (this.storageToken.length === 1) {
          localStorage.setItem("idToken", idToken);
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.removeItem("storageToken");
        } else if (this.storageToken.length > 1) {
          let NEW_STORAGE_TOKEN: Array<object> = [];

          this.storageToken.map((id: any, index) => {
            if (idToken !== id.idToken) {
              NEW_STORAGE_TOKEN.push(id);
            } else {
              localStorage.setItem("idToken", idToken);
              localStorage.setItem("accessToken", accessToken);
              localStorage.setItem("refreshToken", refreshToken);
            }
          });

          localStorage.setItem(
            "storageToken",
            JSON.stringify(NEW_STORAGE_TOKEN)
          );
        }

        this.$router.push("/me");
      })
      .catch(() => {});
  }
}
</script>

<style lang="scss" scoped>
div.home {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 500px;
  width: 100%;
  overflow-y: auto;

  div.body {
    display: block;
    width: 100%;
    max-width: 280px;
    margin: auto;
    padding: 30px;

    /* Title */
    p.title {
      display: block;
      width: 100%;
      font-size: 18px;
      font-weight: bold;
      line-height: 1.6;
      margin-bottom: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* QR Code */
    div.qr {
      display: block;
      position: relative;
      width: 100%;
      padding-top: 100%;
      margin: auto;
      background: transparent;
      overflow: hidden;
    }
    div.vue-loading {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 5;
    }
    img.src {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 4;
    }
    div.hover {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(255, 255, 255, 0.9);
      z-index: 5;

      & > span {
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.8;
        padding: 10px 15px;
        color: #000;
        background-color: #fff;
        border: 1px solid #e1e2e3;
      }
    }

    /* Notice */
    p.notice {
      display: block;
      margin-top: 15px;
      width: 100%;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.6;
      text-align: left;

      & > span {
        color: #cdcdcd;
        text-decoration: line-through;
      }

      span.display {
        color: #000;
        text-decoration: none;
      }
    }

    /* Cached Account(s) */
    div.account {
      display: block;
      margin-top: 20px;
      width: 100%;
      font-size: 0;
      text-align: center;

      & > h3 {
        display: block;
        margin-bottom: 15px;
        font-size: 16px;
        font-weight: bold;
        line-height: 1.6;
      }

      & > i {
        cursor: pointer;
        display: inline-block;
        vertical-align: middle;
        height: 50px;
        width: 50px;
        margin: 0 5px 10px 5px;
        border: 1px solid #e1e2e3;
        border-radius: 50%;
        background: center no-repeat;
        background-size: cover;
      }
    }
  }
}

div.home.dark {
  div.body {
    p.notice {
      & > span {
        color: #999;
      }

      span.display {
        color: #fff;
      }
    }

    div.account {
      & > i {
        background-color: #262626;
        border-color: #262626;
      }
    }
  }
}
</style>
