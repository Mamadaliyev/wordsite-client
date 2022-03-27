<template>
  <div>
    <div>
      <h2>Name:</h2>
      <span> {{ userData.name }} </span>
      <h2>Email:</h2>
      <span> {{ userData.email }} </span>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
      userData: {},
    };
  },
  created() {
    const userData = store.getters.getUserData;
    this.userData = userData;
    console.log(userData);
  },
};
</script>
