<template>
  <div id="app">
    <navmenu />
    <el-row>
      <router-view />
    </el-row>
  </div>
</template>

<script>
import Navmenu from "./components/NavMenu.vue";

export default {
  components: {
    Navmenu,
  },
  created() {
    console.log("base url", process.env.VUE_APP_BASE_URL);
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}
</style>
