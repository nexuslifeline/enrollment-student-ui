import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    login(data) {
      return this.$http.post(`${apiVersion}/${apiPrefix}/login`, data);
    }
  }
}