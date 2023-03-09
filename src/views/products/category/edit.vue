<template>
  <div>
    <el-form ref="form" :model="formData" :rules="formRules">
      <el-form-item label="Tên" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="Mã">
        <el-input v-model="formData.code" />
      </el-form-item>
      <el-form-item label="Ảnh">
        <SingleImageUpload v-model="formData.photo" />
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
        <el-switch v-model="formData.status" />
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          @click="onSubmit"
        >Sửa</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SingleImageUpload from '@/components/Upload/SingleImage4'
import productServices from '@/api/product'

export default {
  components: {
    SingleImageUpload
  },
  props: {
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,
      formRules: {
        name: [
          {
            required: true,
            message: 'Vui lòng điền tên danh mục',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.loading) return

      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = Object.assign({}, this.formData)
          productServices.editProductCategory(this.formData.id, data).then((response) => {
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
  }
}
</script>
