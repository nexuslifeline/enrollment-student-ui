import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    login(data) {
      return this.$http.post(`${apiPrefix}/${apiVersion}/login`, data);
    },
    getUser(){
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/me`);
    }
  }
}