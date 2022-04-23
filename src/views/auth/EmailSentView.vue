<template>
  <div class="sent-email">
    <img src="@/assets/sent.png" alt="" />
    <span>Check your email & click the link to activate your account</span>
    <el-button class="button" @click="$router.push('/')">Go Home</el-button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.sent-email {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    height: 150px;
  }
  span {
    margin-top: 20px;
    font-size: 20px;
  }
  .button {
    margin-top: 30px;
  }
}
</style>
