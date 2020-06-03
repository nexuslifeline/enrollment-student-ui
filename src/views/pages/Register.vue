<template>
  <div class="d-flex align-items-center min-vh-100">
    <b-container fluid>
      <b-row class="justify-content-center">
        <b-col
          xs=12
          sm=12 
          md=10
          lg=8
          xl=6
          >
          <b-card>
            <b-card-body>
              <b-form>
                <b-row>
                  <b-col>
                    <label>ABOUT YOU</label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <small>A bit of personal details about you.</small>
                  </b-col>
                </b-row>
                <b-row class="mt-4">
                  <b-col md=6 >
                    <b-form-group>
                      <label>Firstname</label>
                      <b-form-input 
                        placeholder="Firstname"
                        v-model="forms.student.fields.firstName" />
                    </b-form-group>
                  </b-col>
                  <b-col md=6>
                    <b-form-group>
                      <label>Middlename</label>
                      <b-form-input 
                        placeholder="Middlename"
                        v-model="forms.student.fields.middleName" />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md=6 >
                    <b-form-group>
                      <label>Lastname</label>
                      <b-form-input 
                        placeholder="Lastname"
                        v-model="forms.student.fields.lastName" />
                    </b-form-group>
                  </b-col>
                  <b-col md=6>
                    <b-form-group>
                      <label>Mobile No.</label>
                      <b-form-input 
                        placeholder="Mobile No."
                        v-model="forms.student.fields.mobileNo" />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row class="mt-3">
                  <b-col>
                    <label>ACCOUNT</label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <small>Enter your preferred username and password.</small>
                  </b-col>
                </b-row>
                <b-row class="mt-4">
                  <b-col md=6 >
                    <b-form-group>
                      <label>Email Address</label>
                      <b-form-input 
                        placeholder="Email Address"
                        v-model="forms.student.fields.username" />
                    </b-form-group>
                  </b-col>
                  <b-col md=6>
                    <b-form-group>
                      <label>Password</label>
                      <b-form-input 
                        type="password"
                        placeholder="Password"
                        v-model="forms.student.fields.password" />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md=6 >
                    <b-form-group>
                      <label>Confirm Password</label>
                      <b-form-input 
                        type='password'
                        placeholder="Confirm Password"
                        v-model="forms.student.fields.passwordConfirmation" />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col
                    xs=12
                    sm=12
                    offset-md=4
                    md=4
                  >
                    <b-button @click="createAccount()" block variant="outline-primary">Create Account</b-button>
                  </b-col>
                </b-row>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
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
        const { username, password } = this.forms.student.fields;

        this.login({ username, password }).then(response => {
          const res = response.data
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
