<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <div class="text-right">
          <el-button icon="el-icon-refresh-left" @click="getList">
            Tải lại
          </el-button>
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
    <List
      :table-data="tableData"
      :loading="loading"
      :query="query"
      @show-edit="showEdit"
      @delete-item="deleteItem"
    />
    <pagination
      :loading="loading"
      :total="total"
      :page.sync="query.page"
      :limit.sync="query.limit"
      @pagination="getList"
    />
    <drawer title="Thêm danh mục bài viết" :visible.sync="showFormAdd">
      <Add @add-done="addDone" />
    </drawer>
    <drawer title="Sửa danh mục bài viết" :visible.sync="showFormEdit">
      <Edit :form-data="editRow" @edit-done="editDone" />
    </drawer>
  </div>
</template>

<script>
import Add from './add'
import Edit from './edit'
import List from './list'
import Drawer from '@/components/Drawer'
import newsServices from '@/api/news'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Add,
    Edit,
    List,
    Pagination,
    Drawer
  },
  data() {
    return {
      loading: true,
      showFormAdd: false,
      showFormEdit: false,
      editRow: {},
      tableData: [],
      query: {
        page: 1,
        limit: 20
      },
      total: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      newsServices.getNewsCategory(this.query).then((response) => {
        if (response.code !== 200) {
          return this.$notify({
            title: 'Lỗi!',
            message: response.message,
            type: 'error'
          })
        }
        this.total = response.data.total
        this.tableData = response.data.items
      })
      this.loading = false
    },
    addDone() {
      this.showFormAdd = false
      this.query.page = 1
      this.getList()
    },
    editDone() {
      this.showFormEdit = false
      this.getList()
    },
    showEdit(data) {
      this.editRow = data.row
      this.showFormEdit = true
    },
    deleteItem(data) {
      newsServices
        .deleteNewsCategory(data.row.id)
        .then((res) => {
          this.getList()
          this.$notify({
            title: 'Thành công!',
            message: res.message,
            type: 'success'
          })
        })
        .catch((res) => {
          this.$notify({
            title: 'Lỗi!',
            message: res.message,
            type: 'error'
          })
        })
    }
  }
}
</script>
