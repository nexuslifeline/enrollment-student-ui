import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getStudentClearanceList(params) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/student-clearances`, { params: params })
    },
    getStudentClearance(id) {
        return this.$authHttp.get(`${apiPrefix}/${apiVersion}/student-clearances/${id}`);
    },
  }
}