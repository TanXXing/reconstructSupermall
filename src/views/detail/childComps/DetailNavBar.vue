<template>
  <nav-bar class="detail-nav-bar">
    <img
      src="~assets/img/common/back.svg"
      alt=""
      slot="left"
      @click="backClick"
    />
    <div slot="center" class="center">
      <span
        v-for="(item, index) in centerItem"
        :class="{ activate: currentIndex === index }"
        @click="titleClick(index)"
      >
        {{ item }}
      </span>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navBar/NavBar.vue'
export default {
  name: 'DetailNavBar',
  props: {
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  components: {
    NavBar
  },
  data() {
    return {
      centerItem: ['商品', '参数', '评论', '推荐']
    }
  },
  methods: {
    backClick() {
      // console.log('backClick')
      this.$router.go(-1)
    },
    titleClick(index) {
      this.$emit('titleClick', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-nav-bar {
  background-color: #fff;
  img {
    vertical-align: middle;
  }
  .center {
    display: flex;
    span {
      flex: 1;
      font-size: 14px;
      color: #666;
    }

    .activate {
      color: var(--color-high-text);
    }
  }
}
</style>
