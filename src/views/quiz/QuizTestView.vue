<template>
  <div class="quiz-test">
    <el-row class="header">
      <el-col :span="4">
        <el-button type="danger" @click="handleFinish"> Finish </el-button>
      </el-col>
    </el-row>
    <quiz v-if="!isLoading" :question="currentQuiz" v-on:answer="handleNext" />
    <div class="loading" v-else v-loading="isLoading"></div>
  </div>
</template>

<script>
import Quiz from "../../components/Quiz.vue";
import axios from "axios";
import { config } from "@/config";
export default {
  components: { Quiz },
  data() {
    return {
      currentQuiz: {},
      isLoading: false,
      quizHistory: "",
      quizes: [],
      score: 0,
      quizIndex: 0,
      total: 0,
    };
  },
  created() {
    this.createQuiz(this.$route.params.size);
  },
  methods: {
    async handleFinish() {
      try {
        this.isLoading = true;
        const headers = {
          Authorization: `Bearer ${this.$store.state.token}`,
        };
        const data = await axios.post(
          `${config.BASE_URL}/quiz/finish/${this.quizHistory._id}`,
          {},
          { headers: headers }
        );
        this.$router.push({ name: "quiz" });
        console.log(data);
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
    handleNext(isTrue) {
      this.score += isTrue ? 1 : 0;
      if (this.quizIndex == this.total - 1) {
        this.handleFinish();
        this.$router.push({ name: "quiz" });
        return;
      }
      this.quizIndex++;
      this.currentQuiz = {
        ...this.quizes[this.quizIndex],
        isAnswered: false,
        isCorrect: false,
      };
      console.log(this.currentQuiz);
    },
    async createQuiz(size) {
      try {
        console.log(size);

        this.isLoading = true;
        const headers = {
          Authorization: `Bearer ${this.$store.state.token}`,
        };
        const data = await axios.post(
          `${config.BASE_URL}/quiz/create/${size}`,
          {},
          { headers: headers }
        );
        console.log(data);
        const quizes = data.data.data.quizes;
        this.quizes = quizes;
        this.total = this.quizes.length;
        this.currentQuiz = {
          ...quizes[0],
          isAnswered: false,
          isCorrect: false,
        };
        delete data.data.data.quizes;
        this.quizHistory = data.data.data;
        console.log(quizes);
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

<style scoped lang="scss">
.quiz-test {
  margin-top: 20px;
  .header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
