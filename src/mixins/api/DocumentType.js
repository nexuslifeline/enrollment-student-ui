import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getDocumentTypeList(params){
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/document-types`, { params: params });
    }
  }
}