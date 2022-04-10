<template>
  <div class="my-words">
    <el-row class="add-row">
      <el-col :offset="2" :span="16">
        <el-button @click="handleAdd" type="primary"
          ><i class="el-icon-plus"></i> Add word
        </el-button>
      </el-col>
      <el-col :span="4">
        <el-input
          suffix-icon="el-icon-search"
          placeholder="Search"
          v-model="filter.search"
          @input.native="getMyWords"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="top-row">
      <el-col :span="20">
        <el-row v-if="!isLoading" :gutter="10" class="inner-row">
          <el-col v-for="(word, index) in myWords" :key="index" :span="4">
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
              <span> {{ word.defination }} </span>
              <div class="tags">
                <span v-for="tag in word.tags" :key="tag._id" class="text item">
                  <a href="" @click="handleTag(tag)"> {{ `#${tag}` }} </a>
                </span>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div class="loading" v-else v-loading="isLoading"></div>
      </el-col>
    </el-row>
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
              default-first-option
              placeholder="Choose tags for your words"
            >
              <el-option
                v-for="(tag, index) in form.tags"
                :key="index"
                :label="tag"
                :value="tag"
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
              <el-button type="danger" @click="handleDelete">
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
import axios from "axios";
import { config } from "../../config";
export default {
  name: "MyWordsView",
  data() {
    return {
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
        limit: 20,
        total: 20,
      },
    };
  },
  created() {
    this.getMyWords();
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
        const headers = {
          Authorization: `Bearer ${this.$store.state.token}`,
        };
        await axios.delete(`${config.BASE_URL}/word/delete/${this.form._id}`, {
          headers: headers,
        });
        this.getMyWords();
      } catch (e) {
        this.$message.error("Something wrong");
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
        const headers = {
          Authorization: `Bearer ${this.$store.state.token}`,
        };
        const { data } = await axios.post(
          `${config.BASE_URL}/word/create`,
          payload,
          { headers: headers }
        );
        console.log(data);
      } catch (e) {
        console.log(e);
        this.$message.error("Something wrong");
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
        const headers = {
          Authorization: `Bearer ${this.$store.state.token}`,
        };
        await axios.put(
          `${config.BASE_URL}/word/update/${this.form._id}`,
          payload,
          { headers: headers }
        );
      } catch (e) {
        console.log(e);
        this.$message.error("Something wrong");
      } finally {
        this.dialogFormVisible = false;
        this.isLoading = false;
        this.getMyWords();
      }
    },
    async getMyWords() {
      try {
        this.isLoading = true;
        const payload = {
          ...this.filter,
        };
        const headers = {
          Authorization: `Bearer ${this.$store.state.token}`,
        };
        const { data } = await axios.post(
          `${config.BASE_URL}/word/words`,
          payload,
          { headers: headers }
        );
        this.filter.total = data.data.total;
        this.myWords = data.data.data;
      } catch (e) {
        console.log(e);
        this.$message.error("Something wrong");
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
        height: 100%;
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
