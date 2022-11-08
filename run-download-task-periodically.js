const { downloadTask } = require('./download-new-images.js')

let interval

// interval = 1000 * 60 * 60 * 24 * 7 // 1 week
// interval = 1000 * 60 * 60 * 24 // 1 day
interval = 1000 * 60 * 60 * 2// 2 hours

run(downloadTask, interval)

function run(fn, interval) {
  fn()

  setInterval(fn, interval)
}
