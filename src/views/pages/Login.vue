<template>
  <b-container class="d-flex content-center min-vh-100">
    <b-row>
      <b-col>
        <b-card-group>
          <b-card class="p-4">
            <b-form>
              <h5>REGISTER AS STUDENT</h5>
              <b-row class="mb-4">
                <b-col  md=6 class="mb-2">
                  <b-button
                    variant="outline-primary"
                    block
                    @click="register('NEW')"> Signup New Student
                  </b-button>
                </b-col>
                  <b-col md=6>
                  <b-button
                    variant="outline-primary"
                    block
                    @click="register('OLD')"> Signup Old Student
                  </b-button>
                </b-col>
              </b-row>
              <b-row class="mb-4">
                <b-col md=12>
                  <label
                    align="center"
                    class="float-center"
                    style="width:100%">-OR-
                  </label>
                </b-col>
              </b-row>
              <b-form-group
                id="username"
                label-for="input-1"
              >
                <b-form-input
                  v-model="username"
                  placeholder="Username"
                  :state="validations.username.text !== '' && usernameFeedbackState"
                />
                <b-form-invalid-feedback>
                  {{validations.username.text}}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group>
                <b-form-input
                  v-model="password"
                  type="password"
                  placeholder="Password"
                    :state="validations.password.text !== '' && passwordFeedBackState"
                />
                <b-form-invalid-feedback>
                  {{validations.password.text}}
                </b-form-invalid-feedback>
                  </b-form-group>
              <b-row align-h="end">
                <b-col md=4>
                  <b-button
                    @click="authLogin()"
                    variant="outline-primary"
                    block>Login
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-card>
          <b-card
            bg-variant="primary"
            body-text-variant="white"
            class="text-center py-5 d-sm-down-none"
            body-wrapper
          >
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { AuthApi } from '../../mixins/api'
export default {
  name: 'Login',
  mixins: [AuthApi],
  data() {
    return {
      username: null,
      password: null,
      validations: {
        username: {
          isErrorShown: false,
          text: ''
        },
        password: {
          isErrorShown: false,
          text: ''
        }
      }
    }
  },
  computed: {
    usernameFeedbackState() {
      return !this.validations.username.isErrorShown ? true : false
    },
    passwordFeedBackState() {
      return !this.validations.password.isErrorShown ? true : false
    }
  },
  methods: {
    authLogin(){
      this.login({ username: this.username, password: this.password })
        .then(response => {
          const res = response.data
          localStorage.setItem('access_token', res.accessToken)
          this.$store.commit('loginUser')
          this.$router.push({name : 'Student Info'})
        }).catch(err => {
          const errorResponseData = err.response.data
          const { username, password } = errorResponseData.errors

          if ('username' in errorResponseData.errors) {
            this.validations.username.isErrorShown = true;
            this.validations.username.text = username[0];
          }

          if ('password' in errorResponseData.errors) {
            this.validations.password.isErrorShown = true;
            this.validations.password.text = password[0];
          }

        })
    },
    register(studentCategory){
      this.$router.push({ path: `/register/${studentCategory}` })
    }
  },
}
</script>