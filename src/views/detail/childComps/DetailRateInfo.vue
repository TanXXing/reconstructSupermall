<template>
  <div class="detail-rate-info" v-if="rateInfo.length">
    <div class="rate-item" v-for="item in rateInfo">
      <header class="info-top">
        <span>用户评价</span>
        <span>更多</span>
      </header>
      <main class="info-center">
        <div class="info-user">
          <img :src="item.user.avatar" alt="" />
          <span>{{ item.user.uname }}</span>
        </div>
        <div class="info-content">{{ item.content }}</div>
        <div class="info-other">
          <div class="date-and-style">
            <span class="date">{{ item.created }}</span>
            <span class="style">{{ item.style }}</span>
          </div>
          <div class="images">
            <img :src="img" alt="" v-for="img in item.images" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailRateInfo',
  props: {
    rateInfo: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang='scss' scoped>
.detail-rate-info {
  padding: 5px 12px 20px 12px;
  color: #333;
  .rate-item {
    .info-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      border-bottom: 1px solid #e5e5e5;
      span:nth-child(1) {
        font-size: 15px;
      }
      span:nth-child(2) {
        font-size: 13px;
      }
    }

    .info-center {
      padding: 10px 0px 5px 0px;
      .info-user {
        display: flex;
        align-items: center;
        img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
        }
        span {
          margin-left: 10px;
          font-size: 15px;
        }
      }
      .info-content {
        padding: 5px 0px;
        font-size: 14px;
        line-height: 1.5;
        color: #777;
      }
    }

    .info-other {
      font-size: 12px;
      color: #999;
      .date-and-style {
        padding: 6px 0px;
        .date {
          margin-right: 10px;
        }
      }
      .images {
        display: flex;
        img {
          width: 70px;
          height: 70px;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
