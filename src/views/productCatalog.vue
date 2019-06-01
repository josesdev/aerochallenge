<template>
  <div class="card">
    <div class="card-header">
      <div class="utils__title">
        <h2 class="pt-2 mb-4 pull-left">Products Catalog</h2>
        <div class="pull-right mb-4">
          <a-radio-group defaultValue="a" size="large">
            <a-radio-button value="a" @click="sortProductsByCost('none')">Most Recent</a-radio-button>
            <a-radio-button value="b" @click="sortProductsByCost('asc')">Lowest price</a-radio-button>
            <a-radio-button value="c" @click="sortProductsByCost('desc')">Highest price</a-radio-button>
          </a-radio-group>
        </div>
        <div class="pull-left width-200" v-if="settings.isMobileView">
          <search/>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="productsCatalog">
        <div class="row">
          <div class="col-xl-3 col-lg-6 col-md-12" v-for="product in filteredProducts" :key="product._id">
            <product-list :product="product"></product-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from '@/components/Products/Products'
import ProductsService from '@/services/products.service'
import Search from '@/components/Topbar/Search'
import { mapFields } from 'vuex-map-fields'
import _ from 'lodash'

export default {
  name: 'productCatalog',
  components: {
    ProductList,
    Search,
  },
  data() {
    return {
      productsOrdered: [],
    }
  },
  computed: {
    ...mapFields([
      'products',
      'searchText',
      'settings',
    ]),
    filteredProducts () {
      return this.productsOrdered.filter(product => {
        return product.name.toLowerCase().includes(this.searchText.toLowerCase())
      })
    },
  },
  methods: {
    loadProducts() {
      ProductsService.fetchProducts()
        .then(res => {
          this.products = res.data
          this.productsOrdered = res.data
        })
        .catch(() => {
          alert('There was an error. Please try again')
        })
    },
    sortProductsByCost(order) {
      if (order === 'none') {
        this.productsOrdered = this.products
      } else {
        this.productsOrdered = _.orderBy(this.productsOrdered, 'cost', order)
      }
    },
  },
  mounted() {
    this.loadProducts()
  },
}
</script>

<style scoped>

</style>
