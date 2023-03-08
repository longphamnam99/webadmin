<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="STT" width="80">
        <template slot-scope="scope">
          <span>{{ (scope.$index + 1) + (query.page - 1) * query.limit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Tiêu đề">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Mô tả">
        <template slot-scope="{ row }">
          <span>{{ row.abbreviate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Hình"
        width="70px"
        header-align="center"
        align="center"
      >
        <img src="/images/no-image-thumb.jpg" alt="image" width="50" />
      </el-table-column> -->
      <el-table-column label="Ngày tạo" width="140px">
        <template slot-scope="scope">
          <span>{{ scope.row.create_at | parseTime("{d}-{m}-{y}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Trạng thái"
        class-name="status-col"
        width="100px"
        header-align="center"
        align="right"
      >
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.status | statusName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Thao tác" width="180">
        <template slot-scope="scope">
          <el-tooltip content="Chi tiết" placement="top" effect="light">
            <el-button
              type="info"
              icon="el-icon-s-order"
              size="mini"
              @click="handleDetail(scope.$index, scope.row)"
            />
          </el-tooltip>
          <el-tooltip content="Sửa" placement="top" effect="light">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            />
          </el-tooltip>
          <el-tooltip content="Xoá" placement="bottom" effect="light">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  filters: {
    statusFilter(status) {
      const statusMap = ["danger", "success"];
      return statusMap[status];
    },
    statusName(status) {
      const statusMap = ["Bị ẩn", "Hiển thị"];
      return statusMap[status];
    },
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    tableData: {
      type: Array,
      default: [{}],
    },
    query: {
      type: Object,
      default: () => { return {}}
    }
  },
  methods: {
    handleDetail(index, row) {},
    handleDelete(index, row) {
      this.$confirm(
        "Thao tác này sẽ xóa vĩnh viễn dữ liệu. Tiếp tục?",
        "Cảnh báo",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Quay lại",
          type: "warning",
        }
      ).then((_) => {
        this.$emit("delete-item", {
          index: index,
          row: row,
        });
      });
    },
    handleEdit(index, row) {
      this.$emit("show-edit", { index, row });
    },
  },
};
</script>
