module.exports = { getBody }

function getBody(response) {
  return new Promise((resolve, reject) => {
    const chunks = []

    response.on('data', chunk => chunks.push(chunk))
    response.on('end', () => resolve(Buffer.concat(chunks).toString()))
    response.on('error', reject)
  })
}
