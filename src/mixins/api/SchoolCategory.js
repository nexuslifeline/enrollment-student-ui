import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getSchoolCategoryList() {
      return this.$http.get(`${apiVersion}/${apiPrefix}/school-categories`);
    },
    getSchoolCategory(id) {
      return this.$http.get(`${apiVersion}/${apiPrefix}/school-categories/${id}`);
    },
    addSchoolCategory(data) {
      return this.$http.post(`${apiVersion}/${apiPrefix}/school-categories`, data);
    },
    updateSchoolCategory(data, id) {
      return this.$http.put(`${apiVersion}/${apiPrefix}/school-categories/${id}`, data);
    }
  }
}