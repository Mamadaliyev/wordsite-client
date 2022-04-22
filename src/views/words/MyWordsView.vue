<template>
  <div class="my-words">
    <el-row class="header" type="flex" justify="space-between">
      <el-col :xl="3" :lg="4" :md="6" :sm="8" :xs="12">
        <el-button @click="handleAdd" type="primary"
          ><i class="el-icon-plus"></i> Add word
        </el-button>
      </el-col>
      <el-col :xl="3" :lg="4" :md="6" :sm="8" :xs="12">
        <el-input
          suffix-icon="el-icon-search"
          placeholder="Search"
          v-model="filter.search"
          @input.native="getMyWords"
        ></el-input>
      </el-col>
    </el-row>
    <el-row v-if="!isLoading" :gutter="10" class="inner-row">
      <el-col
        v-for="(word, index) in myWords"
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
            <el-button
              @click="handleEdit(word)"
              style="float: right; padding: 3px 0"
              type="text"
              ><i class="el-icon-edit"></i>
            </el-button>
          </div>
          <div class="box-card-body">
            <span class="defination"> {{ word.defination }} </span>
            <div class="tags">
              <span v-for="tag in word.tags" :key="tag._id" class="text item">
                <a href="" @click="handleTag(tag)"> {{ `#${tag}` }} </a>
              </span>
            </div>
            <!-- <div class="created-at">
                <i class="el-icon-time"></i>
                {{ new Date(word.createdAt).toLocaleDateString() }}
              </div> -->
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="loading" v-else v-loading="isLoading"></div>

    <div>
      <el-dialog
        :title="isEdit ? 'Edit word' : 'Add word'"
        :visible.sync="dialogFormVisible"
      >
        <el-form :model="form">
          <el-form-item label="Name" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Defination" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="Defination"
              v-model="form.defination"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="Tags" :label-width="formLabelWidth">
            <el-select
              v-model="form.tags"
              style="width: 100%"
              multiple
              filterable
              allow-create
              remote
              :remote-method="getTagForChoose"
              default-first-option
              placeholder="Choose tags for your words"
            >
              <el-option
                v-for="(tag, index) in tags"
                :key="index"
                :label="tag.name"
                :value="tag.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <el-checkbox v-model="form.isPrivate">Private</el-checkbox>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <div style="display: flex; justify-content: space-between">
            <div>
              <el-button
                v-if="form._id ? true : false"
                type="danger"
                @click="handleDelete"
              >
                <i class="el-icon-delete"></i>
              </el-button>
            </div>
            <div style="display: flex">
              <el-button @click="dialogFormVisible = false">Cancel</el-button>
              <el-button type="primary" v-if="isEdit" @click="handleEditSubmit"
                >Save</el-button
              >
              <el-button type="primary" v-else @click="handleAddSubmit"
                >Save</el-button
              >
            </div>
          </div>
        </span>
      </el-dialog>
    </div>
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
import { tagApi, wordApi } from "@/api";
export default {
  name: "MyWordsView",
  data() {
    return {
      tags: [],
      isEdit: true,
      dialogFormVisible: false,
      isLoading: false,
      search: "",
      form: {
        name: "",
        defination: "",
        tags: [],
        _id: "",
        isPrivate: true,
      },
      formLabelWidth: "120px",
      myWords: [],
      filter: {
        search: "",
        page: 1,
        limit: 12,
        total: 20,
      },
    };
  },
  created() {
    this.getMyWords();
    this.getTagForChoose();
  },
  methods: {
    handleTag(tag) {
      this.$router.push({ path: `/tags?tag=${tag}` });
    },
    handleAdd() {
      this.form = {
        name: "",
        defination: "",
        tags: [],
        isPrivate: true,
      };
      this.dialogFormVisible = true;
      this.isEdit = false;
    },
    async handleDelete() {
      try {
        this.isLoading = true;
        await wordApi.delete(this.form._id);
        this.getMyWords();
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
        this.dialogFormVisible = false;
      }
    },
    async handleAddSubmit() {
      try {
        this.isLoading = true;
        const payload = {
          ...this.form,
        };
        await wordApi.create(payload);
      } catch (e) {
        console.log(e);
      } finally {
        this.dialogFormVisible = false;
        this.isLoading = false;
        this.getMyWords();
      }
    },
    handleEdit(word) {
      this.dialogFormVisible = true;
      this.form = word;
      this.isEdit = true;
    },
    async handleEditSubmit() {
      try {
        this.isLoading = true;
        console.log(this.form);
        const payload = {
          ...this.form,
        };
        await wordApi.update(this.form._id, payload);
      } catch (e) {
        console.log(e);
      } finally {
        this.dialogFormVisible = false;
        this.isLoading = false;
        this.getMyWords();
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
    async getMyWords() {
      try {
        this.isLoading = true;
        const payload = {
          ...this.filter,
        };
        const data = await wordApi.getMyWordsPaging(payload);
        this.filter.total = data.data.total;
        this.myWords = data.data.data;
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
    handlePagingChange(page) {
      this.filter.page = page;
      this.getMyWords();
    },
  },
};
</script>

<style scoped lang="scss">
.my-words {
  .header {
    margin-bottom: 10px;
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
  }

  .loading {
    display: flex;
    justify-content: center;
    flex-flow: column;
    align-items: center;
  }
  .pagination {
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }
}
</style>
