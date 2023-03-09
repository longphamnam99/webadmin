import request from "@/utils/request";
import { auth } from "@/helpers/auth.js";

export default {
  getProductCategory(query) {
    return request({
      url: "/product/list_category",
      method: "get",
      headers: auth(),
      params: query,
    });
  },
  addProductCategory(data) {
    return request({
      url: "/product/add_category",
      method: "post",
      headers: auth(),
      data,
    });
  },
  editProductCategory(id, data) {
    return request({
      url: "/product/edit_category/" + id,
      method: "put",
      headers: auth(),
      data,
    });
  },
  deleteProductCategory(id) {
    return request({
      url: "/product/delete_category/" + id,
      method: "delete",
      headers: auth(),
    });
  },
};
