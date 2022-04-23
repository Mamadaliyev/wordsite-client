<template>
  <div>
    <el-row class="sign-up">
      <el-col :span="6">
        <div style="text-align: center">
          <h2>Sign up</h2>
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
          <el-form-item label="Name" prop="name">
            <el-input
              type="text"
              v-model="formData.name"
              autocomplete="on"
            ></el-input>
          </el-form-item>
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
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="Confirm Password" prop="confirmPassword">
            <el-input
              type="password"
              v-model="formData.confirmPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 100%; margin-top: 20px"
              type="primary"
              native-type="submit"
              @click="submitForm('formData')"
              >Submit</el-button
            >
          </el-form-item>
        </el-form>
        <p class="footer">
          If you already have an account?
          <el-button type="text" @click="$router.push({ name: 'sign-in' })"
            >Sign in</el-button
          >
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { userApi } from "@/api";
export default {
  name: "SignupView",
  data() {
    var confirmPassValidate = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.formData.password) {
        callback(new Error("Passwords don't match!"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        name: "",
        password: "",
        email: "",
        confirmPassword: "",
      },
      rules: {
        name: [
          {
            min: 2,
            required: true,
            trigger: "blur",
            message: "Name should be at least 2 characters",
          },
        ],
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
            message: "Password should be at least 6 characters",
          },
        ],
        confirmPassword: [
          {
            required: true,
            validator: confirmPassValidate,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const payload = { ...this.formData };
            await userApi.register(payload);
            this.$router.push({ name: "email-sent" });
          } catch (e) {
            console.log(e);
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang="scss">
.sign-up {
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  .footer {
    text-align: center;
  }
}
</style>
