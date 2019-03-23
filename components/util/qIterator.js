
const abort = (err) => {
  if (console && console.log) {
    console.log(err)
  } else {
    throw new Error(err)
  }
}
export const runQueue = (queue, fn, cb) => {
  let step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}
const iterator = (hook, next) => {
  try {
    hook(function () {
      next()
    })
  } catch (e) {
    abort(e)
  }
}

export const queueIterator = (queue, cb) => {
  runQueue(queue, iterator, cb)
}

// // example
// let test1 = (next) => {
//   console.log('first')
//   next()
// }

// let test2 = (next) => {
//   console.log('second')
//   // next()
// }

// // 如需要注入额外的参数进行修改，使用高阶函数方法
// let testExtorArg = (val) => {
//   return function (next) {
//     console.log(val)
//     setTimeout(function () {
//       next()
//     }, 2000)
//   }
// }

// let test3 = testExtorArg('i want opera other args')
// // let arr = [test1, test2]
// let arr = [test1, test3]
// queueIterator(arr, function () {
//   console.log('finished')
// })
