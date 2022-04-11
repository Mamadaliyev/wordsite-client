<template>
  <div class="quiz-info">
    <el-dialog title="Start quiz" :visible.sync="showDialog">
      <div>
        <el-form :model="settings" @submit.native.prevent="startQuiz">
          <el-form-item label="Enter the number of questions">
            <el-input v-model="settings.size"> </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align: right; margin-top: 10px">
        <el-button type="primary" @click="startQuiz"> Start </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { config } from "@/config";
import axios from "axios";

export default {
  name: "QuizDialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    info: {},
  },
  data() {
    return {
      quiz: {},
      settings: {
        size: 5,
      },
    };
  },
  created() {},
  computed: {
    showDialog: {
      get() {
        return this.visible;
      },
      set() {
        this.$emit("close");
      },
    },
  },
  methods: {
    async startQuiz() {
      try {
        this.isLoading = true;
        const headers = {
          Authorization: `Bearer ${this.$store.state.token}`,
        };
        const response = await axios.post(
          `${config.BASE_URL}/quiz/create/${this.settings.size}`,
          {},
          { headers: headers }
        );
        const data = response.data.data;
        this.$store.commit("setQuiz", data);

        this.$router.push({
          name: "quiz-retest",
          params: { id: data._id },
        });
      } catch (e) {
        console.log(e);
        this.$message.error("Something wrong");
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
