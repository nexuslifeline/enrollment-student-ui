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
    },
    getInitialBilling(academicRecordId) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/academic-records/${academicRecordId}/initial-billing`);
    },
    postRequestEvaluation(data, id) {
      return this.$authHttp.post(`${apiPrefix}/${apiVersion}/academic-records/${id}/request-evaluation`, data);
    },
    postSubmitApplication(data, id) {
      return this.$authHttp.post(`${apiPrefix}/${apiVersion}/academic-records/${id}/submit-application`, data);
    }
  }
}
