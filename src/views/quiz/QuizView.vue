<template>
  <div class="quiz">
    <el-row class="header" type="flex">
      <el-col>
        <el-button type="primary" @click="handleNewQuiz"> New quiz </el-button>
      </el-col>
    </el-row>
    <el-row class="body">
      <el-col>
        <el-table
          :data="tableData"
          style="width: 100%"
          empty-text="No data"
          v-loading="isLoading"
          @row-click="handleQuizInfo"
        >
          <el-table-column type="index" width="50" :index="getIndex">
          </el-table-column>
          <el-table-column label="Started date" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{
                moment(scope.row.startedAt).format("DD.MM.YYYY hh:mm")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Finished date" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{
                scope.row.isFinished
                  ? moment(scope.row.finishedAt).format("DD.MM.YYYY hh:mm")
                  : "in progress..."
              }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="score" label="Score"> </el-table-column>

          <el-table-column prop="totalQuestions" label="Total quizes">
          </el-table-column>

          <el-table-column prop="timeLimit" label="Time limit">
            <template slot-scope="scope">
              {{ Math.floor(scope.row.timeLimit / 60) }} minutes
            </template>
          </el-table-column>
          <el-table-column label="Time spent">
            <template slot-scope="scope">
              <span> {{ getDiffMinutes(scope.row) }} </span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <quiz-info-dialog
      :visible="infoVisible"
      v-on:close="handleCloseDialog"
      :info="selectedHistory"
    />
    <el-row class="pagination">
      <el-col :span="24" class="paging-col">
        <el-pagination
          :page-size="filter.limit"
          :current-page="filter.page"
          background
          layout="prev, pager, next"
          :total="filter.total"
          @current-change="handlePagingChange"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from "moment";
import QuizInfoDialog from "../../components/StartQuiz.vue";
import { quizApi } from "@/api";
export default {
  name: "QuizView",
  components: { QuizInfoDialog },
  data() {
    return {
      tableData: [],
      selectedHistory: {},
      total: 1,
      isLoading: false,
      infoVisible: false,
      filter: {
        limit: 10,
        page: 1,
        total: 0,
      },
    };
  },
  computed: {},
  created() {
    this.getQuizHistory();
  },
  methods: {
    getIndex(index) {
      return (this.filter.page - 1) * this.filter.limit + index + 1;
    },
    moment: function (args) {
      return moment(args);
    },
    handleQuizInfo(selected) {
      console.log(selected);
      this.$router.push({ name: "quiz-test", params: { id: selected._id } });
    },
    getDiffMinutes(row) {
      if (!row.isFinished) return "-";
      const startedAt = new Date(row.startedAt).getTime();
      const finishedAt = new Date(row.finishedAt).getTime();
      const milliseconds = Math.abs(finishedAt - startedAt);
      if (milliseconds / (1000 * 60) >= 1)
        return Math.floor(milliseconds / (1000 * 60)) + " minutes";
      return Math.floor(milliseconds / 1000) + " seconds";
    },
    handleCloseDialog() {
      this.infoVisible = false;
    },
    handleNewQuiz() {
      this.infoVisible = true;
    },
    async getQuizHistory() {
      try {
        this.isLoading = true;
        const quizes = await quizApi.getPaging(this.filter);
        this.tableData = quizes.data.data;
        this.filter.total = quizes.data.total;
        console.log(quizes);
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
    handlePagingChange(page) {
      this.filter.page = page;
      this.getQuizHistory();
    },
  },
};
</script>
<style scoped lang="scss">
.quiz {
  .header {
    margin-bottom: 10px;
  }
  .pagination {
    margin-top: 20px;
    .paging-col {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
