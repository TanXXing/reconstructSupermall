<template>
  <nav-bar>
    <span slot="center">购物车({{ getCartLength }})</span>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navBar/NavBar.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'CartNavBar',
  components: {
    NavBar
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['getCartLength'])
  }
}
</script>
<style lang="scss" scoped></style>
