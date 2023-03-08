import request from "@/utils/request";
import { auth } from "@/helpers/auth.js";

export default {
  addNewsCategory(data) {
    return request({
      url: "/news/add_category",
      method: "post",
      headers: auth(),
      data,
    });
  },
  getNewsCategory(query) {
    return request({
      url: "/news/list_category",
      method: "get",
      headers: auth(),
      params: query,
    });
  },
  editNewsCategory(id, data) {
    return request({
      url: "/news/edit_category/" + id,
      method: "put",
      headers: auth(),
      data,
    });
  },
  deleteNewsCategory(id) {
    return request({
      url: "/news/delete_category/" + id,
      method: "delete",
      headers: auth(),
    });
  },
};
