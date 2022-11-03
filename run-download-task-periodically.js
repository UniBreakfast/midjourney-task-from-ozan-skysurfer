const { downloadTask } = require('./download-new-images.js')

run(downloadTask, 10 * 1000)

function run(fn, interval) {
  fn()

  setInterval(fn, interval)
}
