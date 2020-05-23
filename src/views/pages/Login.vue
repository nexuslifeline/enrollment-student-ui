<template>
  <CContainer class="d-flex content-center min-vh-100">
    <CRow>
      <CCol>
        <CCardGroup>
          <CCard class="p-4">
            <CCardBody>
              <CForm>
                <h5>REGISTER AS STUDENT</h5>
                <CRow class="mb-4">
                  <CCol  md=6 class="mb-2">
                    <CButton color="outline-primary" block @click="register()"> Signup New Student</CButton>
                  </CCol>
                   <CCol md=6>
                    <CButton color="outline-primary" block @click="register()"> Signup Old Student</CButton>
                  </CCol>
                </CRow>
                
                <CRow class="mb-4">
                  <CCol md=12>
                    <label align="center" class="float-center" style="width:100%">-OR-</label>
                  </CCol>
                </CRow>
              
                <CInput
                  v-model="username"
                  placeholder="Username"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  v-model="password"
                  type="Password"
                  placeholder="Password"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>

                <CRow alignHorizontal="end">
                   <CCol md=4>
                    <CButton @click="authLogin()" color="outline-primary" block>Login</CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
          <CCard
            color="primary"
            text-color="white"
            class="text-center py-5 d-sm-down-none"
            body-wrapper
          >
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </CCard>
        </CCardGroup>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    authLogin(){
      this.$http.post('api/v1/login', {username: this.username, password: this.password})
        .then(response => {
          const res = response.data
          this.$store.commit('loginUser')
          localStorage.setItem('access_token', res.token.access_token)
          var student = res.student
          if(student.address == null || student.education == null){
            this.$router.push({name : 'Student Info'})
          }
          else{
            this.$router.push({ name: 'Dashboard'})
          }
        })
        .catch(response => {
          console.log(response)
        })
    },
    register(){
      this.$router.push({name: 'Register'})
    }
  }
}
</script>