module.exports = { getDescriptorsForNewImages }

async function getDescriptorsForNewImages() {
  const descriptors = await getImageDescriptors()
  const db = await readDB()
  const knownIds = db.map(({id}) => id)
  const newDescriptors = descriptors.filter(desc => !knownIds.includes(desc.id))

  return uniqualize(newDescriptors)
}

const { getImageDescriptors } = require('./get-midjourney-data.js')
const { readDB } = require('./image-db.js')
const { uniqualize } = require('./uniqualize.js')
