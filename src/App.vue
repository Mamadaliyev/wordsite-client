<template>
  <div id="app">
    <!-- <custom-menu /> -->
    <navmenu v-if="$route.name != 'verify'" />
    <el-row>
      <el-col :offset="2" :span="20">
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Navmenu from "./components/NavMenu.vue";
// import CustomMenu from "./components/custom-menu/CustomMenu.vue";
export default {
  components: {
    Navmenu,
    // CustomMenu,
  },
  created() {
    console.log(this.$route.name);
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
