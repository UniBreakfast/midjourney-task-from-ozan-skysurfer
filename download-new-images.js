module.exports = { downloadTask: downloadNewImages }

async function downloadNewImages() {
  console.count("Let's download new images")

  const notDownloaded = await getNotDonwloaded()

  console.log(`Found ${notDownloaded.length} previously known images to download`)

  const newImageDescriptors = await getDescriptorsForNewImages()

  console.log('Found %d new images. Going to download', newImageDescriptors.length)

  await addToDB(...newImageDescriptors)

  console.log('There are %d images in the database now', await countImages())

  const toBeDownloaded = [...notDownloaded, ...newImageDescriptors]

  console.log('Going to download %d images', toBeDownloaded.length)

  for (let i = 0; i < toBeDownloaded.length; i++) {
    const imgDesc = toBeDownloaded[i]

    await sleep(delay)

    if (await downloadImage(imgDesc).catch(() => {})) {
      await markAsDownloaded(imgDesc)

      console.log('%d. Downloaded %s by %s', i + 1, imgDesc.id, imgDesc.author)
    } else {
      console.log('%d. Failed to download %s by %s', i + 1, imgDesc.id, imgDesc.author)
    }
  }

  console.log('Done. Waiting for next run...')
}

const { getDescriptorsForNewImages } = require('./get-new-descriptors.js')
const { addToDB, countImages, markAsDownloaded, getNotDonwloaded } = require('./image-db.js')
const { downloadImage } = require('./download-image.js')
const { delay } = require('./delay.js')
const { sleep } = require('./sleep.js')
