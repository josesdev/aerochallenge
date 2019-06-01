<template>
    <div :class="$style.productCard">
      <div :class="$style.img">
        <a href="javascript: void(0);">
          <img :src="product.img.url">
        </a>
        <div :class="$style.cart" @click.prevent="addToBag(product._id)" title="Add product to bag">
          <i class="fa fa-shopping-bag"></i>
        </div>
      </div>
      <div class="pull-left">
        <div :class="$style.descr">
          {{product.category}}
        </div>
        <div :class="$style.title">
          <a href="javascript: void(0);" :title="product.name">{{product.name}}</a>
        </div>
      </div>
      <div :class="$style.containerPrice">
        <coin :class="$style.coin"></coin>
        <span :class="$style.price" :title="product.cost + ' points needed to redeem'">
          {{product.cost}}
        </span>
      </div>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import Coin from '@/assets/icons/coin.svg'

export default {
  name: 'Products',
  components: {
    Coin,
  },
  props: {
    product: Object,
  },
  computed: {
    ...mapFields([
      'productsBag',
    ]),
  },
  data() {
    return {
    }
  },
  methods: {
    addToBag(_id) {
      let product = this.$store.getters.getProductById(_id)
      this.productsBag.push(product)
      this.$swal({
        type: 'success',
        title: 'Oh yeah',
        html: `You added the ${product.name} to your bag.<br /> Please check it and redeem whenever you want`,
      })
    },
  },
}
</script>

<style lang="scss" module>
@import "./style.module.scss";
</style>
