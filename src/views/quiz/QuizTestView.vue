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
      isFinished: true,
      total: 0,
      id: "",
    };
  },
  created() {
    // if (this.$route.params.id || this.id) {
    //   this.id = this.$route.params.id;
    // } else {
    //   this.createQuiz(this.$route.params.size);
    // }
    this.getQuizHistory();
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
        const headers = {
          Authorization: `Bearer ${this.$store.state.token}`,
        };
        const data = await axios.get(`${config.BASE_URL}/quiz/history/${id}`, {
          headers: headers,
        });
        this.quizes = data.data.data.quizes;
        this.currentQuiz = this.quizes[0];
        this.total = this.quizes.length;
        this.score = data.data.data.score;
        delete data.data.data.quizes;
        this.quizHistory = data.data.data;
        this.isFinished = data.data.data.isFinished;
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
