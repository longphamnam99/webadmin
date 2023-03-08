<template>
  <div>
    <el-form :inline="true" ref="form" :model="form" :rules="formRules">
      <div class="row">
        <el-form-item label="Danh mục" prop="category">
          <el-select
            v-model="form.category_id"
            :loading="loading"
            placeholder="Chọn"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Ảnh">
          <SingleImageUpload v-model="form.image" />
        </el-form-item>
      </div>
      <el-form-item label="Tiêu đề" prop="title" width="100%">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="Tóm tắt">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="Mô tả" prop="content">
        <br />
        <tinymce v-model="form.content" :height="300" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit"
          >Thêm</el-button
        >
        <el-button>Huỷ</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SingleImageUpload from "@/components/Upload/SingleImage4";
import Tinymce from "@/components/Tinymce";
import newsServices from "@/api/news";

export default {
  components: {
    SingleImageUpload,
    Tinymce,
  },
  data() {
    return {
      loading: false,
      form: {
        category_id: "",
        title: "",
        desc: "",
        image: "",
        icon: "",
        seo_title: "",
        seo_key: "",
        seo_desc: "",
        status: true,
        content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`,
      },
      formRules: {
        category: [
          {
            required: true,
            message: "Vui lòng chọn danh mục",
            trigger: "change",
          },
        ],
        title: [
          {
            required: true,
            message: "Vui lòng điền tiêu đề",
            trigger: "change",
          },
        ],
        content: [
          {
            required: true,
            message: "Vui lòng điền mô tả",
            trigger: "change",
          },
        ],
      },
      options: [],
      formInline: {
        user: "",
        region: "",
      },
    };
  },
  created() {
    this.loadCategories();
  },
  methods: {
    loadCategories() {
      this.loading = true;
      newsServices.getNewsCategory(this.query).then((response) => {
        if (response.code != 200) {
          return this.$notify({
            title: "Lỗi!",
            message: response.message,
            type: "error",
          });
        }
        response.data.items.forEach((item) => {
          this.options.push({
            value: item.id,
            label: item.title,
          });
        });
      });
      this.loading = false;
    },
    onSubmit() {
      if (this.loading) return;
      console.log(this.form.category_id);
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // this.loading = true;
          // const data = Object.assign({}, this.form);
          // newsServices.addNewsCategory(data).then((response) => {
          //   if (response.code != 200) {
          //     return this.$notify({
          //       title: "Lỗi!",
          //       message: response.message,
          //       type: "error",
          //     });
          //   }
          //   this.$refs["form"].clearValidate();
          //   this.$refs["form"].resetFields();
          //   this.$emit("add-done");
          //   return this.$notify({
          //     title: "Thành công!",
          //     message: response.message,
          //     type: "success",
          //   });
          // });
          // this.loading = false;
        }
      });
    },
  },
};
</script>
