<template>
  <div>
    <el-form ref="form" :model="form" :rules="formRules">
      <el-form-item label="Tiêu đề" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="Mô tả">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="Ảnh">
        <SingleImageUpload v-model="form.image" />
      </el-form-item>
      <el-form-item label="Icon">
        <el-input v-model="form.icon" />
      </el-form-item>

      <el-form-item label="SEO Title">
        <el-input v-model="form.seo_title" />
      </el-form-item>
      <el-form-item label="SEO Key">
        <el-input v-model="form.seo_key" />
      </el-form-item>
      <el-form-item label="SEO Description">
        <el-input v-model="form.seo_desc" type="textarea" />
      </el-form-item>
      <el-form-item label="Trạng thái">
        <el-switch v-model="form.status" />
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          @click="onSubmit"
        >Thêm</el-button>
        <el-button>Huỷ</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SingleImageUpload from '@/components/Upload/SingleImage4'
import newsServices from '@/api/news'

export default {
  components: {
    SingleImageUpload
  },
  data() {
    return {
      loading: false,
      form: {
        title: '',
        desc: '',
        image: '',
        icon: '',
        seo_title: '',
        seo_key: '',
        seo_desc: '',
        status: true
      },
      formRules: {
        title: [
          {
            required: true,
            message: 'Vui lòng điền tiêu đề',
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
          const data = Object.assign({}, this.form)
          newsServices.addNewsCategory(data).then((response) => {
            if (response.code !== 200) {
              return this.$notify({
                title: 'Lỗi!',
                message: response.message,
                type: 'error'
              })
            }
            this.$refs['form'].clearValidate()
            this.$refs['form'].resetFields()

            this.$emit('add-done')
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
