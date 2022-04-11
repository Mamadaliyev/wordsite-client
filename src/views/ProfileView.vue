<template>
  <div>
    <el-row class="profile">
      <el-col :span="12">
        <el-tabs
          @tab-click="handleTabClick"
          class="tabs"
          :tab-position="tabPosition"
          v-model="activeTab"
        >
          <el-tab-pane label="My profile" name="my-profile"
            ><my-profile
          /></el-tab-pane>
          <el-tab-pane label="Settings" name="settings">Settings</el-tab-pane>
          <el-tab-pane label="Logout" name="logout">Logout</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import MyProfile from "../components/MyProfile.vue";

export default {
  name: "ProfileView",
  components: {
    MyProfile,
  },
  data() {
    return {
      tabPosition: "left",
      activeTab: "my-profile",
    };
  },
  methods: {
    handleTabClick(tab) {
      if (tab.name == "logout") {
        this.$store.commit("Logout");
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.profile {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
