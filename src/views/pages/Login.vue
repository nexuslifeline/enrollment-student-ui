<template>
  <CContainer class="d-flex content-center min-vh-100">
    <CRow>
      <CCol>
        <CForm>
          <CRow >
            <CCol md=12>
              <CRow>
                <CCol md=8>
                  <label>REGISTER AS STUDENT</label>
                </CCol>
              </CRow>
              <CRow align-h="center">
                <CCol md=8>
                  <CRow>
                    <CCol md=6> 
                      <CButton block color="outline-primary">Sign up as New Student</CButton> 
                    </CCol>
                    <CCol md=6> 
                      <CButton block color="outline-primary">Sign up as New Student</CButton> 
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
              <CRow align-h="center" class="mt-4">
                <CCol md=8>
                  <CRow >
                    <CCol md=12>
                      <label align="center" class="float-center" style="width:100%">-OR-</label>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
              <CRow align-h="left" class="mt-4">
                <CCol md=8> 
                  <CInput
                    label="Username"
                    placeholder="Username"
                  />
                  <CInput
                    type="Password"
                    label="Password"
                    placeholder="Password"
                  />
                </CCol>
              </CRow>
              <CRow align-h="center">
                <CCol md=8>
                  <CRow align-h="end">
                    <CCol md=12>
                      <CButton color="outline-primary" block>Login</CButton>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CForm>
      </CCol>
      <CCol >
        <CImg src="https://image.shutterstock.com/z/stock-vector-enroll-now-open-registration-for-a-course-template-design-for-bloggers-and-social-media-college-537712411.jpg" fluid alt="Responsive image" block></CImg>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
export default {
  name: 'Login'
}
</script>
