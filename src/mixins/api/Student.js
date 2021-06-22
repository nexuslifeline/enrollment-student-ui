import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    registerStudent(data) {
      return this.$http.post(`${apiPrefix}/${apiVersion}/register`, data);
    },
    getStudentList() {

    },
    getStudent(id) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/students/${id}`)
    },
    addStudent(data) {
    },
    updateStudent(data, id) {
      return this.$authHttp.put(`${apiPrefix}/${apiVersion}/students/${id}`, data)
    },
    patchStudent(data, id) {
      return this.$authHttp.patch(`${apiPrefix}/${apiVersion}/students/${id}`, data)
    },
    savePhoto(data, id){
      return this.$authHttp.post(`${apiPrefix}/${apiVersion}/students/${id}/photos`, data)
    },
    deletePhoto(id){
      return this.$authHttp.delete(`${apiPrefix}/${apiVersion}/students/${id}/photos`)
    },
    getBillingsOfStudent(studentId) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/students/${studentId}/billings`);
    },
    enrollStudent(studentId, data) {
      return this.$authHttp.post(`${apiPrefix}/${apiVersion}/students/${studentId}/enroll`, data);
    },
    getLedgerOfStudent(studentId, params) {
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/students/${studentId}/ledgers`, { params: params });
    }
  }
}