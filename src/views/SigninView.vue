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
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 100%; margin-top: 20px"
              type="primary"
              @click="submitForm('formData')"
              >Submit</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { config } from "../config";
import axios from "axios";
import store from "../store";

export default {
  name: "SigninView",
  data() {
    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("Please input the password"));
    //   } else {
    //     if (this.formData.checkPass !== "") {
    //       this.$refs.formData.validateField("checkPass");
    //     }
    //     callback();
    //   }
    // };
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("Please input the password again"));
    //   } else if (value !== this.formData.pass) {
    //     callback(new Error("Two inputs don't match!"));
    //   } else {
    //     callback();
    //   }
    // };
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
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const payload = { ...this.formData };
          const { data } = await axios.post(
            `${config.BASE_URL}/user/login`,
            payload
          );
          console.log(data);
          store.commit("setToken", data.data.token);
          store.commit("setUserData", data.data.user);
          this.$router.push({ name: "home" });
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
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
