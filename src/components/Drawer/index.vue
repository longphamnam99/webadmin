<template>
  <div>
    <el-drawer
      :title="title"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      :append-to-body="false"
    >
      <el-card class="box-card">
        <div class="text item">
          <slot />
        </div>
      </el-card>
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

  watch: {
    drawer() {
      this.$emit('update:visible', this.drawer)
    },
    visible() {
      this.drawer = this.visible
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
<style>
.el-drawer__body {
  overflow: auto !important;
}
</style>
