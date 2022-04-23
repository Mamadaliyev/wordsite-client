<template>
  <div v-loading.fullscreen.lock="isLoading">
    <div class="wrapper">
      <div class="img">
        <img
          v-if="hasResponse && isVerified"
          src="@/assets/correct.png"
          alt="correct"
        />
        <img
          v-if="hasResponse && !isVerified"
          src="@/assets/close.png"
          alt="close"
        />
      </div>
      <div class="text">
        <span v-if="hasResponse && isVerified">Email is verified</span>
        <span v-if="hasResponse && isExpired">Token is expired</span>
        <span v-if="hasResponse && isInvalid">Token is invalid</span>
      </div>
    </div>
  </div>
</template>

<script>
import { userApi } from "@/api";
export default {
  data() {
    return {
      hasResponse: true,
      isVerified: false,
      isExpired: false,
      isInvalid: false,
      isLoading: false,
    };
  },
  created() {
    this.handleVerify();
  },
  methods: {
    async handleVerify() {
      try {
        this.isLoading = true;
        const payload = {
          token: this.$route.params.id,
        };
        const data = await userApi.verifyEmail(payload);
        this.hasResponse = true;
        this.isVerified = true;
        setTimeout(() => {
          this.$router.push({ name: "sign-in" });
        }, 1500);
      } catch (e) {
        console.log(e);
        this.isInvalid = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .img {
    img {
      height: 50px;
    }
  }
  .text {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
