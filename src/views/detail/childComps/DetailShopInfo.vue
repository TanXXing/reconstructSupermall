<template>
  <div class="shop-info">
    <header class="info-top">
      <img class="shop-logo" :src="shopInfo.shopLogo" alt="" />
      <span class="shop-name">{{ shopInfo.name }}</span>
    </header>
    <main class="info-center">
      <div class="left-center">
        <div class="info-cSells">
          <div class="sell-count">{{ shopInfo.cSells | sellCountFilter }}</div>
          <div class="sell-text">总销量</div>
        </div>
        <div class="info-goods-count">
          <div class="goods-count">{{ shopInfo.cGoods }}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="right-center">
        <table class="info-evaluation">
          <tr v-for="item in shopInfo.score">
            <td>{{ item.name }}</td>
            <td class="evalution-score" :class="{ goodscore: item.isBetter }">
              {{ item.score }}
            </td>
            <td class="evaluation-rank" :class="{ goodrank: item.isBetter }">
              {{ item.isBetter ? '高' : '低' }}
            </td>
          </tr>
        </table>
      </div>
    </main>
    <div class="info-bottom">
      <div class="enterShop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  filters: {
    sellCountFilter(sell) {
      return sell > 10000 ? (sell / 10000).toFixed(1) + '万' : sell
    }
  }
}
</script>

<style lang='scss' scoped>
.shop-info {
  padding: 25px 8px;
  border-bottom: 5px solid #f2f5f8;
  .info-top {
    display: flex;
    align-items: center;
    .shop-logo {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .shop-name {
      font-size: 16px;
    }
  }

  .info-center {
    display: flex;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    .left-center {
      flex: 1;
      display: flex;
      height: 46px;
      justify-content: space-evenly;
      align-items: center;
      border-right: 1px solid rgba(0, 0, 0, 0.1);
      .sell-count,
      .goods-count {
        font-size: 18px;
      }

      .sell-text,
      .goods-text {
        font-size: 12px;
      }
      .info-cSells {
        text-align: center;
        .sell-count {
          margin-bottom: 10px;
        }
      }
      .info-goods-count {
        text-align: center;
        .goods-count {
          margin-bottom: 10px;
        }
      }
    }
    .right-center {
      flex: 1;
      display: flex;
      justify-content: center;
      .info-evaluation {
        border-collapse: separate;
        border-spacing: 11px;
        font-size: 13px;
        tr {
          .evaluation-rank {
            color: #fff;
            background-color: #5ea732;
          }
          .evalution-score {
            color: #5ea732;
          }
          .goodrank {
            background-color: #f13e3a;
          }
          .goodscore {
            color: #f13e3a;
          }
        }
      }
    }
  }

  .info-bottom {
    width: 150px;
    margin: 10px auto 0px;
    border-radius: 20px;
    background-color: #f2f5f8;
    .enterShop {
      line-height: 30px;
      height: 30px;
      text-align: center;
    }
  }
}
</style>
