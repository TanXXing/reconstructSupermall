<template>
  <div class="tab-control-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabControlItem',
  data() {
    return {}
  }
}
</script>

<style lang='scss' scoped>
.tab-control-item {
  flex: 1;
  text-align: center;
}
</style>
