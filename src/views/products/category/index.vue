<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <div class="text-right">
          <el-button icon="el-icon-refresh-left">
            Tải lại
          </el-button>
          <el-button icon="el-icon-circle-plus" type="success" @click="showFormAdd = true">
            Thêm
          </el-button>
        </div>
      </el-row>
    </div>
    <drawer title="Thêm danh mục" :visible.sync="showFormAdd" />
    <List />
  </div>
</template>

<script>
import List from './list.vue'
import Drawer from '@/components/Drawer'

export default {
  components: {
    Drawer,
    List
  },
  data() {
    return {
      showFormAdd: false
    }
  }
}
</script>
