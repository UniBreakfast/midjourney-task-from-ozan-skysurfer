const { downloadTask } = require('./download-new-images.js')

let interval

// interval = 1000 * 60 * 60 * 24 * 7 // 1 week
// interval = 1000 * 60 * 60 * 24 // 1 day
interval = 1000 * 60 * 60 * 2// 2 hours

run(downloadTask, interval)
markTime()
setInterval(markTime, 15 * 1000 * 60) // tell time every 15 minutes

function run(fn, interval) {
  fn()

  setInterval(fn, interval)
}

function markTime() {
  const now = new Date()

  console.log(`\x1b[36m${now.getHours()}:${now.getMinutes()}\x1b[0m`)
}
