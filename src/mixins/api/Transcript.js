import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getTranscriptList(params) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/transcripts`, { params: params });
    },
  }
}
