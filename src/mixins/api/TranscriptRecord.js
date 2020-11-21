import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getUnscheduledSubjects(transcriptRecordId, params){
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/transcript-records/${transcriptRecordId}/unscheduled-subjects`, { params: params });
    },
  }
}