import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getPaymentFiles(paymentId, params) {
    return this.$authHttp.get(`${apiPrefix}/${apiVersion}/payments/${paymentId}/files`, { params: params })
    },
    addPaymentFile(data, paymentId) {
        return this.$authHttp.post(`${apiPrefix}/${apiVersion}/payments/${paymentId}/files`, data)
    },
    updatePaymentFile(data, paymentId, fileId) {
      return this.$authHttp.put(`${apiPrefix}/${apiVersion}/payments/${paymentId}/files/${fileId}`, data)
    },
    deletePaymentFile(paymentId, fileId) {
      return this.$authHttp.delete(`${apiPrefix}/${apiVersion}/payments/${paymentId}/files/${fileId}`)
    },
    getPaymentFilePreview(paymentId, fileId) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/payments/${paymentId}/files/${fileId}/preview`, {
        responseType: 'blob'
      });
    }
  }
}