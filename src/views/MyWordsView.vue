<template>
  <div class="my-words">
    <el-row class="add-row">
      <el-col :offset="2" :span="22">
        <el-button @click="handleAdd" type="primary"
          ><i class="el-icon-plus"></i> Add word
        </el-button>
      </el-col>
    </el-row>
    <el-row class="top-row">
      <el-col :span="20">
        <el-row :gutter="10" class="inner-row">
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
                <span v-for="o in 4" :key="o" class="text item">
                  <a href="" @click="handleTag(o)"> {{ `#tag${0}` }} </a>
                </span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div>
      <el-dialog :title="dialogLabel" :visible.sync="dialogFormVisible">
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
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >Save</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyWordsView",
  data() {
    return {
      dialogLabel: "Edit Word",
      dialogFormVisible: false,
      form: {
        name: "",
        defination: "",
        tags: [],
      },
      formLabelWidth: "120px",
      myWords: [
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
    handleAdd() {
      this.form = {
        name: "",
        defination: "",
        tags: [],
      };
      this.dialogFormVisible = true;
      this.dialogLabel = "Add Word";
    },
    handleEdit(word) {
      this.dialogFormVisible = true;
      console.log(word);
      this.form = word;
      this.dialogLabel = "Edit Word";
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
