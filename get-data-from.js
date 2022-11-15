module.exports = { getDataFrom }

async function getDataFrom(link, tries = 3) {
  return new Promise((resolve, reject) => {
    get(link, async response => {
      try {
        const json = await getBody(response)
        const data = JSON.parse(json)

        if (Array.isArray(data))  resolve(data)

        retryOrReject()
      } catch {
        retryOrReject()
      }
    }).on('error', retryOrReject)

    async function retryOrReject() {
      if (tries) {
        console.log('Failed to get data from %s\nRetrying...', link)

        try {
          await sleep(delay)
          resolve(await getDataFrom(link, tries - 1))
        } catch {
          reject()
        }
      }
      else reject()
    }
  })
}

const { get } = require('https')
const { getBody } = require('./get-body.js')
const { delay } = require('./delay.js')
const { sleep } = require('./sleep.js')
