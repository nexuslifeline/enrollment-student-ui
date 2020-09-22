import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getAcademicRecordList(params) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/academic-records`, { params: params });
    },
    getAcademicSchedule(academicRecordId, params) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/academic-records/${academicRecordId}/academic-subject-schedules`, { params: params });
    },
    getAcademicRecord(academicRecordId) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/academic-records/${academicRecordId}`);
    }
  }
}
