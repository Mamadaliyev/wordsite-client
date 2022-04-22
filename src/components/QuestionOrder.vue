<template>
  <div class="question-order">
    <div class="row">
      <div
        v-for="(quiz, index) in quizes"
        v-bind:class="{
          active: quiz._id == currentId,
          answered: quiz.isAnswered,
        }"
        class="circle"
        :key="index"
        @click="handleNavigate(index)"
      >
        {{ index + 1 }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionOrder",
  props: {
    currentId: {
      type: String,
      default: "",
    },
    quizes: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleNavigate(index) {
      this.$emit("navigate", index);
    },
  },
};
</script>

<style scoped lang="scss">
.question-order {
  .row {
    display: flex;
    justify-content: center;
    align-items: center;
    .circle {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0.5px solid black;
      margin: 5px;
      height: 35px;
      width: 35px;
      border-radius: 50%;
      cursor: pointer;
    }
    .active {
      background-color: #04aa6d !important;
      color: white;
    }
    .answered {
      background-color: #201f24;
      color: white;
    }
  }
}
</style>
