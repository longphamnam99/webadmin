<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <div class="text-right">
          <el-button icon="el-icon-refresh-left" @click="getList"> Tải lại </el-button>
          <el-button
            icon="el-icon-circle-plus"
            type="success"
            @click="showFormAdd = true"
          >
            Thêm
          </el-button>
        </div>
      </el-row>
    </div>
    <List :table-data="tableData" :loading="loading" />
    <drawer title="Thêm danh mục bài viết" :visible.sync="showFormAdd">
      <Add />
    </drawer>
  </div>
</template>

<script>
import Add from './add'
import List from './list'
import Drawer from '@/components/Drawer'

export default {
  components: {
    Add,
    List,
    Drawer
  },
  data() {
    return {
      loading: true,
      showFormAdd: false,
      tableData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.tableData = [
        {
          id: 1,
          title: 'Báo chí nói về DTSOFT',
          create_at: '1424863280838',
          image: '',
          abbreviate: 'abc',
          status: 0,
          seo_title: 'seo title',
          seo_description: 'seo description',
          seo_keyword: 'seo keyword'
        },
        {
          id: 2,
          title: 'Tin tuyển dụng',
          create_at: '1424863280838',
          image: '',
          abbreviate: 'abc',
          status: 1,
          seo_title: 'seo title',
          seo_description: 'seo description',
          seo_keyword: 'seo keyword'
        },
        {
          id: 3,
          title: 'Tin công nghệ',
          create_at: '1424863280838',
          image: '',
          abbreviate: 'abc',
          status: 1,
          seo_title: 'seo title',
          seo_description: 'seo description',
          seo_keyword: 'seo keyword'
        },
        {
          id: 3,
          title: 'Tin công ty',
          create_at: '1424863280838',
          image: '',
          abbreviate: 'abc',
          status: 1,
          seo_title: 'seo title',
          seo_description: 'seo description',
          seo_keyword: 'seo keyword'
        }
      ]
      this.loading = false
    }
  }
}
</script>
