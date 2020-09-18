import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getAssessmentFormPreview(academicRecordId) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/assessment-form/${academicRecordId}`, {
        responseType: 'blob'
      });
    },
    getRequirementListPreview(academicRecordId) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/requirement-list`, {
        responseType: 'blob'
      });
    }
  }
}