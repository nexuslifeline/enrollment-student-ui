import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getEWalletAccountList(params){
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/e-wallet-accounts`, { params: params });
    }
  }
}