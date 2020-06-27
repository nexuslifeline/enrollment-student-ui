<template>
  <transition name="slide-fade" appear>
    <div class="login__container">
      <div class="login__left-pane">
        <div class="login__form">
          <div class="login__intro">
            <h4 class="login__intro-title">
              Welcome to <b>St. Therese College of Tandag</b>
            </h4>
            <p class="login__intro-description">
              To keep connected with us please login with your personal information by email address and password.
            </p>
          </div>
          <b-form-group id="username">
            <b-form-input
              v-model="forms.auth.fields.username"
              placeholder="Username"
              :state="forms.auth.states.username"/>
            <b-form-invalid-feedback>
              {{forms.auth.errors.username}}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group>
            <b-form-input
              v-model="forms.auth.fields.password"
              type="password"
              placeholder="Password"
              :state="forms.auth.states.password"/>
              <b-form-invalid-feedback>
                {{forms.auth.errors.password}}
              </b-form-invalid-feedback>
          </b-form-group>
          <div class="login__actions">
            <b-button
              variant="primary"
              class="register__btn"
              @click="showConfirmation = true"
              block> Signup
            </b-button>
             <b-button
                @click="login()"
                variant="primary"
                class="login__btn"
                :disabled="forms.auth.isProcessing">
                <v-icon
                  v-if="forms.auth.isProcessing"
                  name="sync"
                  class="mr-2"
                  spin/>Login
              </b-button>
          </div>
        </div>
        <!--<div class="login__new-account-options">
          <div class="login__create-account">
            <div class="login__create-account-line"></div>
            <span class="login__center-text">Create an Account</span>
          </div>
          <div class="login__register-actions">
            <b-button
              variant="primary"
              @click="register(studentCategories.OLD.id)"> Signup Old Student
            </b-button>
          </div>
        </div>-->
        <span class="login__version">Version: {{version}}</span>
      </div>
      <div class="login__right-pane">
        <CarouselProcedure />
      </div>
      <transition name="slide-fade" :duration="{ enter: 800, leave: 500 }">
        <div v-if="showConfirmation" class="signup__confirmation">
          <button @click="showConfirmation = false" class="signup__confirmation-close">
            <v-icon
              name="times"
              class="signup__icon-close"
              scale="2"
            />
          </button>
          <div class="signup__confirmation-content">
            <p class="signup__confirmation-headline">
              Do you have an existing student number issued by STC?
            </p>
            <ul class="signup__confirmation-answers">
              <li @click="register(studentCategories.OLD.id)" class="signup__answer-item">
                <v-icon
                  name="check"
                  class="signup__answer-icon"
                  scale="2"
                />
                <v-icon
                  name="check-circle"
                  class="signup__answer-icon-check-circle"
                  scale="2"
                />
                Yes, I already have my student number.
                <v-icon name="chevron-right" class="signup__answer-chevron-right" scale="2" />
              </li>
              <li @click="register(studentCategories.NEW.id)" class="signup__answer-item">
                <v-icon
                  name="check"
                  class="signup__answer-icon"
                  scale="2"
                />
                 <v-icon
                  name="check-circle"
                  class="signup__answer-icon-check-circle"
                  scale="2"
                />
                No, I dont have student number yet.
                <v-icon name="chevron-right" class="signup__answer-chevron-right" scale="2" />
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
import { AuthApi } from '../../mixins/api';
import { validate, reset } from '../../helpers/forms';
import CarouselProcedure from '../components/CarouselProcedure';
import { StudentCategories } from '../../helpers/enum';

const fields = {
  username: null,
  password: null
}

export default {
  name: 'Login',
  components: {
    CarouselProcedure
  },
  mixins: [AuthApi],
  data() {
    return {
      version: process.env.VUE_APP_VERSION,
      studentCategories: StudentCategories,
      showConfirmation: false,
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
      this.authenticate({ username, password })
        .then(({ data }) => {
          localStorage.setItem('accessToken', data.accessToken);
          this.$store.commit('loginUser');

          this.getAuthenticatedUser().then(({ data: { userable } }) => {
            auth.isProcessing = false;
            if (userable) {
              // Just note here that there is no way that the student will have both active application and admission
              const hasActiveAdmission = !!userable.activeAdmission;
              const hasActiveApplication = !!userable.activeApplication;
              localStorage.setItem('studentId', userable.id);
              const routeName = hasActiveApplication
                ? 'Application'
                : hasActiveAdmission
                  ? 'Admission'
                  : 'Dashboard';
              this.$router.push({ name : routeName });
            }
          })
        }).catch((error) => {
          console.log(error)
          auth.isProcessing = false;
          const { errors } = error.response.data;
          validate(auth, errors);
        })
    },
    register(studentCategoryId) {
      localStorage.setItem('studentCategoryId', studentCategoryId);
      this.$router.push({ name: 'Register' })
    }
  },
}
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/shared.scss";
  @import "../../assets/scss/animations.scss";

  .login__version {
    position: absolute;
    bottom: 10px;
    left: 20px;
    font-size: 11px;
  }

  .signup__confirmation-close {
    position: absolute;
    right: 0;
    top: 0;
    margin: 10px;
    padding: 0;
    background-color: transparent;
    border: 0;
    outline: none;
  }

  .signup__icon-close {
    color: $darkblue;

    &:hover {
      color: red;
    }
  }

  .signup__answer-icon {
    color: $green;
    margin-right: 20px;
  }

  .signup__answer-icon-check-circle {
    color: $green;
    margin-right: 20px;
    display: none;
  }

  .signup__answer-chevron-right {
    margin-left: auto;
    display: none;
  }

  .signup__answer-item {
    font-size: 30px;
    font-weight: 700;
    color: $darkblue;
    margin: 13px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 7px 0;

    &:hover {
      cursor: pointer;
      border-bottom: 3px solid $brand-primary;
      color: $brand-primary;

      @include for-size(phone-only) {
        border: 0;
      }

      .signup__answer-chevron-right {
        display: flex;
        color: $brand-primary;
      }

      .signup__answer-icon-check-circle {
        display: flex;
      }

      .signup__answer-icon {
        display: none;
      }
    }

    @include for-size(phone-only) {
      font-size: 20px;
      font-weight: 600;
    }
  }

  .signup__confirmation-answers {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .signup__confirmation-headline {
    font-size: 40px;
    font-weight: 700;
    color: $darkblue;
    opacity: 1;

    @include for-size(phone-only) {
      font-size: 30px;
      font-weight: 600;
    }
  }

  .signup__confirmation-content {
    max-width: 800px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .signup__confirmation {
    padding: 40px;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: $white;
    z-index: 2;
    opacity: .97;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }

  .login__container {
    height: 100vh;
    width: 100vw;
    display: flex;
    overflow: hidden;
    position: relative;
    // background-image: url('../../assets/png/clouds.png');
    // background-repeat: no-repeat;
    // background-size: 60% 84%;
    //background: rgb(99,177,255);
    //background-color: linear-gradient(193deg, rgba(99,177,255,1) 0%, rgba(221,238,255,1) 8%, rgba(235,245,255,1) 26%, rgba(255,255,255,1) 100%);

    background: url('../../assets/png/clouds.png') top left no-repeat,
    linear-gradient(210deg, rgba(170,212,255,1) 0%, rgba(200,227,255,1) 12%, rgba(235,245,255,1) 24%, rgba(255,255,255,1) 42%, rgba(255,255,255,1) 100%) top left no-repeat;
    background-size: 55%, cover;

    @include for-size(tablet-landscape-down, 250px) {
      background: none;
    }
  }

  .login__left-pane {
    flex: 1;
    //background-color: $white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 25px;
    width: 50vw;
    position: relative;
  }

  .login__form {
    padding: 50px 40px;
    width: 100%;
    max-width: 460px;
    display: flex;
    flex-direction: column;
    background-color: $white;
    border-radius: 10px;
    -webkit-box-shadow: -1px 0px 6px 1px rgba(194,194,194,1);
    -moz-box-shadow: -1px 0px 6px 1px rgba(194,194,194,1);
    box-shadow: -1px 0px 6px 1px rgba(194,194,194,1);

    @include for-size(tablet-landscape-down, 250px) {
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
    }

    @include for-size(phone-only) {
      padding: 10px;
    }
  }

  .login__right-pane {
    flex: 1;
    //background-color: $brand-primary;
    display: flex;
    align-items: center;
    width: 50vw;

    @include for-size(tablet-landscape-down, 250px) {
      display: none;
    }
  }

  .login__btn {
    width: calc(50% - 5px);
  }

  .register__btn {
    width: calc(50% - 5px);
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
    width: 100%;

    @include for-size(phone-only) {
      flex-direction: column;
      button {
        width: 100%;
        margin: 8px 0;
      }
    }
  }

  .login__actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
  }
</style>