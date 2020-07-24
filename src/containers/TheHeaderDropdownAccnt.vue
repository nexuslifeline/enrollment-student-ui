<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <b-avatar 
            :text="'N'"
            :src="loadAvatar()" />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader
      tag="div"
      class="text-center"
      color="light"
    >
      <strong>Account</strong>
    </CDropdownHeader>
    <CDropdownItem @click="logout()">
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import { AuthApi } from '../mixins/api';
export default {
  name: 'TheHeaderDropdownAccnt',
  mixins: [AuthApi],
  data () {
    return {
      itemsCount: 42,
      src: null
    }
  },
  methods: {
    logout(){
      if(localStorage.accessToken) {
        localStorage.clear();
        this.revokeAuthentication().then(response => {
          this.$store.commit('LOGOUT_USER')
          this.$store.commit('SET_USER', {})
          setTimeout(() =>
            this.$router.push({ name: 'Login' })
          , 500)
        }).catch(err => {
          console.log(err)
        });
      }
    },
    loadAvatar(){
      return localStorage.getItem('studentPhotoUrl')
    }
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>