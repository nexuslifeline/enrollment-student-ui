import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getAcademicRecordList(params) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/academic-records`, { params: params });
    },
  }
}
