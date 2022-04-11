<template>
  <div class="home">
    <el-row class="header">
      <el-col :offset="18" :span="4">
        <el-input
          suffix-icon="el-icon-search"
          placeholder="Search"
          v-model="filter.search"
          @input.native="getWords"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="top-row">
      <el-col :span="20">
        <el-row :gutter="10" class="inner-row">
          <el-col v-for="(word, index) in words" :key="index" :span="4">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>
                  <b> {{ word.name }} </b></span
                >
              </div>
              <span> {{ word.defination }} </span>
              <div class="tags">
                <span v-for="tag in word.tags" :key="tag._id" class="text item">
                  <a href="" @click="handleTag(tag)"> {{ `#${tag}` }} </a>
                </span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="pagination">
      <el-pagination
        :page-size="filter.limit"
        :current-page="filter.page"
        background
        layout="prev, pager, next"
        :total="filter.total"
        @current-change="handlePagingChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { config } from "../config";

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      search: "",
      isLoading: false,
      filter: {
        search: "",
        page: 1,
        limit: 20,
        total: 20,
      },
      words: [],
    };
  },
  created() {
    this.getWords();
  },
  methods: {
    handleTag(tag) {
      this.$router.push({ path: `/tags?tag=${tag}` });
    },
    async getWords() {
      try {
        this.isLoading = true;
        const payload = {
          ...this.filter,
        };
        const headers = {
          Authorization: `Bearer ${this.$store.state.token}`,
        };
        const { data } = await axios.post(
          `${config.BASE_URL}/word/public`,
          payload,
          { headers: headers }
        );
        this.filter.total = data.data.total;
        this.words = data.data.data;
      } catch (e) {
        console.log(e);
        this.$message.error("Something wrong");
      } finally {
        this.isLoading = false;
      }
    },
    handlePagingChange(page) {
      this.filter.page = page;
      this.getWords();
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  margin-top: 20px;
  .add-row {
    margin-bottom: 20px;
  }
  .top-row {
    display: flex;
    justify-content: center;
    align-items: center;
    .inner-row {
      display: flex;
      .box-card {
        height: 100%;
      }
      .el-col {
        margin-top: 10px;
      }
      .tags {
        margin-top: 20px;
        a {
          text-decoration: none;
        }
      }
    }
  }
  .pagination {
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }
}
</style>
