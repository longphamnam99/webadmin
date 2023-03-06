<template>
  <div>
    <el-drawer
      :title="title"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <slot />
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'rtl'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      direction: this.position,
      drawer: this.visible
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('Bạn có chắc sẽ đóng tác vụ hiện tại?')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    }
  }
}
</script>
