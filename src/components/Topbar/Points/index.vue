<template>
  <div>
    <coin :class="$style.coin"></coin>
    <span :class="$style.points">
       {{ points }}
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Coin from '@/assets/icons/coin.svg'

export default {
  name: 'points',
  components: {
    Coin,
  },
  computed: {
    ...mapGetters(['user']),
    points () {
      return this.user ? this.user.points : 0
    },
  },
  data: function () {
    return {
      count: 0,
    }
  },
}
</script>

<style lang="scss" module>
@import "./style.module.scss";
</style>
