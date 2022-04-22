<template>
  <div class="quiz-comp">
    <el-row class="quiz-row">
      <el-col :span="15">
        <h3>
          <b> {{ index + 1 }} </b> . {{ quiz.name }}
        </h3>
        <el-row class="variants">
          <el-col
            class="el-col-item"
            v-for="(variant, index) in quiz.variants"
            :key="index"
            :span="10"
          >
            <div
              v-bind:class="{
                success: quiz.isAnswered && variant.wordId == quiz.wordId,
                error:
                  quiz.isAnswered &&
                  quiz.selectedId &&
                  !quiz.isCorrect &&
                  variant.wordId == quiz.selectedId,
              }"
              class="variant"
              @click="handleAnswer(variant)"
            >
              <div class="item">
                <div class="key">{{ letters[index] }}</div>
                <div class="value">{{ variant.name }}</div>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="sliders">
          <span>
            <el-button size="small" :disabled="index == 0" @click="handlePrev">
              <i class="el-icon-arrow-left"></i>
            </el-button>
          </span>
          <span>
            <el-button
              size="small"
              :disabled="index == total - 1"
              @click="handleNext"
            >
              <i class="el-icon-arrow-right"></i>
            </el-button>
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { quizApi } from "@/api";

export default {
  name: "QuizComp",
  props: ["question", "index", "total", "isFinished"],
  data() {
    return {
      letters: ["A", "B", "C", "D"],
      quiz: {},
    };
  },
  watch: {
    question: function (newVal) {
      this.quiz = newVal;
    },
  },
  created() {
    console.log(this.question);
    if (this.question) this.quiz = this.question;
  },
  methods: {
    async handleAnswer(variant) {
      if (this.quiz.isAnswered || this.isFinished) return;
      try {
        const data = await quizApi.answer(this.quiz._id, variant.wordId);
        this.quiz = data.data;
      } catch (e) {
        console.log(e);
      }
      setTimeout(() => {
        this.$emit("answer", this.quiz);
      }, 1000);
    },
    handleNext() {
      this.$emit("next");
    },
    handlePrev() {
      this.$emit("prev");
    },
  },
};
</script>

<style scoped lang="scss">
.quiz-comp {
  .quiz-row {
    display: flex;
    justify-content: center;
    align-items: center;
    .sliders {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        margin: 2px;
      }
    }
    .variants {
      .el-col-item {
        height: 50px;
      }
      .variant {
        border: 1px solid black;
        height: 100%;
        .item {
          display: -webkit-box;
          justify-content: flex-start;
          height: 100%;
          align-items: center;
          .key {
            background-color: blue;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            color: white;
            width: 40px !important;
          }
          .value {
            padding: 10px;
          }
        }
      }
      .success {
        background-color: green;
        color: white;
      }
      .error {
        background-color: red;
        color: white;
      }
    }
  }
}
</style>
