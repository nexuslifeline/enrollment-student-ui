import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    saveFile(data, id) {
      return this.$authHttp.post(`${apiPrefix}/${apiVersion}/admissions/${id}/files`, data)
    },
    deleteFile(admissionId, fileId) {
      return this.$authHttp.delete(`${apiPrefix}/${apiVersion}/admissions/${admissionId}/files/${fileId}`)
    }
  }
}