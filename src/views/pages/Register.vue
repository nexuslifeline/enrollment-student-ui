<template>
  <transition name="slide-fade" appear>
    <div class="register__container">
      <div class="register__main-area">
        <div class="register__left-pane">
          <div class="register__overview">
            <h1 class="register__feature-title">Create an Account</h1>
            <ul class="register__features">
              <li class="feature__item">
                <v-icon name="chart-pie" class="feature__icon mr-3" scale="1.6" />
                Keep track of your records
              </li>
              <li class="feature__item">
                <v-icon name="shipping-fast" class="feature__icon mr-3" scale="1.6" />
                Ease of access with friendly user interface
              </li>
              <li class="feature__item">
                <v-icon name="paper-plane" class="feature__icon mr-3" scale="1.6" />
                Access your grades anywhere
              </li>
              <li class="feature__item">
                <v-icon name="chart-line" class="feature__icon mr-3" scale="1.6" />
                View your statement of account anywhere
              </li>
              <li class="feature__item">
                <v-icon name="images" class="feature__icon mr-3" scale="1.6" />
                Review your payment history
              </li>
            </ul>
          </div>
        </div>
        <div class="register__right-pane">
          <div class="register__have-account">
            <span>Already have an account? <a href='/#/login' class="sign-in__link">Signin</a></span>
          </div>
          <transition
            name="slide-fade"
            mode="out-in">
            <div key="1" v-if="currentFormIndex === 0" class="register__credential-form">
              <b-form-group class="form-group">
                <label class="label required">Email</label>
                <b-form-input
                  v-model="forms.register.fields.username"
                  :state="forms.register.states.username" />
                <b-form-invalid-feedback>
                  {{forms.register.errors.username}}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group class="form-group">
                <label class="label required">Password</label>
                <b-form-input
                  type="password"
                  v-model="forms.register.fields.password"
                  :state="forms.register.states.password" />
                <b-form-invalid-feedback>
                  {{forms.register.errors.password}}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group>
                <label class="label required">Confirm Password</label>
                <b-form-input
                  type='password'
                  v-model="forms.register.fields.passwordConfirmation"
                  :state="forms.register.states.passwordConfirmation"/>
                <b-form-invalid-feedback>
                  {{forms.register.errors.passwordConfirmation}}
                </b-form-invalid-feedback>
              </b-form-group>
              <div class="mt-3">
                <b-button
                  @click="onGetStarted"
                  block
                  variant="primary">
                  Get Started
                </b-button>
              </div>
            </div>
            <div key="2" v-else class="register__credential-form">
              <b-form-group 
                  class="form-group"
                  v-if="(isEnrolled === true ? true : (forms.register.fields.studentCategoryId === StudentCategories.OLD.id ? true : false))" >
                <label class="label required">Student No</label>
                <b-form-input
                  v-model="forms.register.fields.studentNo"
                  :state="forms.register.states.studentNo" />
                  <b-form-invalid-feedback>
                    {{forms.register.errors.studentNo}}
                  </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group class="form-group">
                <label class="label required">Firstname</label>
                <b-form-input
                  v-model="forms.register.fields.firstName"
                  :state="forms.register.states.firstName" />
                  <b-form-invalid-feedback>
                    {{forms.register.errors.firstName}}
                  </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group class="form-group">
                <label class="label">Middlename</label>
                <b-form-input
                  v-model="forms.register.fields.middleName" />
              </b-form-group>
              <b-form-group class="form-group">
                <label class="label required">Lastname</label>
                <b-form-input
                  v-model="forms.register.fields.lastName"
                  :state="forms.register.states.lastName" />
                  <b-form-invalid-feedback>
                    {{forms.register.errors.lastName}}
                  </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group class="form-group">
                <label class="label">Mobile No.</label>
                <b-form-input
                  v-model="forms.register.fields.mobileNo" />
              </b-form-group>
              <div class="register__about-actions">
                <b-button
                  @click="currentFormIndex = 0"
                  variant="outline-secondary"
                  class="register__back-btn">
                  Back
                </b-button>
                <b-button
                  @click="createAccount()"
                  variant="primary"
                  :disabled="forms.register.isProcessing"
                  class="register__create-btn">
                  <v-icon
                    v-if="forms.register.isProcessing"
                    name="sync"
                    class="mr-2"
                    spin
                  />Register
                </b-button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { StudentApi, AuthApi } from '../../mixins/api'
import { validate, reset } from '../../helpers/forms';
import { StudentCategories } from '../../helpers/enum'

const fields = {
  studentNo: null,
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
      currentFormIndex: 0,
      StudentCategories: StudentCategories,
      isEnrolled: null,
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
  mounted() {
    // there seems to be a race-condition happening here causing an intermittent bug in the backend
    // what happens is when newly enrolled student(new/enrolled) created an account, the student number sometimes is not inserted in backend
    setTimeout(() => {
      const pathParams = this.$route.params;
      this.forms.register.fields.studentCategoryId = Number(pathParams.studentCategoryId);
      this.isEnrolled = (pathParams.isEnrolled === 'y' || pathParams.isEnrolled === 'Y');
    }, 250);
  },
  methods: {
    onGetStarted() {
      reset(this.forms.register);
      if (this.validateFirstStage()) {
        this.currentFormIndex = 1;
      }
    },
    validateFirstStage() {
      // this is only to check if username and password are provided before allowing to proceed
      // do take note that our core validations are on backend
      let valid = true;
      const errorsFields = {
        username: 'The email field is required!',
        password: 'The password field is required!',
        passwordConfirmation: 'The confirm password field is required!'
      }
      const { fields, states, errors } = this.forms.register;
      Object.keys(errorsFields).forEach((key) => {
        if (!fields[key]) {
          states[key] = false;
          errors[key] = errorsFields[key];
          valid = false;
        }
      });
      return valid;
    },
    createAccount() {
      const { register, register: { fields: { username, password } } } = this.forms;
      const data = {
        isEnrolled: this.isEnrolled,
        ...register.fields
      }
      register.isProcessing = true;
      reset(register);
      this.registerStudent(data).then(({ data }) => {
        this.authenticate({ username, password }).then(({ data }) => {
          localStorage.setItem('accessToken', data.accessToken)
          this.$store.commit('LOGIN_USER');
          register.isProcessing = false;
          setTimeout(() => {
            this.$router.push({ path: '/dashboard' });
          }, 250);
        })
      })
      .catch(error => {
        register.isProcessing = false;
        const { errors } = error.response.data;
        const errorKeys = Object.keys(errors);
        if (errorKeys && errorKeys.length > 0) {
          this.currentFormIndex = errorKeys.includes('username') ||
            errorKeys.includes('password')
            ? 0
            : 1;
        }
        validate(register, errors);
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/shared.scss";
  @import "../../assets/scss/animations.scss";

  .register__container {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $white;
  }

  .register__main-area {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
  }

  .register__left-pane {
    flex: 1;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $blue;

    @include for-size(tablet-landscape-down, 200px) {
      display: none;
    }
  }

  .register__right-pane {
    flex: 1;
    padding: 30px;
    display: flex;
    flex-direction: column;

    @include for-size(phone-only) {
      padding: 0;
    }
  }

  .register__overview {
    padding: 30px;
    max-width: 450px;
    width: 100%;
  }

  .register__credential-form {
    padding: 30px;
    max-width: 450px;
    width: 100%;
    margin: auto;
  }

  .form-group {
    margin-bottom: 8px;
  }

  .label {
    margin-bottom: 2px;
  }

  .register__features {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .feature__item {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    font-size: 15px;
    color: $white;
  }

  .register__feature-title {
    margin-bottom: 25px;
    font-weight: 700;
    color: $white;
  }

  .feature__icon  {
    color: $white;
  }

  .register__about-actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
  }

  .register__create-btn {
    width: calc(50% - 5px);
  }

  .register__back-btn {
    width: calc(50% - 5px);
  }

  .register__have-account {
    margin: -20px -10px 0 auto;

    @include for-size(phone-only) {
      margin: 10px 15px 0 auto;
    }
  }

  .sign-in__link {
    font-weight: 400;
    &:hover {
      color: $dark-blue;
    }
  }
</style>
