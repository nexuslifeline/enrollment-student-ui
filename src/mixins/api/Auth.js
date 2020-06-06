import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    authenticate(data) {
      return this.$http.post(`${apiPrefix}/${apiVersion}/login`, data);
    },
    getUser(){
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/me`);
    }
  }
}