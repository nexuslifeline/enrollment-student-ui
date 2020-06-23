import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getBankAccountList(params){
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/bank-accounts`, { params: params });
    }
  }
}