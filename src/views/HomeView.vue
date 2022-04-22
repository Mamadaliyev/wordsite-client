<template>
  <div class="home">
    <el-row type="flex" justify="end">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <el-input
          suffix-icon="el-icon-search"
          placeholder="Search"
          v-model="filter.search"
          @input.native="getWords"
        ></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="inner-row">
      <el-col
        v-for="(word, index) in words"
        :key="index"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="4"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>
              <b> {{ word.name }} </b></span
            >
          </div>
          <div class="box-card-body">
            <span class="defination"> {{ word.defination }} </span>
            <div class="tags">
              <span v-for="tag in word.tags" :key="tag._id" class="text item">
                <a href="" @click="handleTag(tag)"> {{ `#${tag}` }} </a>
              </span>
            </div>
          </div>
        </el-card>
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

<script>
import { wordApi } from "@/api";

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
        limit: 12,
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
        const data = await wordApi.getPublicWordsPaging(this.filter);
        this.filter.total = data.data.total;
        this.words = data.data.data;
      } catch (e) {
        console.log(e);
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
  .add-row {
    margin-bottom: 20px;
  }
  .inner-row {
    .box-card {
      height: 200px;
      .box-card-body {
        overflow: hidden;
        height: 95px;
        .defination {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tags {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
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
  .pagination {
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }
}
</style>
