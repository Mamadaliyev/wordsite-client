<template>
  <div class="tags">
    <el-row class="header" type="flex" justify="end">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <el-input
          suffix-icon="el-icon-search"
          placeholder="Search"
          v-model="filter.search"
          @input.native="getTags"
        ></el-input>
      </el-col>
    </el-row>
    <el-row v-loading="isLoading" :gutter="10" class="inner-row">
      <el-col
        v-for="(tag, index) in tags"
        :key="index"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="4"
      >
        <el-card class="box-card">
          <div>
            <span class="tag" @click="handleTagClick(tag)">
              #{{ tag.name }}
            </span>
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
import { tagApi } from "@/api";

export default {
  name: "TagsView",
  data() {
    return {
      search: "",
      tags: [],
      isLoading: false,
      filter: {
        search: "",
        page: 1,
        limit: 30,
        total: 20,
      },
    };
  },
  created() {
    this.getTags();
  },
  methods: {
    handleTagClick(tag) {
      this.$router.push({ path: `/?tag=${tag.name}` });
    },
    async getTags() {
      try {
        this.isLoading = true;
        const payload = {
          ...this.filter,
        };
        const data = await tagApi.getPaging(payload);
        this.filter.total = data.data.total;
        this.tags = data.data.data;
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
    handlePagingChange(page) {
      this.filter.page = page;
      this.getTags();
    },
  },
};
</script>

<style scoped lang="scss">
.tags {
  .add-row {
    margin-bottom: 20px;
  }
  .inner-row {
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
  .tag {
    cursor: pointer;
    color: blue;
  }
  .pagination {
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }
}
</style>
