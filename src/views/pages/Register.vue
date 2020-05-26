<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard>
            <CCardBody>
              <CForm>
                <CRow>
                  <CCol>
                    <label>ABOUT YOU</label>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <small>A bit of personal details about you.</small>
                  </CCol>
                </CRow>
                <CRow class="mt-4">
                  <CCol md=6 >
                    <CInput 
                      label="Firstname" 
                      placeholder="Firstname"
                      v-model="forms.student.fields.firstName"
                    />
                  </CCol>
                  <CCol md=6>
                    <CInput 
                      label="Middlename" 
                      placeholder="Middlename"
                      v-model="forms.student.fields.middleName"
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md=6 >
                    <CInput 
                      label="Lastname" 
                      placeholder="Lastname"
                      v-model="forms.student.fields.lastName"
                    />
                  </CCol>
                  <CCol md=6>
                    <CInput 
                      label="Mobile No." 
                      placeholder="Mobile No."
                      v-model="forms.student.fields.mobileNo"
                    />
                  </CCol>
                </CRow>
                <CRow class="mt-3">
                  <CCol>
                    <label>ACCOUNT</label>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <small>Enter your preferred username and password.</small>
                  </CCol>
                </CRow>
                <CRow class="mt-4">
                  <CCol md=6 >
                    <CInput 
                      label="Email Address" 
                      placeholder="Email Address"
                      v-model="forms.student.fields.username"
                    />
                  </CCol>
                  <CCol md=6>
                    <CInput 
                      label="Password" 
                      placeholder="Password"
                      type="password"
                      v-model="forms.student.fields.password"
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md=6 >
                    <CInput 
                      label="Confirm Password" 
                      placeholder="Confirm Password"
                      type="password"
                      v-model="forms.student.fields.passwordConfirmation"
                    />
                  </CCol>
                </CRow>
                <CRow align-h="end">
                  <CCol md=3>
                    <CButton @click="createAccount()" block color="outline-primary">Create Account</CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { StudentApi, AuthApi } from '../../mixins/api'
export default {
  name: 'Register',
  mixins: [StudentApi, AuthApi],
  data() {
    return {
      forms: {
        student: {
          fields: {
            firstName: null,
            middleName: null,
            lastName: null,
            mobileNo: null,
            username: null,
            password: null,
            passwordConfirmation: null
          }
        }
      }
    }
  },
  methods: {
    createAccount(){
      this.registerStudent(this.forms.student.fields).then(response => {
        this.login({ username: this.forms.student.fields.username, password: this.forms.student.fields.password }).then(response => {
          const res = response.data
          console.log(res)
          localStorage.setItem('access_token', res.accessToken)
          this.$store.commit('loginUser')
          this.$router.push({name : 'Student Info'})
        }).catch(response =>{
          console.log(response)
        })
      })
      .catch(response => {
        console.log(response);
      })
      // this.$http.post('api/v1/register', this.forms.student.fields)
      //   .then(response => {
      //     const res = response.data
      //     this.$store.commit('loginUser')
      //     localStorage.setItem('access_token', res.token.access_token)
      //     this.$router.push({ name: 'Student Info'})
      //   })
      //   .catch(response => {
      //     console.log(response)
      //   })
    }
  }
}
</script>
