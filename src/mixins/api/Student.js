import { apiVersion, apiPrefix } from './config';

export default {
  methods: {
    registerStudent(data) {
      return this.$http.post(`${apiVersion}/${apiPrefix}/register`, data);
    },
    getStudentList() {

    },
    getStudent(id) {

    },
    addStudent(data) {

    },
    updateStudent(data, id) {

    }
  }
}