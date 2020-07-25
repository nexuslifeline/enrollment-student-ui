<template>
  <transition name="slide-fade" appear>
    <div class="login__container">
      <div class="login__left-pane">
        <div class="login__form">
          <div class="login__intro">
            <h4 class="login__intro-title">
              Welcome to <b>St. Theresa College of Tandag</b>
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
        <ul class="login__top-links">
          <li class="login__top-link-item">
            <a href="https://lms.stctandag.edu.ph/">LMS</a>
          </li>
          <li class="login__top-link-item">
            <a
              href="https://www.stctandag.edu.ph/"
              class="login__top-link-item--active">
              Visit our Website
            </a>
          </li>
        </ul>
        <CarouselProcedure />
      </div>
      <transition name="slide-fade" :duration="{ enter: 800, leave: 500 }">
        <div v-if="showConfirmation" class="signup__confirmation">
          <button @click="showConfirmation = false; step = 1" class="signup__confirmation-close">
            <v-icon
              name="times"
              class="signup__icon-close"
              scale="2"
            />
          </button>

          <div v-if="step === 1" class="signup__confirmation-content">
            <p class="signup__confirmation-headline">
              Are you already enrolled for SY 2020-2021?
            </p>
            <ul class="signup__confirmation-answers">
              <li @click="onSelectOption(true)" class="signup__answer-item">
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
                <div class="signup__confirmation-answer-item">
                  Yes, I am enrolled
                  <span class="signup__confirmation-answer-notes">
                    (Choose this if you are Already ENROLLED this Academic Year 2020-2021 and you want to register for an STC student account)
                  </span>
                </div>
                <v-icon name="chevron-right" class="signup__answer-chevron-right" scale="2" />
              </li>
              <li @click="onSelectOption(false)" class="signup__answer-item">
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
                <div class="signup__confirmation-answer-item">
                  Not yet enrolled
                  <span class="signup__confirmation-answer-notes">
                    (Choose this if you want to enroll and register for an STC student account)
                  </span>
                </div>
                <v-icon name="chevron-right" class="signup__answer-chevron-right" scale="2" />
              </li>
            </ul>
          </div>

          <div v-if="step === 2" class="signup__confirmation-content">
            <p class="signup__confirmation-headline signup__confirmation-headline--no-bottom">
              What type of student are you?
            </p>
            <span v-if="isEnrolled" class="signup__confirmation-answer-notes">
              (If you are not sure, you may refer to your Certificate of Registration(SY 2020-2021)
              or you may contact us at <a href='#'>{{fbPageUrl}}</a>)
            </span>
            <ul class="signup__confirmation-answers">
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
                <div class="signup__confirmation-answer-item">
                 {{ questionaire[isEnrolled ? 0 : 1][0].header }}
                  <span class="signup__confirmation-answer-notes">
                    {{ questionaire[isEnrolled ? 0 : 1][0].description }}
                    <br>
                    <small>{{ questionaire[isEnrolled ? 0 : 1][0].notes }}</small>
                  </span>
                </div>
                <v-icon name="chevron-right" class="signup__answer-chevron-right" scale="2" />
              </li>
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
                <div class="signup__confirmation-answer-item">
                  {{ questionaire[isEnrolled ? 0 : 1][1].header }}
                  <span class="signup__confirmation-answer-notes">
                    {{ questionaire[isEnrolled ? 0 : 1][1].description }}
                    <br>
                    <small>{{ questionaire[isEnrolled ? 0 : 1][1].notes }}</small>
                  </span>
                </div>
                <v-icon name="chevron-right" class="signup__answer-chevron-right" scale="2" />
              </li>
              <li @click="register(studentCategories.TRANSFEREE.id)" class="signup__answer-item">
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
                <div class="signup__confirmation-answer-item">
                  {{ questionaire[isEnrolled ? 0 : 1][2].header }}
                  <span class="signup__confirmation-answer-notes">
                    {{ questionaire[isEnrolled ? 0 : 1][2].description }}
                    <br>
                    <small>{{ questionaire[isEnrolled ? 0 : 1][2].notes }}</small>
                  </span>
                </div>
                <v-icon name="chevron-right" class="signup__answer-chevron-right" scale="2" />
              </li>

              <li @click="register(null)" class="signup__answer-item">
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
                <div class="signup__confirmation-answer-item">
                  {{ questionaire[isEnrolled ? 0 : 1][3].header }}
                  <span class="signup__confirmation-answer-notes">
                    {{ questionaire[isEnrolled ? 0 : 1][3].description }}
                    <br>
                    <small>{{ questionaire[isEnrolled ? 0 : 1][3].notes }}</small>
                  </span>
                </div>
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
      isEnrolled: false,
      fbPageUrl: process.env.VUE_APP_FB_PAGE_URL,
      step: 1,
      forms: {
        auth: {
          isProcessing: false,
          fields: { ...fields },
          states: { ...fields },
          errors: { ...fields }
        }
      },
      questionaire: [
        [
          {
            header: '1. I am a newly enrolled student',
            description: '(Choose this if this Academic Year 2020-2021 is your first time in STC)',
            notes: 'Note: for  newly enrolled transferees, please proceed to No. 3.'
          },
          {
            header: '2. I am an old and currently enrolled student',
            description: '(Choose this if you have attended STC before)',
            notes: null
          },
          {
            header: '3. I am a newly enrolled transferee student',
            description: '(Choose this if you are a student who moved in to STC from other institution)',
            notes: null
          },
          {
            header: '4. Go Back',
            description: '(Go Back)',
            notes: null
          }
        ],
        [
          {
            header: '1. I am a new student ',
            description: 'Choose this if this is your first time to enroll in STC)',
            notes: 'Note: for transferees, please proceed to No. 3.'
          },
          {
            header: '2. I am a old student',
            description: '(Choose this if you have attended STC before)',
            notes: null
          },
          {
            header: '3. I am a  transferee student',
            description: '(Choose this if you are a student who wish to move in STC from other institution)',
            notes: null
          },
          {
            header: '4. Go Back',
            description: '(Go Back)',
            notes: null
          }
        ]
      ]
    }
  },
  methods: {
    login() {
      const { auth, auth: { fields: { username, password } } } = this.forms;
      auth.isProcessing = true;
      this.authenticate({ username, password })
        .then(({ data }) => {
          localStorage.setItem('accessToken', data.accessToken);
          this.$store.commit('LOGIN_USER');
          this.$router.push({ path: '/dashboard' });
        }).catch((error) => {
          auth.isProcessing = false;
          const { errors } = error.response.data;
          validate(auth, errors);
        })
    },
    register(studentCategoryId) {
      if(studentCategoryId){
        //localStorage.setItem('studentCategoryId', studentCategoryId);
        this.$router.push({ path: `/register/${studentCategoryId}/${this.isEnrolled ? 'y' : 'n'}` })
        return;
      }
      this.step = 1
    },
    onSelectOption(isEnrolled) {
      //event for step 1 selection
      //localStorage.setItem('isEnrolled', isEnrolled);
      this.isEnrolled = isEnrolled;
      this.step = 2;
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
    color: $dark-blue;

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
    font-size: 28px;
    font-weight: 700;
    color: $dark-blue;
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
    font-size: 36px;
    font-weight: 700;
    color: $dark-blue;
    opacity: 1;

    @include for-size(phone-only) {
      font-size: 30px;
      font-weight: 600;
    }
  }

  .signup__confirmation-headline--no-bottom {
    margin-bottom: 0;
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
    flex-direction: column;
    justify-content: center;
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
    color: $dark-gray-100;
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
    color: $dark-gray-100;
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

  .login__top-links {
    list-style: none;
    display: flex;
    margin-left: auto;
  }

  .login__top-link-item {
    margin-right: 15px;

    a {
      text-decoration:none;
      color: $dark-blue;
      padding: 5px 25px;
      font-size: 16px;
      font-weight: 600;
    }

    &:hover a {
      color: $white;
      background-color: $brand-primary;
      border-radius: 16px;
    }
  }

  .login__top-link-item--active {
    color: $white !important;
    background-color: $brand-primary;
    border-radius: 16px;
  }

  .signup__confirmation-answer-item {
    display: flex;
    flex-direction: column;
  }

  .signup__confirmation-answer-notes {
    font-size: 17px;
    font-weight: 400;
    color: $gray;
  }
</style>