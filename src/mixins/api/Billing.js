import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getBillingList(params){
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/billings`, { params: params });
    },
    getBilling(id) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/billings/${id}`);
    },
    getBillingItemsOfBilling(id) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/billings/${id}/billing-items`);
    },
  }
}