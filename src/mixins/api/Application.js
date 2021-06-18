import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    postApplicationEvaluationRequest(applicationId, data) {
      return this.$authHttp.post(`${apiPrefix}/${apiVersion}/applications/${applicationId}/request-evaluation`, data);
    },
    postApplicationSubmit(applicationId) {
      return this.$authHttp.post(`${apiPrefix}/${apiVersion}/applications/${applicationId}/submit`);
    },
  }
}
