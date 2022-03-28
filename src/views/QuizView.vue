<template>
  <div>
    <el-row>
      <el-col :span="24">
        <quiz
          v-if="!isLoading"
          :question="currentQuiz"
          v-on:answer="handleNext"
        />
        <div class="loading" v-else v-loading="isLoading"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Quiz from "../components/Quiz.vue";
import axios from "axios";
import { config } from "../config";

export default {
  name: "QuizView",
  components: { Quiz },
  data() {
    return {
      quizes: [],
      currentQuiz: {},
      quizIndex: 0,
      total: 1,
      isLoading: false,
      score: 0,
    };
  },
  created() {
    this.getQuiz();
  },
  methods: {
    handleNext(isTrue) {
      this.score += isTrue ? 1 : 0;
      if (this.quizIndex == this.total - 1) {
        alert(this.score);
        return;
      }
      this.quizIndex++;
      this.currentQuiz = this.quizes[this.quizIndex];
      console.log(this.currentQuiz);
    },
    async getQuiz() {
      try {
        this.isLoading = true;
        const headers = {
          Authorization: `Bearer ${this.$store.state.token}`,
        };
        const { data } = await axios.get(`${config.BASE_URL}/quiz/${5}`, {
          headers: headers,
        });
        this.total = data.data.total;
        this.quizes = data.data.data.map((question) => {
          question.variants.map((item) => {
            item.isSelected = false;
            return item;
          });
          question.isCompleted = false;
          return question;
        });
        this.currentQuiz = this.quizes[0];
        console.log(this.currentQuiz);
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
