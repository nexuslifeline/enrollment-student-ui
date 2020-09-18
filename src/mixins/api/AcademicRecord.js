import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getAcadmicRecordList(params) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/academic-records`, { params: params });
    },
  }
}
