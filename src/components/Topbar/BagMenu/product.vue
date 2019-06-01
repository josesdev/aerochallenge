<template>
  <div>
    <a-menu-item :class="$style.item" v-for="(product, index) in products" :key="index">
      <a-icon :type="iconCategory(product.category)" theme="twoTone" :class="$style.icon" :title="product.category" />
      <div :class="$style.inner">
        <div :class="$style.title" class="clearfix">
          <div class="pull-right pt-1" style="position: relative;">
            <a-tooltip placement="top">
              <template slot="title">
                <span>Remove</span>
              </template>
              <a href="javascript: void(0);" @click="$emit('removeProduct', product)" v-if="bag">
                <i class="icmn-cross" ></i>
              </a>
            </a-tooltip>
          </div>
          <a href="javascript: void(0);">
            <span class="mt-1 badge badge-warning pull-left">{{ product.cost }}</span>
            <span class="ml-2 mt-1 pull-left">{{ product.name }}</span>
          </a>
        </div>
      </div>
    </a-menu-item>
    <a-menu-item :class="$style.item" v-if="bag">
      <div :class="$style.inner">
        <div :class="$style.title">
          <a href="javascript: void(0);" class="btn btn-success" @click="$emit('redeemAll')">Redeem all products</a>
        </div>
      </div>
    </a-menu-item>
  </div>
</template>

<script>

export default {
  name: 'bag',
  props: {
    products: Array,
    bag: {
      default: false,
      type: Boolean,
    },
  },
  data: function () {
    return {
    }
  },
  methods: {
    iconCategory(category) {
      let icon = 'icmn-star-full'
      switch (category) {
        case 'Indumentaria':
          icon = 'skin'
          break
        case 'Gaming':
          icon = 'car'
          break
        case 'Phones':
          icon = 'mobile'
          break
        case 'Laptops':
          icon = 'usb'
          break
        case 'Tablets & E-readers':
          icon = 'tablet'
          break
        case 'Cameras':
          icon = 'camera'
          break
        case 'Audio':
          icon = 'customer-service'
          break
        case 'Monitors & TV':
          icon = 'fund'
          break
        case 'Drones':
          icon = 'rocket'
          break
        case 'PC Accessories':
          icon = 'save'
          break
        case 'Phone Accessories':
          icon = 'phone'
          break
        case 'Smart Home':
          icon = 'home'
          break
      }
      return icon
    },
  },
}
</script>

<style lang="scss" module>
@import "./style.module.scss";
</style>
