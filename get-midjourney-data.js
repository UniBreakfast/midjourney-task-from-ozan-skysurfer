module.exports = { getImageDescriptors }

async function getImageDescriptors() {
  const links = generateLinks()
  const arraysOfItems = []

  for (const link of links) {
    const items = await getDataFrom(link).catch(err => console.error(err))

    if (items) {
      arraysOfItems.push(items)

      console.log(`Got ${items.length} items from ${link}`)
    }

    await sleep(delay)
  }

  return arraysOfItems.flat().map(formBySchema)
}

const { generateLinks } = require('./generate-links.js')
const { formBySchema } = require('./form-by-schema.js')
const { getDataFrom } = require('./get-data-from.js')
const { delay } = require('./delay.js')
const { sleep } = require('./sleep.js')
