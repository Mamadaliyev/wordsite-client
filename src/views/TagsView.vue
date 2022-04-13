<template>
  <div class="tags">
    <el-row class="header">
      <el-col :offset="18" :span="4">
        <el-input
          suffix-icon="el-icon-search"
          placeholder="Search"
          v-model="search"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="top-row">
      <el-col :span="20">
        <el-row :gutter="10" class="inner-row">
          <el-col v-for="(tag, index) in tags" :key="index" :span="4">
            <el-card class="box-card">
              <div>
                <span class="tag" @click="handleTagClick(tag)">
                  #{{ tag.name }}
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

<script>
import { tagApi } from "@/api";

export default {
  name: "TagsView",
  data() {
    return {
      search: "",
      tags: [],
      filter: {
        search: "",
        page: 1,
        limit: 20,
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
  margin-top: 20px;
  .add-row {
    margin-bottom: 20px;
  }
  .top-row {
    display: flex;
    justify-content: center;
    align-items: center;
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
