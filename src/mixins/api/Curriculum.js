import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getCurriculumList(params){
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/curriculums`, { params: params} );
    },
  }
}