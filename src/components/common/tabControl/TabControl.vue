<template>
  <div class="tab-control">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {}
  }
}
</script>

<style lang='scss' scoped>
.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
}
</style>
