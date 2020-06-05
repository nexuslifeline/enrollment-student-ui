import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getApplicationStepList(params){
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/application-steps`, { params: params });
    }
  }
}