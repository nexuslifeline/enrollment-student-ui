import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    getAdmissionFiles(admissionId, params) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/admissions/${admissionId}/files`, { params: params })
    },
    addAdmissionFile(data, admissionId) {
      return this.$authHttp.post(`${apiPrefix}/${apiVersion}/admissions/${admissionId}/files`, data)
    },
    updateAdmissionFile(data, admissionId, fileId) {
      return this.$authHttp.put(`${apiPrefix}/${apiVersion}/admissions/${admissionId}/files/${fileId}`, data)
    },
    deleteAdmissionFile(admissionId, fileId) {
      return this.$authHttp.delete(`${apiPrefix}/${apiVersion}/admissions/${admissionId}/files/${fileId}`)
    }
  }
}