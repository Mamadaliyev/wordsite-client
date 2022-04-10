<template>
  <div class="quiz-comp">
    <el-row class="quiz-row">
      <el-col :span="12">
        <h3>
          <b> {{ index + 1 }} </b> . {{ quiz.name }}
        </h3>
        <el-row class="variants" :gutter="20">
          <el-col
            v-for="(variant, index) in quiz.variants"
            :key="index"
            :span="12"
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
              <div>
                <span class="letter"> {{ letters[index] }} </span>
                <span> {{ variant.name }} </span>
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
import { config } from "@/config";
import axios from "axios";
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
        const url = `${config.BASE_URL}/quiz-item/quiz/answer/${this.quiz._id}/${variant.wordId}`;
        const headers = {
          Authorization: `Bearer ${this.$store.state.token}`,
        };
        const data = await axios.post(url, {}, { headers: headers });
        console.log(data.data);
        this.quiz = data.data.data;
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
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .variants {
      .variant {
        width: 100%;
        border: 1px solid black;
        height: 49px;
        display: grid;
        align-items: center;
        margin: 15px;
        .letter {
          margin-right: 10px;
          padding: 15px;
          background-color: blueviolet;
          color: white;
        }
      }
      .variant:hover {
        cursor: pointer;
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
