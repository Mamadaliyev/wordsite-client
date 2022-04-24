<template>
  <div class="filter">
    <el-row :gutter="10">
      <el-col :span="14" :xs="24">
        <el-select
          class="tag-select"
          v-model="filter.tagIds"
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="Tags..."
          :remote-method="remoteSelectTagMethod"
          :loading="isSelectLoading"
          @change="onFilterChange"
        >
          <el-option
            v-for="item in tags"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="10" :xs="24">
        <el-input
          suffix-icon="el-icon-search"
          placeholder="Search"
          v-model="filter.search"
          @input.native="onFilterChange"
        ></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { tagApi } from "@/api";
export default {
  data() {
    return {
      tags: [],
      isSelectLoading: false,
      filter: {
        search: "",
        tagIds: [],
        page: 1,
        limit: 12,
        total: 20,
      },
    };
  },
  created() {
    this.remoteSelectTagMethod();
  },
  methods: {
    async remoteSelectTagMethod(search) {
      try {
        this.isSelectLoading = true;
        const query = {
          search: search,
          limit: 15,
          page: 1,
        };
        const data = await tagApi.getForChoose(query);
        this.tags = data.data.data;
      } catch (e) {
        console.log(e);
      } finally {
        this.isSelectLoading = false;
      }
    },
    onFilterChange() {
      this.$emit("change", this.filter);
    },
  },
};
</script>

<style scoped lang="scss">
.filter {
  .tag-select {
    width: 100%;
    margin-bottom: 5px;
  }
}
</style>
