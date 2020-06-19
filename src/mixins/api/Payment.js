import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    addPayment(data) {
      return this.$authHttp.post(`${apiPrefix}/${apiVersion}/payments`, data)
    }
  }
}