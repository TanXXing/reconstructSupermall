<template>
  <div class="goods-item">
    <img :src="goodsItem.showLarge.img" alt="" @load="imageLoad" />
    <!-- 这里使用了一个div就可以把图片和后面的内容分开 -->
    <div class="goods-info">
      <!-- 这里再使用一个p标签就把p和后面的内容分开了，并保证不在同一行的问题 -->
      <p class="title">{{ goodsItem.title }}</p>
      <span class="price">¥{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    imageLoad() {
      this.$bus.$emit('goodsItemImgLoading')
      // console.log('发出事件了吗？')
    }
  }
}
</script>

<style lang='scss' scoped>
.goods-item {
  width: 174px;
  height: 306px;
  font-size: 12px;
  img {
    width: 174px;
    height: 261px;
  }

  .goods-info {
    margin-top: 5px;
    text-align: center;
    .title {
      // 不换行，单行显示
      white-space: nowrap;
      // 超出部分要隐藏
      overflow: hidden;
      // 文字超出的部分以什么方式显示
      text-overflow: ellipsis;

      margin-bottom: 3px;
    }
    span:nth-of-type(1) {
      padding-right: 20px;
      color: var(--color-high-text);
    }

    .collect {
      position: relative;
      &::before {
        content: '';
        // 使用背景图片的话，先需要一个指定大小的框
        width: 14px;
        height: 14px;

        position: absolute;
        // 将这个伪元素向左移动
        left: -15px;
        top: -1.5px;
        // 然后，把背景图片往里面添加
        // background: url('~assets/img/common/collect.svg') 0 0/14px 14px;

        background-image: url('~assets/img/common/collect.svg');
        background-size: 14px 14px;
        background-position: 0px 0px;
      }
    }
  }
}
</style>
