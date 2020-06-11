<template>
  <div class="register__container">
    <div class="register__main-area">
      <div class="register__left-pane">
        <div class="register__overview">
          <h1 class="register__feature-title">Create an Account</h1>
          <ul class="register__features">
            <li class="feature__item">
              <v-icon name="chart-pie" class="feature__icon mr-3" scale="1.6" />
              Sed ut perspiciatis unde omnis iste natus
            </li>
            <li class="feature__item">
              <v-icon name="shipping-fast" class="feature__icon mr-3" scale="1.6" />
              Ut enim ad minima veniam, quis nostrum exercitationem
            </li>
            <li class="feature__item">
              <v-icon name="paper-plane" class="feature__icon mr-3" scale="1.6" />
              At vero eos et accusamus et iusto odio dignissimos
            </li>
            <li class="feature__item">
              <v-icon name="chart-line" class="feature__icon mr-3" scale="1.6" />
              Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus
            </li>
            <li class="feature__item">
              <v-icon name="images" class="feature__icon mr-3" scale="1.6" />
              Itaque earum rerum hic tenetur a sapiente
            </li>
          </ul>
        </div>
      </div>
      <div class="register__right-pane">
        <div class="register__have-account">
          <span>Already have an account? <a href='/#/login' class="sign-in__link">Signin</a></span>
        </div>
        <div v-show="currentFormIndex === 0" class="register__credential-form">
            <b-form-group class="form-group">
              <label class="label">Email</label>
              <b-form-input
                v-model="forms.register.fields.username"
                :state="forms.register.states.username" />
                <b-form-invalid-feedback>
                  {{forms.register.errors.username}}
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group class="form-group">
              <label class="label">Password</label>
              <b-form-input
                type="password"
                v-model="forms.register.fields.password"
                :state="forms.register.states.password" />
                <b-form-invalid-feedback>
                  {{forms.register.errors.password}}
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group>
              <label class="label">Confirm Password</label>
              <b-form-input
                type='password'
                v-model="forms.register.fields.passwordConfirmation" />
            </b-form-group>
            <div class="mt-3">
              <b-button
                @click="currentFormIndex = 1"
                block
                variant="primary">
                Get Started
              </b-button>
            </div>
          </div>
        <div v-show="currentFormIndex === 1" class="register__credential-form">
            <b-form-group class="form-group">
              <label class="label">Firstname</label>
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
              <label class="label">Lastname</label>
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
      </div>
    </div>
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
      currentFormIndex: 0,
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
      reset(register);
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
        const errorKeys = Object.keys(errors);
        if (errorKeys && errorKeys.length > 0) {
          this.currentFormIndex = errorKeys.includes('username') ||
            errorKeys.includes('password')
            ? 0
            : 1;
        }
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

<style lang="scss" scoped>
  @import "../../assets/scss/shared.scss";

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
      color: $darkblue;
    }
  }
</style>
