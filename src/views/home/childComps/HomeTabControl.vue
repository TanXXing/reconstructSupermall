<template>
  <tab-control class="tab-control">
    <tab-control-item
      class="tab-control-item"
      v-for="(item, index) in tabList"
      @click.native="tabItemClick(index)"
    >
      <span :class="{ active: currentIndex === index }">{{ item }}</span>
    </tab-control-item>
  </tab-control>
</template>

<script>
import { TabControl, TabControlItem } from 'components/common/tabControl/index'
export default {
  name: 'HomeTabControl',
  props: {
    tabList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    TabControl,
    TabControlItem
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    tabItemClick(index) {
      this.currentIndex = index

      // 向Home.vue传递数据
      this.$emit('tabItemClick', index)
    }
  }
}
</script>

<style lang='scss' scoped>
.tab-control {
  .tab-control-item {
    span {
      padding-bottom: 3px;
    }
  }

  .active {
    border-bottom: 3px solid var(--color-high-text);
  }
}
</style>
