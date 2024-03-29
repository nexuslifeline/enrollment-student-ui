import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getAssessmentFormPreview(academicRecordId) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/assessment-form/${academicRecordId}`, {
        responseType: 'blob'
      });
    },
    getRequirementListPreview() {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/requirement-list`, {
        responseType: 'blob'
      });
    },
    getRegistrationFormPreview(academicRecordId) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/registration-form/${academicRecordId}`, {
        responseType: 'blob'
      });
    },
    previewStatementOfAccount(billingId) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/statement-of-account/${billingId}`, {
        responseType: 'blob'
      });
    },
  }
}