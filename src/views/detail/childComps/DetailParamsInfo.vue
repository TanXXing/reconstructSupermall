<template>
  <div class="detail-params-info">
    <div class="info-size">
      <table class="size-table">
        <tr class="size-row" v-for="row in goodsParams.size">
          <td class="size-col" v-for="col in row">{{ col }}</td>
        </tr>
      </table>
    </div>
    <div class="info-product">
      <table class="product-talbe">
        <tr class="product-row" v-for="row in goodsParams.product">
          <td class="product-col col-withoutTint">{{ row.key }}</td>
          <td class="product-col col-tint">{{ row.value }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailParamsInfo',
  props: {
    goodsParams: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang='scss' scoped>
.detail-params-info {
  padding: 20px 15px;
  border-bottom: 5px solid #f2f5f8;
  font-size: 14px;
  color: #666;
  table {
    width: 100%;
    border-collapse: collapse;
    tr {
      height: 40px;
    }
  }
  .product-col,
  .size-col {
    border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  }
  .info-size {
    .size-table {
      border-bottom: 2px solid rgba(100, 100, 100, 0.1);
    }
  }
  .info-product {
    .product-talbe {
      .col-withoutTint {
        width: 60px;
        // 这里不能使用padding-right
        // padding-right: 20px;
      }
      .col-tint {
        color: #eb4868;
      }
    }
  }
}
</style>
