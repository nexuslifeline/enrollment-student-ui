<template>
  <div class="login__container">
    <div class="login__left-pane">
      <div class="login__form">
        <div class="login__intro">
          <h4 class="login__intro-title">Welcome Back :)</h4>
          <p class="login__intro-description">
            To keep connected with us please login with you personal information by email address and password.
          </p>
        </div>
        <b-form-group id="username">
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
        <b-button
          @click="login()"
          variant="outline-primary"
          class="login__btn">
          <v-icon
            v-if="forms.auth.isProcessing"
            name="sync"
            class="mr-2"
            spin
          />Login
        </b-button>
      </div>
      <div class="login__new-account-options">
        <div class="login__create-account">
          <div class="login__create-account-line"></div>
          <span class="login__center-text">Create an Account</span>
        </div>
        <div class="login__register-actions">
          <b-button
            variant="outline-primary"
            @click="register('new')"> Signup New Student
          </b-button>
          <b-button
            variant="outline-primary"
            @click="register('old')"> Signup Old Student
          </b-button>
        </div>
      </div>
    </div>
    <div class="login__right-pane">
      <CarouselProcedure />
    </div>
  </div>
</template>
<script>
import { AuthApi } from '../../mixins/api';
import { validate, reset } from '../../helpers/forms';
import CarouselProcedure from '../components/CarouselProcedure';

const fields = {
  username: null,
  password: null
}

export default {
  name: 'Login',
  mixins: [AuthApi],
  components: {
    CarouselProcedure
  },
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
<style lang="scss" scoped>
  @import "../../assets/scss/shared.scss";

  .login__container {
    height: 100vh;
    width: 100vw;
    display: flex;
    overflow: hidden;
  }

  .login__left-pane {
    flex: 1;
    background-color: $white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 25px;
  }

  .login__form {
    padding: 20px;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;

    @include for-size(phone-only) {
      padding: 10px;
    }
  }

  .login__right-pane {
    flex: 1;
    background-color: $brand-primary;
    display: flex;
    align-items: center;

    @include for-size(tablet-landscape-down, 250px) {
      display: none;
    }
  }

  .login__btn {
    min-width: 150px;
    margin-left: auto;
  }

  .login__intro-description {
    color: $dark-gray-10;
  }

  .login__intro {
    margin-bottom: 10px;
  }

  .login__or-label {
    font-weight: 500;
  }

  .login__new-account-options {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    padding: 20px;
    margin-top: 20px;

    @include for-size(phone-only) {
      padding: 10px;
    }
  }

  .login__no-account {
    color: $dark-gray-10;
  }

  .login__create-account {
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .login__create-account-line {
    width: 100%;
    border-top: 1px solid black;
    height: 1px;
    position: absolute;
    top: 50%;
    z-index: 0;
  }

  .login__center-text {
    background-color: $white;
    z-index: 1;
    padding: 0 10px;
  }

  .login__register-actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30px;

    button {
      width: calc(50% - 5px);
    }
  }
</style>