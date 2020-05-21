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
                      v-model="forms.student.fields.first_name"
                    />
                  </CCol>
                  <CCol md=6>
                    <CInput 
                      label="Middlename" 
                      placeholder="Middlename"
                      v-model="forms.student.fields.middle_name"
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md=6 >
                    <CInput 
                      label="Lastname" 
                      placeholder="Lastname"
                      v-model="forms.student.fields.last_name"
                    />
                  </CCol>
                  <CCol md=6>
                    <CInput 
                      label="Mobile No." 
                      placeholder="Mobile No."
                      v-model="forms.student.fields.mobile_no"
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
                    />
                  </CCol>
                  <CCol md=6>
                    <CInput 
                      label="Password" 
                      placeholder="Password"
                      type="password"
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md=6 >
                    <CInput 
                      label="Confirm Password" 
                      placeholder="Confirm Password"
                      type="password"
                    />
                  </CCol>
                </CRow>
                <CRow align-h="end">
                  <CCol md=3>
                    <CButton @click="CreateAccount()" block color="outline-primary">Create Account</CButton>
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
export default {
  name: 'Register',
  data() {
    return {
      forms: {
        student: {
          fields: {
            first_name: null,
            middle_name: null,
            last_name: null,
            mobile_no: null
          }
        }
      }
    }
  },
  methods: {
    CreateAccount(){
      this.$http.post('api/v1/register', this.forms.student.fields)
        .then(response => {
          console.log(response)
        })
        .catch(response => {
          console.log(response)
        })
    }
  }
}
</script>
