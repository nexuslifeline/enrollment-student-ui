import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getAssessmentFormPreview(transcriptId) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/assessment-form/${transcriptId}`, {
        responseType: 'blob'
      });
    },
    getRequirementListPreview(transcriptId) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/requirement-list`, {
        responseType: 'blob'
      });
    }
  }
}