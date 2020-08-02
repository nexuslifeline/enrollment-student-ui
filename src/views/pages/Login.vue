<template>
  <transition name="slide-fade" appear>
    <div class="login__container">
      <div class="login__main-pane">
        <div class="login__form">
          <div class="login__intro">
            <h4 class="login__intro-title">
              Welcome to
            </h4>
            <h4 class="login__intro-title">
              <b>STC Student App</b>
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
        <div class="login__overview">
          <img src="/img/svg/child-lesson.svg" />
        </div>
        <span class="login__version">Version: {{version}}</span>
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
    opacity: .9;
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
    align-items: center;
    justify-content: center;
    // background-image: url('../../assets/png/clouds.png');
    // background-repeat: no-repeat;
    // background-size: 60% 84%;
    //background: rgb(99,177,255);
    //background-color: linear-gradient(193deg, rgba(99,177,255,1) 0%, rgba(221,238,255,1) 8%, rgba(235,245,255,1) 26%, rgba(255,255,255,1) 100%);

    //background: url('../../assets/png/clouds.png') top left no-repeat,
    //linear-gradient(210deg, rgba(170,212,255,1) 0%, rgba(200,227,255,1) 12%, rgba(235,245,255,1) 24%, rgba(255,255,255,1) 42%, rgba(255,255,255,1) 100%) top left no-repeat;
    //background-size: 55%, cover;

    background-color: #d7d9d9;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%23d7d9d9'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'%3E%3Cstop offset='0' stop-color='%23eceded'/%3E%3Cstop offset='1' stop-color='%23d7d9d9'/%3E%3C/linearGradient%3E%3Cpath id='s' fill='url(%23b)' d='M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z'/%3E%3Cg id='g'%3E%3Cuse href='%23s' transform='scale(0.12) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.2) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.25) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(0.3) rotate(-20)'/%3E%3Cuse href='%23s' transform='scale(0.4) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(0.5) rotate(20)'/%3E%3Cuse href='%23s' transform='scale(0.6) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.7) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.835) rotate(-40)'/%3E%3Cuse href='%23s' transform='scale(0.9) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(1.05) rotate(25)'/%3E%3Cuse href='%23s' transform='scale(1.2) rotate(8)'/%3E%3Cuse href='%23s' transform='scale(1.333) rotate(-60)'/%3E%3Cuse href='%23s' transform='scale(1.45) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(1.6) rotate(10)'/%3E%3C/g%3E%3C/defs%3E%3Cg %3E%3Cg transform='translate(0 465)'%3E%3Ccircle fill='url(%23a)' r='3000'/%3E%3Cg opacity='0.5'%3E%3Ccircle fill='url(%23a)' r='2000'/%3E%3Ccircle fill='url(%23a)' r='1800'/%3E%3Ccircle fill='url(%23a)' r='1700'/%3E%3Ccircle fill='url(%23a)' r='1651'/%3E%3Ccircle fill='url(%23a)' r='1450'/%3E%3Ccircle fill='url(%23a)' r='1250'/%3E%3Ccircle fill='url(%23a)' r='1175'/%3E%3Ccircle fill='url(%23a)' r='900'/%3E%3Ccircle fill='url(%23a)' r='750'/%3E%3Ccircle fill='url(%23a)' r='500'/%3E%3Ccircle fill='url(%23a)' r='380'/%3E%3Ccircle fill='url(%23a)' r='250'/%3E%3C/g%3E%3Cg transform='rotate(-28.8 0 0)'%3E%3Cuse href='%23g' transform='rotate(10)'/%3E%3Cuse href='%23g' transform='rotate(120)'/%3E%3Cuse href='%23g' transform='rotate(240)'/%3E%3C/g%3E%3Ccircle fill-opacity='0.48' fill='url(%23a)' r='3000'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;

    //background-color: $light-gray-100;
    //background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23cc0000' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23ab1b1e' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23d6002b' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23af0032' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d9004b' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23ae0047' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23d3006c' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23a8005d' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23c4008c' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%239c0073' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23aa00aa' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23880088' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
    //background-attachment: fixed;
    //background-size: cover;

    @include for-size(tablet-landscape-down, 250px) {
      background: none;
    }
  }

  .login__main-pane {
    width: 100%;
    max-width: 1100px;
    height: 600px;
    //background-color: $white;
    display: flex;
    //flex-direction: column;
    align-items: center;
    //justify-content: center;
    padding: 25px;
    position: relative;
    background-color: $white;
    border-radius: 5px;
    opacity: .85;

    -webkit-box-shadow: -1px 0px 6px 1px rgba(194,194,194,1);
    -moz-box-shadow: -1px 0px 6px 1px rgba(194,194,194,1);
    box-shadow: -1px 0px 6px 1px rgba(194,194,194,1);

    @include for-size(tablet-landscape-down, 250px) {
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
    }
  }

  .login__form {
    padding: 50px 40px;
    width: 460px;
    display: flex;
    flex-direction: column;
    background-color: $white;

    @include for-size(phone-only) {
      padding: 10px;
    }
  }

  .login__right-pane {
    flex: 1;
    //background-color: $brand-primary;
    display: flex;
    flex-direction: column;
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
    color: $dark-gray-300;
  }

  .login__intro {
    margin-bottom: 30px;
  }

  .login__intro-title {
    font-size: 26px;
    color: $black;
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
    margin-top: 15px;
  }

  .login__top-links {
    list-style: none;
    display: flex;
    margin-left: auto;
    margin-top: 25px;
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

  .login__carousel {
    margin: auto;
  }

  .login__overview {
    flex: 1;
    padding: 30px 0 30px 30px;

    @include for-size(tablet-landscape-down) {
      display: none;
    }

    img {
      height: 100%;
      width: auto;
    }
  }
</style>