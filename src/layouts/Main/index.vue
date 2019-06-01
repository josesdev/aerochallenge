<template>
  <a-layout
    :class="{
      'settings__borderLess': true,
      'settings__menuShadow': true,
    }">
    <a-layout>
      <a-layout-header>
        <cui-topbar :settings="settings"/>
      </a-layout-header>
      <a-layout-content>
        <div class="utils__content">
          <router-view/>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapState } from 'vuex'
import CuiTopbar from '@/components/Topbar'

export default {
  name: 'MainLayout',
  components: { CuiTopbar },
  computed: mapState(['settings']),
  mounted() {
    this.detectViewPort(true)
    window.addEventListener('resize', this.detectViewPortListener)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.detectViewPortListener)
  },
  methods: {
    toggleMobileMenu() {
      const value = !this.settings['isMobileMenuOpen']
      this.$store.commit('CHANGE_SETTING', { setting: 'isMobileMenuOpen', value })
    },
    onCollapse: function (collapsed, type) {
      const value = !this.settings['isMenuCollapsed']
      this.$store.commit('CHANGE_SETTING', { setting: 'isMenuCollapsed', value })
    },
    changeSetting: function (setting, value) {
      this.$store.commit('CHANGE_SETTING', { setting, value })
    },
    setViewPort: function (isMobileView = false, isTabletView = false) {
      this.$store.commit('CHANGE_SETTING', { setting: 'isMobileView', value: isMobileView })
      this.$store.commit('CHANGE_SETTING', { setting: 'isTabletView', value: isTabletView })
    },
    detectViewPortListener: function () {
      this.detectViewPort(false)
    },
    detectViewPort: function (firstLoad = false) {
      const isMobile = this.settings['isMobileView']
      const isTablet = this.settings['isTabletView']
      const width = window.innerWidth
      const state = {
        next: {
          mobile: width < 768,
          tablet: width < 992,
          desktop: !(width < 768) && !(width < 992),
        },
        prev: {
          mobile: isMobile,
          tablet: isTablet,
          desktop: !(isMobile) && !(isTablet),
        },
      }
      // desktop
      if (state.next.desktop && ((state.next.desktop !== state.prev.desktop) || firstLoad)) {
        this.setViewPort(false, false)
      }
      // tablet & collapse menu
      if (state.next.tablet && !state.next.mobile && ((state.next.tablet !== state.prev.tablet) || firstLoad)) {
        this.setViewPort(false, true)
        this.$store.commit('CHANGE_SETTING', { setting: 'isMenuCollapsed', value: true })
      }
      // mobile
      if (state.next.mobile && ((state.next.mobile !== state.prev.mobile) || firstLoad)) {
        this.setViewPort(true, false)
      }
    },
  },
}
</script>

<style lang="scss" module>
@import "./style.module.scss";
</style>
