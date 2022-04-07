<template>
  <div class="quiz-comp">
    <el-row class="quiz-row">
      <el-col :span="12">
        <h3>{{ quiz.name }}</h3>
        <el-row class="variants" :gutter="20">
          <el-col
            v-for="(variant, index) in quiz.variants"
            :key="index"
            :span="12"
          >
            <div
              v-bind:class="{
                success:
                  (variant.isAnswered && variant.isCorrect) ||
                  (quiz.isCompleted && variant.isAnswer),
                error: variant.isSelected && !variant.isAnswer,
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "QuizComp",
  props: ["question"],
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
    handleAnswer(variant) {
      if (this.quiz.isAnswered) return;
      variant.isAnswered = true;
      this.quiz.isAnswered = true;

      setTimeout(() => {
        this.$emit("answer", variant.isAnswer);
      }, 1000);
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
