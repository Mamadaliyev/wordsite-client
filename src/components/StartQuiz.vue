<template>
  <div class="quiz-info">
    <el-dialog title="Start quiz" :visible.sync="showDialog">
      <div>
        <el-form :model="settings" @submit.native.prevent="startQuiz">
          <el-form-item label="Enter the number of questions">
            <el-input v-model="settings.size"> </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align: right; margin-top: 10px">
        <el-button type="primary" @click="startQuiz"> Start </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "QuizDialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    info: {},
  },
  data() {
    return {
      quiz: {},
      settings: {
        size: 5,
      },
    };
  },
  created() {},
  computed: {
    showDialog: {
      get() {
        return this.visible;
      },
      set() {
        this.$emit("close");
      },
    },
  },
  methods: {
    startQuiz(e) {
      e.preventDefault();
      this.$router.push({
        name: "quiz-test",
        params: { size: this.settings.size },
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
