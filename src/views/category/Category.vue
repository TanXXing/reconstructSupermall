<template>
  <div>
    <scroll class="scroll">
      <button @click="btnClick">请点击我</button>
      <p>我是p</p>
      <p>我是p</p>
      <p>我是p</p>
      <p>我是p</p>
      <p>我是p</p>
      <div @click="divClick">我是div</div>
      <ul>
        <li>消息1</li>
        <li>消息2</li>
        <li>消息3</li>
        <li>消息4</li>
        <li>消息5</li>
        <li>消息6</li>
        <li>消息7</li>
        <li>消息8</li>
        <li>消息9</li>
        <li>消息10</li>
        <li>消息11</li>
        <li>消息12</li>
        <li>消息13</li>
        <li>消息14</li>
        <li>消息15</li>
        <li>消息16</li>
        <li>消息17</li>
        <li>消息18</li>
        <li>消息19</li>
        <li>消息20</li>
        <li>消息21</li>
        <li>消息22</li>
        <li>消息23</li>
        <li>消息24</li>
        <li>消息25</li>
        <li>消息26</li>
        <li>消息27</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'

export default {
  name: 'Category',
  components: {
    Scroll
  },
  data() {
    return {}
  },
  created() {
    console.log('Category.vue组件被创建')
  },
  destroyed() {
    console.log('Category.vue组件被销毁')
  },
  methods: {
    btnClick() {
      console.log('btn被点击了')
    },
    divClick() {
      console.log('div被点击了')
    }
  }
}
</script>

<style lang='scss' scoped>
div {
  background-color: pink;
  .scroll {
    height: 100px;
    div {
      width: 20px;
      height: 20px;
      background-color: blue;
    }
  }
}
</style>
