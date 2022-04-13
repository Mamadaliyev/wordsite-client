<template>
  <div class="quiz-test">
    <el-row class="header">
      <el-col :span="4"> {{ quizIndex + 1 }} / {{ total }} </el-col>
      <el-col :span="4">
        <el-button v-if="!isFinished" type="danger" @click="handleFinish">
          Finish
        </el-button>
      </el-col>
    </el-row>
    <quiz
      v-if="!isLoading"
      :question="currentQuiz"
      v-on:answer="handleAnswer"
      v-on:next="handleNext"
      v-on:prev="handlePrev"
      :total="total"
      :index="quizIndex"
      :isFinished="isFinished"
    />
    <div class="loading" v-else v-loading="isLoading"></div>
  </div>
</template>

<script>
import Quiz from "../../components/Quiz.vue";
import { quizApi } from "@/api";
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
      isFinished: true,
      total: 0,
      id: "",
    };
  },
  created() {
    this.getQuizHistory();
  },
  mounted() {
    this.interval = setInterval(() => {
      this.checkLifeTime();
    }, 1000);
  },
  methods: {
    checkLifeTime() {
      if (this.$store.state.quiz) {
        if (
          !this.$store.state.quiz.isFinished &&
          new Date(this.$store.state.quiz.finishingAt) < new Date()
        ) {
          this.handleFinish();
        }
      }
    },
    async handleFinish() {
      try {
        this.isLoading = true;
        const data = await quizApi.finish(this.quizHistory._id);
        this.$router.push({ name: "quiz" });
        this.$store.commit("setQuiz", data.data);
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
    handleAnswer(quiz) {
      this.score += quiz.isCorrect ? 1 : 0;
      if (this.quizIndex == this.total - 1) return;

      this.quizes[this.quizIndex] = quiz;
      this.quizIndex++;
      this.currentQuiz = {
        ...this.quizes[this.quizIndex],
      };
      console.log(this.currentQuiz);
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
    async getQuizHistory() {
      try {
        const id = this.$route.params.id;
        this.isLoading = true;
        const data = await quizApi.get(id);
        this.quizes = data.data.quizes;
        this.currentQuiz = this.quizes[0];
        this.total = this.quizes.length;
        this.score = data.data.score;
        delete data.data.quizes;
        this.quizHistory = data.data;
        this.isFinished = data.data.isFinished;
      } catch (e) {
        console.log(e);
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
