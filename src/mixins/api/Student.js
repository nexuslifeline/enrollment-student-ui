import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    registerStudent(data) {
      return this.$http.post(`${apiPrefix}/${apiVersion}/register`, data);
    },
    getStudentList() {

    },
    getStudent(id) {

    },
    addStudent(data) {

    },
    updateStudent(data, id) {
      return this.$authHttp.put(`${apiPrefix}/${apiVersion}/student/` + id, data)
    },
    getStudentInfo(){
      return this.$authHttp.get(`${apiPrefix}/${apiVersion}/studentinfo`)
    },
    updateStudentInfo(child, data, id){
      return this.$authHttp.put(`${apiPrefix}/${apiVersion}/studentinfo/` + child + `/` + id, data)
    }
  }
}