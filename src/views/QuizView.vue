<template>
  <div>
    <el-row>
      <el-col :offset="3" :span="18">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              label="Started date"
              width="180">
                 <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ new Date(scope.row.startedAt).toLocaleString() }}</span>
                </template>
            </el-table-column>
            <el-table-column
              label="Finished date"
              width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ new Date(scope.row.finishedAt).toLocaleString() }}</span>
                </template>
            </el-table-column>
                 
            <el-table-column
              prop="score"
              label="Score">
            </el-table-column>

            <el-table-column
              prop="totalQuestions"
              label="Total quizes">
            </el-table-column>
            
              <el-table-column
              prop="timeLimit"
              label="Time limit">
            </el-table-column>

          </el-table>
        <!-- <quiz
          v-if="!isLoading"
          :question="currentQuiz"
          v-on:answer="handleNext"
        /> -->
        <!-- <div class="loading" v-else v-loading="isLoading"></div> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import Quiz from "../components/Quiz.vue";
import axios from "axios";
import { config } from "../config";

export default {
  name: "QuizView",
  // components: { Quiz },
  data() {
    return {
      quizes: [],
      tableData: [],
      currentQuiz: {},
      quizIndex: 0,
      total: 1,
      isLoading: false,
      score: 0,
    };
  },
  created() {
    // this.getQuiz();
    this.getQuizHistory();
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
        const { data } = await axios.post(`${config.BASE_URL}/quiz/create/${5}`,{}, {
          headers: headers,
        });
        console.log(data.data);
        this.total = data.data.quizes.length;
        this.quizes = data.data.quizes;
        this.currentQuiz = this.quizes[0];
        console.log(this.currentQuiz);
      } catch (e) {
        console.log(e);
        this.$message.error("Something wrong");
      } finally {
        this.isLoading = false;
      }
    },
    async getQuizHistory() {
      const headers = {
          Authorization: `Bearer ${this.$store.state.token}`,
        };
      const quizes = await axios.post(`${config.BASE_URL}/quiz`, {page: 1, limit: 10}, {headers:headers});
      this.tableData = quizes.data.data.data;
      console.log(quizes);
    }
  },
};
</script>
