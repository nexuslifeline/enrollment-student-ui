import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    authenticate(data) {
      return this.$http.post(`${apiPrefix}/${apiVersion}/login`, data);
    },
    getAuthenticatedUser(){
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/me`);
    },
    revokeAuthentication(){
      return this.$authHttp.post(`${apiPrefix}/${apiVersion}/logout`);
    }
  }
}