import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getEvaluation(evaluationId){
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/evaluations/${evaluationId}`, );
    },
    getUnscheduledSubjects(evaluationId, params){
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/evaluations/${evaluationId}/unscheduled-subjects`, { params: params });
    },
  }
}