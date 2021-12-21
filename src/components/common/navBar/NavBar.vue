<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {}
  }
}
</script>

<style lang='scss' scoped>
$width: 60px;
.nav-bar {
  display: flex;
  // height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: var(--color-tint);
  .left,
  .right {
    width: $width;
  }
  .center {
    flex: 1;
    color: #fff;
  }
}
</style>
