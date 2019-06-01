<template>
  <a-dropdown :trigger="['click']" placement="bottomLeft">
    <div :class="$style.dropdown">
      <i class="fa fa-history" title="Redeem History"></i>
    </div>
    <a-menu slot="overlay" :class="$style.activity">
      <product-list :products="productsRedeem"></product-list>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductList from '@/components/Topbar/BagMenu/product'

export default {
  name: 'bag',
  components: {
    ProductList,
  },
  computed: {
    ...mapGetters(['user']),
    productsRedeem () {
      return this.user ? this.user.redeemHistory : []
    },
  },
  data: function () {
    return {
    }
  },
  methods: {
  },
}
</script>

<style lang="scss" module>
@import "./style.module.scss";
</style>
