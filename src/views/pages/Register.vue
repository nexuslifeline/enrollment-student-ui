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
                        v-model="forms.register.fields.firstName"
                        :state="forms.register.states.firstName" />
                        <b-form-invalid-feedback>
                          {{forms.register.errors.firstName}}
                        </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                  <b-col md=6>
                    <b-form-group>
                      <label>Middlename</label>
                      <b-form-input 
                        v-model="forms.register.fields.middleName" />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md=6 >
                    <b-form-group>
                      <label>Lastname</label>
                      <b-form-input 
                        v-model="forms.register.fields.lastName" 
                        :state="forms.register.states.lastName" />
                        <b-form-invalid-feedback>
                          {{forms.register.errors.lastName}}
                        </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                  <b-col md=6>
                    <b-form-group>
                      <label>Mobile No.</label>
                      <b-form-input 
                        v-model="forms.register.fields.mobileNo" />
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
                        v-model="forms.register.fields.username" 
                        :state="forms.register.states.username" />
                        <b-form-invalid-feedback>
                          {{forms.register.errors.username}}
                        </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                  <b-col md=6>
                    <b-form-group>
                      <label>Password</label>
                      <b-form-input 
                        type="password"
                        v-model="forms.register.fields.password" 
                        :state="forms.register.states.password" />
                        <b-form-invalid-feedback>
                          {{forms.register.errors.password}}
                        </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md=6 >
                    <b-form-group>
                      <label>Confirm Password</label>
                      <b-form-input 
                        type='password'
                        v-model="forms.register.fields.passwordConfirmation" />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col
                    xs=12
                    sm=12
                    offset-md=8
                    md=4
                  >
                    <b-button 
                      @click="createAccount()" 
                      block variant="outline-primary"
                      :disabled="forms.register.isProcessing">
                      <v-icon
                        v-if="forms.register.isProcessing"
                        name="sync"
                        class="mr-2"
                        spin
                      />Create Account
                    </b-button>
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
import { validate, reset } from '../../helpers/forms';
import { StudentCategories } from '../../helpers/enum'

const fields = {
  firstName: null,
  middleName: null,
  lastName: null,
  mobileNo: null,
  username: null,
  password: null,
  passwordConfirmation: null,
  studentCategoryId: null
}

export default {
  name: 'Register',
  mixins: [StudentApi, AuthApi],
  data() {
    return {
      StudentCategories: StudentCategories,
      forms: {
        register: {
          isProcessing: false,
          fields: { ...fields },
          states: { ...fields },
          errors: { ...fields }
        }
      }
    }
  },
  methods: {
    createAccount(){
      const { register, register: { fields: { username, password } } } = this.forms;
      register.isProcessing = true
      register.fields.studentCategoryId = localStorage.getItem('studentCategoryId');
      this.registerStudent(register.fields).then(({ data }) => {
        this.authenticate({ username, password }).then(({ data }) => {
          localStorage.setItem('accessToken', data.accessToken)
          this.$store.commit('loginUser')
          this.getAuthenticatedUser().then(({ data }) => {
            register.isProcessing = false;
            localStorage.setItem('studentId', data.userable.id);
            const routeName =
              StudentCategories.NEW.id === data.userable.transcript.studentCategoryId
                ? 'Admission' 
                : 'Application';
            localStorage.removeItem('studentCategoryId')
            this.$router.push({ name : routeName });
          })
        })
      })
      .catch(error => {
        console.log(error)
        register.isProcessing = false;
        const { errors } = error.response.data;
        validate(register, errors);
      })
      // this.$http.post('api/v1/register', this.forms.register.fields)
      //   .then(response => {
      //     const res = response.data
      //     this.$store.commit('loginUser')
      //     localStorage.setItem('accessToken', res.token.accessToken)
      //     this.$router.push({ name: 'Student Info'})
      //   })
      //   .catch(response => {
      //     console.log(response)
      //   })
    }
  }
}
</script>
