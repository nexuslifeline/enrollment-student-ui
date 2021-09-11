<template>
  <div class="account__profile">
    <div class="account__photo-circle">
      <b-avatar
        v-if="!!userPhoto"
        :src="userPhoto"
      />
      <ProfileMaker
        v-else
        :initials="fullName.charAt(0)"
        :colorIndex="user.id % 8" :fontSize="22"
      />
    </div>
    <div class="account__details">
      <p v-if="!!fullName" class="account__name">{{ fullName }}</p>
      <p v-if="!!fullName" class="account__type">
        {{ user.isOnboarding ? 'Provisional Account' : 'Student Account' }}
      </p>
    </div>
    <div class="account__icon-down">
      <DownArrow />
    </div>
    <div class="account__dropdown-actions">
      <div class="account__intro">
        <img src="/img/svg/my-profile.svg" />
      </div>
      <span class="triangle-top"></span>
      <ul class="account__dropdown-action-items">
        <template v-if="!user.isOnboarding">
          <li class="account__dropdown-item">
            <div class="account__dropdown-icon">
              <MyProfile />
            </div>
            <span class="account__dropdown-item-label" @click="$router.push('profile')" >
              My Profile
            </span>
          </li>
          <li class="account__dropdown-item">
            <div class="account__dropdown-icon">
              <MyPreferences />
            </div>
            <span class="account__dropdown-item-label">
              My Preferences
            </span>
          </li>
        </template>
        <li @click="logout()" class="account__dropdown-item">
          <div class="account__dropdown-icon">
            <MyProfile />
          </div>
          <span class="account__dropdown-item-label">
           Logout
            <v-icon
              v-if="isLoading"
              name="spinner"
              spin
              class="ml-2"
            />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { AuthApi } from '../mixins/api';
import ProfileMaker from '../views/components/ProfileMaker';
import MyProfile from '../assets/svg/my-profile-nav.svg';
import MyPreferences from '../assets/svg/my-preferences-nav.svg';
import DownArrow from '../assets/svg/down-arrow.svg';

export default {
  name: 'TheHeaderDropdownAccnt',
  components: {
    ProfileMaker,
    MyProfile,
    MyPreferences,
    DownArrow
  },
  mixins: [AuthApi],
  data () {
    return {
      src: null,
      isLoading: false,
    }
  },
  computed: {
    fullName() {
      return this.user && (this.user.fullName || `${this.user.firstName} ${this.user.lastName}`).trim();
    },
    userPhoto() {
      const path = this.user && this.user.photo && this.user.photo.hashName || '';
      return path ? `${process.env.VUE_APP_PUBLIC_PHOTO_URL}${path}` : '';
    },
    user() {
      return this.$store.state.user || {};
    },
  },
  methods: {
    logout(){
      if(localStorage.accessToken) {
        localStorage.clear();
        this.isLoading = true;
        this.revokeAuthentication().then(() => {
          this.$store.commit('LOGOUT_USER');
          setTimeout(() => {
            this.$store.commit('SET_USER', {});
            this.isLoading = false;
            this.$router.push({ name: 'Login' });
          }, 500)
        }).catch(err => {
          console.log(err);
          this.isLoading = false;
        });
      }
    },
    loadAvatar(){
      return localStorage.getItem('studentPhotoUrl')
    },
  }
}
</script>

<style lang="scss" scoped>
 @import "../assets/scss/shared.scss";

  .c-icon {
    margin-right: 0.3rem;
  }

  .account__profile {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: auto;
    min-width: 170px;
    height: 100%;
    margin-right: 25px;
    position: relative;

    &:hover {
      cursor: pointer;
      .account__dropdown-actions {
        display: block;
      }
    }
  }

  .account__photo-circle {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    overflow: hidden;
  }

  .account__name {
    margin: 0;
    font-size: 14px;
    line-height: 16px;
    font-weight: 600;
  }

  .account__type {
    margin: 0;
    font-size: 12px;
    line-height: 16px;
    color: $dark-gray-100;
  }

  .account__details {
    padding: 0 12px;
    text-align: left;
    margin-right: 5px;
  }

  .account__dropdown-actions {
    display: none;
    position: absolute;
    top: 48px;
    left: -15px;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(145,145,145,1);
    -moz-box-shadow: 0px 0px 5px 0px rgba(145,145,145,1);
    box-shadow: 0px 0px 5px 0px rgba(145,145,145,1);
    border-radius: 3px;
    background-color: $white;
  }

  .account__dropdown-action-items {
    list-style: none;
    padding: 12px 8px;
    background-color: $white;
    width: 200px;
    margin: 0;
    border-radius: 3px;
  }

  .account__dropdown-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
  }

  .account__dropdown-icon {
    height: 18px;
    width: 18px;
    margin-top: -11px;
    padding: 0;

    svg {
      height: 100%;
      width: auto;
      margin: 0;
    }
  }

  .account__dropdown-item-label {
    margin-left: 15px;
    font-size: 14px;

    &:hover {
      font-weight: 500;
    }
  }

  .triangle-top {
    position: absolute;
    top: -9px;
    left: 17px;
    width: 0;
    height: 0;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent #FFFFFF transparent;
    border-style: solid;
    filter: drop-shadow(0px -2px 1px rgba(163, 163, 163, 0.19));
  }

  .account__intro {
    padding: 10px 15px;
    margin-top: 15px;

    img {
      height: 100%;
      width: auto;
    }
  }

  .account__intro-title {
    font-size: 13px;
    font-weight: 500;
    padding: 0 3px 3px 3px;
  }

  .account__icon-down {
    margin-left: auto;
    width: 12px;

    svg {
      height: auto;
      width: 100%;
    }
  }
</style>