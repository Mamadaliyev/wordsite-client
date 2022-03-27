<template>
  <div>
    <el-row class="nav-menu">
      <el-col :span="4"> <span> logo </span> </el-col>
      <el-col :span="20">
        <ul class="topnav">
          <div>
            <li v-for="(menu, index) in menus" :key="index">
              <span
                v-if="!menu.hasAuth || isAuthenticated"
                v-bind:class="{ active: currentRouteName == menu.routeName }"
                @click="handleMenu(menu.routeName)"
                >{{ menu.name }}</span
              >
            </li>
          </div>
          <div>
            <li class="right">
              <span
                v-bind:class="{ active: currentRouteName == 'profile' }"
                @click="handleMenu('profile')"
                v-if="isAuthenticated"
                ><i class="el-icon-user-solid"></i>
              </span>
              <div v-else class="right-side">
                <span
                  v-bind:class="{ active: currentRouteName == 'sign-in' }"
                  @click="handleMenu('sign-in')"
                  >Signin
                </span>
                <span
                  v-bind:class="{ active: currentRouteName == 'sign-up' }"
                  @click="handleMenu('sign-up')"
                  >Signup
                </span>
              </div>
            </li>
          </div>
        </ul>
      </el-col>
      <el-col :span="4"> </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          name: "Home",
          routeName: "home",
          hasAuth: false,
        },
        {
          name: "Tags",
          routeName: "tags",
          hasAuth: false,
        },
        {
          name: "Quiz",
          routeName: "quiz",
          hasAuth: false,
        },
        {
          name: "My words",
          routeName: "my-words",
          hasAuth: true,
        },
      ],
    };
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    isAuthenticated() {
      return !!this.$store.state.token;
    },
  },
  methods: {
    handleMenu(name) {
      console.log(name);
      this.$router.push({ name });
    },
  },
};
</script>

<style scoped lang="scss">
.nav-menu {
  background-color: #333;
  font-size: 18px;
}
ul.topnav {
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

ul.topnav li {
  float: left;
}

ul.topnav li span {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 40px;
  text-decoration: none;
}

ul.topnav li span:hover:not(.active) {
  background-color: #111;
  cursor: pointer;
}

ul.topnav li span.active {
  background-color: #04aa6d;
  cursor: pointer;
}

ul.topnav li.right {
  float: right;
}

ul.topnav .right-side {
  display: flex;
}

@media screen and (max-width: 600px) {
  ul.topnav li.right,
  ul.topnav li {
    float: none;
  }
}
</style>
