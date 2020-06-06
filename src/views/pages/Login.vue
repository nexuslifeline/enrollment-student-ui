<template>
  <b-container class="d-flex align-items-center min-vh-100">
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
              >
                <b-form-input
                  v-model="forms.auth.fields.username"
                  placeholder="Username"
                  :state="forms.auth.states.username"
                />
                <b-form-invalid-feedback>
                  {{forms.auth.errors.username}}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group>
                <b-form-input
                  v-model="forms.auth.fields.password"
                  type="password"
                  placeholder="Password"
                  :state="forms.auth.states.password"
                />
                <b-form-invalid-feedback>
                  {{forms.auth.errors.password}}
                </b-form-invalid-feedback>
                  </b-form-group>
              <b-row align-h="end">
                <b-col md=4>
                  <b-button
                    @click="login()"
                    variant="outline-primary"
                    block>
                    <v-icon
                      v-if="forms.auth.isProcessing"
                      name="sync"
                      class="mr-2"
                      spin
                    />Login
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-card>
          <b-card
            bg-variant="primary"
            body-text-variant="white"
            class="text-center py-5 d-sm-down-none"
            body-wrapper>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { AuthApi } from '../../mixins/api';
import { validate, reset } from '../../helpers/forms';
const fields = {
  username: null,
  password: null
}
export default {
  name: 'Login',
  mixins: [AuthApi],
  data() {
    return {
      forms: {
        auth: {
          isProcessing: false,
          fields: { ...fields },
          states: { ...fields },
          errors: { ...fields }
        }
      }
    }
  },
  methods: {
    login() {
      const { auth, auth: { fields: { username, password } } } = this.forms;
      auth.isProcessing = true;
      reset(auth);
      this.authenticate({ username, password })
        .then(({ data }) => {
          auth.isProcessing = false;
          localStorage.setItem('access_token', data.accessToken);
          this.$store.commit('loginUser');
          this.$router.push({ name : 'Student Info' });
        }).catch((error) => {
          auth.isProcessing = false;
          const { errors } = error.response.data;
          validate(auth, errors);
        })
    },
    register(studentCategory) {
      this.$router.push({ path: `/register/${studentCategory}` })
    }
  },
}
</script>