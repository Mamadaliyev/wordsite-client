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
          <el-col v-for="(tag, index) in myTags" :key="index" :span="4">
            <el-card class="box-card">
              <div>
                <span>
                  <b> {{ tag.name }} </b></span
                >
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "TagsView",
  data() {
    return {
      search: "",
      myTags: [
        {
          name: "car",
          defination: "moshina",
          tags: ["vehicle"],
        },
        {
          name: "car",
          defination: "moshina",
          tags: ["vehicle"],
        },
      ],
    };
  },
  methods: {
    handleTag(tag) {
      this.$router.push({ path: `/tags?tag=${tag}` });
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
}
</style>
