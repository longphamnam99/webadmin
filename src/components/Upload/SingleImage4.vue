<template>
  <el-upload
    ref="upload"
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :file-list="fileList"
    :auto-upload="false"
    :limit="1"
    :on-remove="handleRemove"
    :on-change="handleUploadBefore"
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
  data() {
    return {
      fileList: []
    }
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  created() {
    console.log(this.$refs.upload)
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleUploadBefore(file) {
      console.log(file.name)
    }
  }
}
</script>
