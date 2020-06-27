import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getSectionList(params){
        return this.$authHttp.get(`${apiPrefix}/${apiVersion}/sections`, { params: params });
    },
  }
}