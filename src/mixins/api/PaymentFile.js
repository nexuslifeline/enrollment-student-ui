import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getPaymentFiles(id, params) {
    return this.$authHttp.get(`${apiPrefix}/${apiVersion}/payments/${id}/files`, { params: params })
    },
    addPaymentFile(data, id) {
        return this.$authHttp.post(`${apiPrefix}/${apiVersion}/payments/${id}/files`, data)
    },
  }
}