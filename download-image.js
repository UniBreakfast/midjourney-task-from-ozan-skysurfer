module.exports = { downloadImage }

async function downloadImage({ id, url, author, prompt }, tries = 3) {
  const imageFileExt = url.split('.').pop()
  const imageFileName = `${id}.${imageFileExt}`
  const imageFolder = `images/${getYearWeek()}`

  await mkdir(imageFolder, { recursive: true })

  return new Promise((resolve, reject) => {
    get(url, async response => {
      response.pipe(createWriteStream(`${imageFolder}/${imageFileName}`))
      response.on('end', () => resolve(true))
      response.on('error', async () => {
        if (tries) {
          console.log('Failed to download %s. Retrying...', url)

          try {
            await sleep(delay)
            resolve(await downloadImage({ id, url, author, prompt }, tries - 1))
          } catch {
            reject()
          }
        }
        else reject()
      })
    }).on('error', async () => {
      if (tries) {
        console.log('Failed to download %s. Retrying...', url)

        try {
          await sleep(delay)
          resolve(await downloadImage({ id, url, author, prompt }, tries - 1))
        } catch {
          reject()
        }
      }
      else reject()
    })
  })
}

const { get } = require('https')
const { createWriteStream, promises: { mkdir } } = require('fs')

function getYearWeek() {
  const now = new Date()
  const year = now.getFullYear()
  const start = new Date(year, 0, 1)
  const days = (now - start) / 86400000

  return `${year} week ${Math.ceil(days / 7)}`
}
