module.exports = { addToDB, countImages, markAsDownloaded, readDB, writeDB, getNotDownloadedItemsFromDB }

const { readFile, writeFile, appendFile } = require('fs').promises
const DB_FILE = 'db.json'
const DONE_LIST = 'downloaded'
let db
let downloadedIds

async function addToDB(...imageDescriptors) {
  if (!db) db = await readDB()

  db.push(...imageDescriptors)

  await writeDB(db)
}

async function countImages() {
  if (!db) db = await readDB()

  return db.length
}

async function markAsDownloaded(imageDescriptor) {
  downloadedIds.push(imageDescriptor.id)
  await appendFile(DONE_LIST, imageDescriptor.id + '\n')
}

async function readDB() {
  if (!downloadedIds) downloadedIds = (await readFile(DONE_LIST, 'utf8').catch(() => ''))?.split(/\r?\n/) || []

  if (db) return db

  try {
    return JSON.parse(await readFile(DB_FILE, 'utf8'))
  } catch (err) {
    if (err.code === 'ENOENT') return []

    throw err
  }
}

async function writeDB(db) {
  await writeFile(DB_FILE, JSON.stringify(db, null, 2))
}

async function getNotDownloadedItemsFromDB() {
  if (!db) db = await readDB()

  return db.filter(descriptor => !downloadedIds.includes(descriptor.id))
} 
