import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getPeraPadalaAccountList(params){
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/pera-padala-accounts`, { params: params });
    }
  }
}