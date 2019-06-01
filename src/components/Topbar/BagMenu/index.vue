<template>
  <a-dropdown :trigger="['click']" placement="bottomLeft">
    <div :class="$style.dropdown">
      <a-badge :count="count" :class="$style.badge">
        <i class="fa fa-shopping-bag" title="Bag"></i>
      </a-badge>
    </div>
    <a-menu slot="overlay" :class="$style.activity">
      <product-list :products="productsBag" :bag="true" @removeProduct="this.removeProduct" @redeemAll="this.redeemAll"></product-list>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import ProductList from '@/components/Topbar/BagMenu/product'
import ProductService from '@/services/products.service'
import UserService from '@/services/user.service'

export default {
  name: 'bag',
  components: {
    ProductList,
  },
  computed: {
    ...mapGetters(['user']),
    ...mapFields([
      'productsBag',
    ]),
    count () {
      return this.productsBag.length
    },
  },
  data: function () {
    return {
    }
  },
  methods: {
    removeProduct(product) {
      return new Promise(resolve => {
        let productIndex = this.$store.getters.getProductIndexById(product)
        this.productsBag.splice(productIndex, 1)
        resolve()
      })
    },
    redeemAll() {
      let amount = this.productsBag.map(item => item.cost).reduce((total, cost) => total + cost, 0)

      if (amount > this.user.points) {
        let diff = amount - this.user.points
        this.$swal({
          type: 'error',
          title: 'Oops...',
          html: `You don't have enough points to redeem all these products.<br />
                 You only need <b>${diff} points</b> more!`,
        })
      } else {
        this.productsBag.forEach((product, index) => {
          let redeemError = false
          ProductService.redeem(product._id)
            .then(() => {
              this.removeProduct(product).then(() => {
                if (this.productsBag.length === 0) {
                  UserService.fetchUser()
                    .then(res => {
                      let user = res.data
                      this.$store.commit('UPDATE_USER', user)
                    })
                  if (!redeemError) {
                    this.$swal({
                      type: 'success',
                      title: 'Oh yeah',
                      html: `All products were successfully redeemed.<br />Enjoy!`,
                    })
                  } else {
                    this.$swal({
                      type: 'success',
                      title: 'Oh yeah',
                      html: `You redeemed some products successfully nevertheless others could not be redeemed.<br />
                         Please review your bag and try again`,
                    })
                  }
                }
              })
            })
            .catch(() => {
              redeemError = true
            })
        })
      }
    },
  },
}
</script>

<style lang="scss" module>
@import "./style.module.scss";
</style>
