<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {}
  }
}
</script>

<style lang='scss' scoped>
.tab-bar {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;

  display: flex;

  height: 49px;
  background-color: #f6f6f6;
}
</style>
