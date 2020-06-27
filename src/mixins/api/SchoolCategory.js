import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getSchoolCategoryList() {
      return this.$http.get(`${apiPrefix}/${apiVersion}/school-categories`);
    },
    getSchoolCategory(id) {
      return this.$http.get(`${apiPrefix}/${apiVersion}/school-categories/${id}`);
    },
    addSchoolCategory(data) {
      return this.$http.post(`${apiPrefix}/${apiVersion}/school-categories`, data);
    },
    updateSchoolCategory(data, id) {
      return this.$http.put(`${apiPrefix}/${apiVersion}/school-categories/${id}`, data);
    }
  }
}