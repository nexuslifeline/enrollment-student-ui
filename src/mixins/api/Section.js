import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getSectionList(params){
        return this.$authHttp.get(`${apiPrefix}/${apiVersion}/sections`, { params: params });
    },
    getSectionScheduledSubjects(params, sectionId){
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/sections/${sectionId}/scheduled-subjects`, { params: params });
    },
    getSectionScheduledSubjectsWithStatus(params, sectionId){
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/sections/${sectionId}/my-scheduled-subjects`, { params: params });
    },
  }
}