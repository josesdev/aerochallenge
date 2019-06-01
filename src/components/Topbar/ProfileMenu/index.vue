<template>
  <a-dropdown :trigger="['click']" placement="bottomLeft">
    <div :class="$style.dropdown">
      <a-avatar shape="square" icon="user" size="large" :class="$style.avatar"/>
    </div>
    <a-menu slot="overlay">
      <a-menu-item>
        <div>
          <strong>Hello {{ name }}</strong>
        </div>
      </a-menu-item>
      <a-menu-divider/>
      <a-menu-item>
        <a href="javascript: void(0);" @click="incrementPoints(1000)">
          <i :class="$style.menuIcon" class="icmn-coin-dollar"></i> Increment 1000 points
        </a>
      </a-menu-item>
      <a-menu-item>
        <a href="javascript: void(0);" @click="incrementPoints(7500)">
          <i :class="$style.menuIcon" class="icmn-coin-dollar"></i> Increment 7500 points
        </a>
      </a-menu-item>
      <a-menu-divider/>
      <a-menu-item>
        <a href="javascript: void(0);">
          <i :class="$style.menuIcon" class="icmn-user"></i> Edit Profile
        </a>
      </a-menu-item>
      <a-menu-item>
        <a href="javascript: void(0);">
          <i :class="$style.menuIcon" class="icmn-exit"></i> Logout
        </a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import UserService from '@/services/user.service'
import { mapGetters } from 'vuex'

export default {
  data: function () {
    return {
    }
  },
  created() {
    this.loadUser()
  },
  computed: {
    ...mapGetters(['user']),
    name () {
      return this.user ? this.user.name : ''
    },
  },
  methods: {
    loadUser() {
      UserService.fetchUser()
        .then(res => {
          let user = res.data
          this.$store.commit('UPDATE_USER', user)
        })
        .catch(() => {
          alert('There was an error. Please try again')
        })
    },
    incrementPoints(amount) {
      UserService.incrementPoints({ amount })
        .then(() => {
          this.$store.commit('UPDATE_USER_POINTS', amount)
        })
        .catch(() => {
          alert('There was an error updating your points')
        })
    },
  },
}
</script>

<style lang="scss" module>
@import "./style.module.scss";
</style>
