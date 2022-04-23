<template>
  <div>
    <el-row class="sign-in">
      <el-col :span="6">
        <div style="text-align: center">
          <h2>Sign in</h2>
        </div>
        <el-form
          :model="formData"
          label-position="top"
          @submit.native.prevent=""
          status-icon
          :rules="rules"
          ref="formData"
          label-width="120px"
          class="demo-formData"
        >
          <el-form-item label="Email" prop="email">
            <el-input
              type="email"
              v-model="formData.email"
              autocomplete="on"
            ></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input
              type="password"
              v-model="formData.password"
              autocomplete="on"
            ></el-input>
            <el-button class="forgot-text" type="text"
              >Forgot password?</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 100%"
              type="primary"
              native-type="submit"
              @click="submitForm('formData')"
              >Submit</el-button
            >
          </el-form-item>
        </el-form>
        <p class="join-text">
          New to Takrorla?
          <el-button @click="$router.push({ name: 'sign-up' })" type="text"
            >Join now</el-button
          >
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import store from "../../store";
import { userApi } from "../../api";

export default {
  name: "SigninView",
  data() {
    return {
      formData: {
        password: "",
        email: "",
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            trigger: "blur",
            message: "Email is not valid",
          },
        ],
        password: [
          {
            min: 6,
            required: true,
            trigger: "blur",
            message: "Password should be at least 6",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName, e) {
      console.log(formName, e);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const payload = { ...this.formData };
            const data = await userApi.login(payload);
            store.commit("setToken", data.data.token);
            store.commit("setUserData", data.data.user);
            this.$router.push({ name: "home" });
          } catch (e) {
            console.log(e);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.sign-in {
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  .forgot-text {
    margin-top: 10px;
  }
  .join-text {
    text-align: center;
  }
}
</style>
