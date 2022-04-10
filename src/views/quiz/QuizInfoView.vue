<template>
  <div class="quiz-info">
    <el-row class="header">
      <el-col :span="4" :offset="4"> {{ quizIndex + 1 }} / {{ total }} </el-col>
    </el-row>
    <quiz
      v-if="!isLoading"
      :question="currentQuiz"
      v-on:answer="handleNext"
      v-on:next="handleNext"
      v-on:prev="handlePrev"
      :total="total"
      :index="quizIndex"
    />

    <div></div>
  </div>
</template>

<script>
import axios from "axios";
import { config } from "@/config";
import Quiz from "../../components/Quiz.vue";

export default {
  components: { Quiz },
  data() {
    return {
      isLoading: false,
      currentQuiz: {},
      quizIndex: 0,
      total: 0,
      score: 0,
      quizes: [],
    };
  },
  created() {
    this.getQuizHistory();
  },
  methods: {
    async getQuizHistory() {
      try {
        this.isLoading = true;
        const headers = {
          Authorization: `Bearer ${this.$store.state.token}`,
        };
        const data = await axios.get(
          `${config.BASE_URL}/quiz/history/${this.$route.params.id}`,
          { headers: headers }
        );
        console.log(data.data.data);
        this.quizes = data.data.data.items;
        this.currentQuiz = this.quizes[0];
        this.total = this.quizes.length;
        this.score = data.data.data.score;
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
    handlePrev() {
      if (this.quizIndex == 0) {
        return;
      }
      this.quizIndex--;
      this.currentQuiz = this.quizes[this.quizIndex];
      console.log(this.currentQuiz);
    },
    handleNext() {
      if (this.quizIndex == this.total - 1) {
        return;
      }
      this.quizIndex++;
      this.currentQuiz = this.quizes[this.quizIndex];
      console.log(this.currentQuiz);
    },
  },
};
</script>

<style scoped lang="scss">
.quiz-info {
}
</style>
