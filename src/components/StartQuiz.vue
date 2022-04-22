<template>
  <div class="quiz-info">
    <el-dialog title="Start quiz" :visible.sync="showDialog">
      <div>
        <el-form
          v-loading="isLoading"
          :model="settings"
          @submit.native.prevent="startQuiz"
          label-width="150px"
        >
          <el-form-item label="Date range">
            <el-date-picker
              v-model="settings.dateFrom"
              type="date"
              placeholder="dan"
            >
            </el-date-picker>
            <el-date-picker
              v-model="settings.dateTo"
              type="date"
              placeholder="gacha"
              style="margin-left: 10px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="Visiblity">
            <el-select v-model="settings.visiblity">
              <el-option
                v-for="item in visiblities"
                :key="item.value"
                :value="item.value"
                :label="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Tags">
            <el-select
              v-model="settings.tagIds"
              style="width: 100%"
              multiple
              filterable
              remote
              default-first-option
              :remote-method="getTagForChoose"
              placeholder="Choose tags"
              :loading="isTagLoading"
            >
              <el-option
                v-for="(tag, index) in tags"
                :key="index"
                :label="tag.name"
                :value="tag._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Number of questions">
            <el-input v-model="settings.size"> </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align: right; margin-top: 10px">
        <el-button :disabled="isLoading" type="primary" @click="startQuiz">
          Start
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { quizApi, tagApi } from "@/api";

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
      tags: [],
      isLoading: false,
      visiblities: [
        {
          name: "Both",
          value: "both",
        },
        {
          name: "Public",
          value: "public",
        },
        {
          name: "Private",
          value: "private",
        },
      ],
      isTagLoading: false,
      settings: {
        size: 5,
        dateFrom: "",
        dateTo: "",
        visiblity: "both",
      },
    };
  },
  created() {
    this.getTagForChoose("");
  },
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
    async startQuiz() {
      try {
        this.isLoading = true;
        const query = {
          ...this.settings,
          size: Number(this.settings.size),
        };
        Object.keys(query).forEach((key) => {
          if (!query[key]) delete query[key];
          if (Array.isArray(query[key]) && !query[key].length)
            delete query[key];
        });
        console.log(query);

        const data = await quizApi.create(query);
        this.$store.commit("setQuiz", data.data);

        this.$router.push({
          name: "quiz-test",
          params: { id: data.data._id },
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
    async getTagForChoose(query) {
      try {
        this.isTagLoading = true;
        const payload = {
          search: query,
          page: 1,
          limit: 10,
        };
        const data = await tagApi.getForChoose(payload);
        this.tags = data.data.data;
      } catch (e) {
        console.log(e);
      } finally {
        this.isTagLoading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
