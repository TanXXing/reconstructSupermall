<template>
  <div class="check-button" :class="{ checked: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.checked {
  background-color: var(--color-tint);
  border: 1px solid var(--color-tint) !important;
}
</style>
