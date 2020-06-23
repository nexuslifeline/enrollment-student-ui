import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getBillingList(params){
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/billings`, { params: params });
    }
  }
}