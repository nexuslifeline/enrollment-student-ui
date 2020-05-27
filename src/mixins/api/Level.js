import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getLevelList(isPaginate, perPage){
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/levels?paginate=${isPaginate}&perPage=${perPage}`);
    },
    getCoursesOfLevelList(levelId, params){
      console.log(params)
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/levels/${levelId}/courses`, params);
    },
    // getSubjectsOfLevelList(levelId, courseId, semeseterId, isPaginate, perPage){
    //   return this.$authHttp
    //     .get(`${apiPrefix}/${apiVersion}/levels/${levelId}/subjects?course_id=${courseId}&semesterId=${semeseterId}&paginate=${isPaginate}&perPage=${perPage}`);
    // },
    getSubjectsOfLevelList(levelId, params){
      return this.$authHttp
        .get(`${apiPrefix}/${apiVersion}/levels/${levelId}/subjects`, params);
    }
  }
}