module.exports = { addToDB, countImages, markAsDownloaded, readDB, writeDB, getNotDonwloaded }

const { readFile, writeFile, appendFile } = require('fs').promises
const DB_FILE = 'db.json'
const DONE_LIST = 'downloaded'
let db

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
  if (!db) db = await readDB()

  const index = db.findIndex(desc => desc.url === imageDescriptor.url)

  if (index === -1) throw new Error('Image not found in DB')

  db[index].downloaded = true

  await writeDB(db)
}

async function readDB() {
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

async function getNotDonwloaded() {
  if (!db) db = await readDB()

  return db.filter(desc => !desc.downloaded)
} 
