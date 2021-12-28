// 封装的debounce函数
export function debounce(func, timeDelay = 500) {
  // 定义一个变量，这个变量在闭包中类似于全局变量的作用
  let timerId = null
  return function (...args) {
    // 验证未使用防抖策略时，事件触发的次数
    //console.log('未使用防抖时，图片加载后触发事件的次数');
    if (timerId) clearTimeout(timerId)

    timerId = setTimeout(() => {
      func.call(this, ...args)
      // 验证使用防抖策略后，refresh的次数
      // console.log('图片加载的实际次数');
    }, timeDelay)
  }
}

