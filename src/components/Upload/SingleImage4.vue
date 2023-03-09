<template>
  <el-upload
    ref="upload"
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :auto-upload="false"
    :limit="1"
    @submit="submitUpload"
  >
    <el-button slot="trigger" size="small" type="primary">Chọn file</el-button>
  </el-upload>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    }
  }
}
</script>
