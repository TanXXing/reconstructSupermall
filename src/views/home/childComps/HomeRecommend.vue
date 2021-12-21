<template>
  <div class="home-recommend">
    <div v-for="item in recommed" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <p>{{ item.title }}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    recommed: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang='scss' scoped>
$width: 75px;
.home-recommend {
  display: flex;
  font-size: 12px;
  border-bottom: 10px #eee solid;
  .recommend-item {
    flex: 1;
    text-align: center;
    padding: 10px 0px 20px;
    img {
      width: $width;
      height: $width;
    }
    p {
      margin-top: 10px;
    }
  }
}
</style>
