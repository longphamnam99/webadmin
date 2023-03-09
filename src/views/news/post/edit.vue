<template>
  <div>
    <el-form ref="form" :model="formData" :rules="formRules">
      <el-form-item label="Danh mục" prop="category_id">
        <el-select
          v-model="formData.category_id"
          :loading="loading"
          placeholder="Chọn"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Ảnh" prop="image">
        <SingleImageUpload v-model="formData.image" />
      </el-form-item>
      <el-form-item label="Thuộc tính">
        <el-checkbox v-model="formData.pin">Ghim</el-checkbox>
        <el-checkbox v-model="formData.new">Tin mới</el-checkbox>
      </el-form-item>
      <el-form-item label="Tiêu đề" prop="name" width="100%">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="Tóm tắt">
        <el-input v-model="formData.introduce" type="textarea" />
      </el-form-item>
      <el-form-item label="Mô tả" prop="content">
        <br />
        <tinymce v-model="formData.content" :height="300" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit"
          >Sửa</el-button
        >
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
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      loading: false,
      formRules: {
        category_id: [
          {
            required: true,
            message: "Vui lòng chọn danh mục",
            trigger: "change",
          },
        ],
        // image: [
        //   {
        //     required: true,
        //     message: 'Vui lòng chọn ảnh',
        //     trigger: 'change'
        //   }
        // ],
        name: [
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
    };
  },
  created() {
    this.loadCategories();
  },
  methods: {
    loadCategories() {
      this.loading = true;
      newsServices.getNewsCategory(this.query).then((response) => {
        if (response.code !== 200) {
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
      if (this.loading) return

      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = Object.assign({}, this.formData)
          newsServices
            .editNewsPost(this.formData.id, data)
            .then((response) => {
              if (response.code !== 200) {
                return this.$notify({
                  title: 'Lỗi!',
                  message: response.message,
                  type: 'error'
                })
              }
              this.$refs['form'].clearValidate()
              this.$refs['form'].resetFields()

              this.$emit('edit-done')
              return this.$notify({
                title: 'Thành công!',
                message: response.message,
                type: 'success'
              })
            })

          this.loading = false
        }
      })
    }
  },
};
</script>
