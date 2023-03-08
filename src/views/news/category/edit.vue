<template>
  <div>
    <el-form ref="form" :model="formData" :rules="formRules">
      <el-form-item label="Tiêu đề" prop="title">
        <el-input v-model="formData.title" />
      </el-form-item>
      <el-form-item label="Mô tả">
        <el-input v-model="formData.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="Ảnh">
        <SingleImageUpload v-model="formData.image" />
      </el-form-item>
      <el-form-item label="Icon">
        <el-input v-model="formData.icon" />
      </el-form-item>

      <el-form-item label="SEO Title">
        <el-input v-model="formData.seo_title" />
      </el-form-item>
      <el-form-item label="SEO Key">
        <el-input v-model="formData.seo_key" />
      </el-form-item>
      <el-form-item label="SEO Description">
        <el-input v-model="formData.seo_desc" type="textarea" />
      </el-form-item>
      <el-form-item label="Trạng thái">
        <el-switch v-model="formData.status" prop="status" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit"
          >Sửa</el-button
        >
        <el-button @click="close">Huỷ</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import SingleImageUpload from "@/components/Upload/SingleImage4";
import newsServices from "@/api/news";

export default {
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    SingleImageUpload,
  },
  data() {
    return {
      loading: false,
      formRules: {
        title: [
          {
            required: true,
            message: "Vui lòng điền tiêu đề",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    close() {
        this.$emit("edit-done");
    },
    onSubmit() {
      if (this.loading) return;

      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loading = true;
          const data = Object.assign({}, this.formData);
          newsServices
            .editNewsCategory(this.formData.id, data)
            .then((response) => {
              if (response.code != 200) {
                return this.$notify({
                  title: "Lỗi!",
                  message: response.message,
                  type: "error",
                });
              }
              this.$refs["form"].clearValidate();
              this.$refs["form"].resetFields();

              this.$emit("edit-done");
              return this.$notify({
                title: "Thành công!",
                message: response.message,
                type: "success",
              });
            });

          this.loading = false;
        }
      });
    },
  },
};
</script>
