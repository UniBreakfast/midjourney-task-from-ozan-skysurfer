module.exports = { uniqualize }

function uniqualize(array) {
  const ids = []

  return array.filter(item => {
    if (ids.includes(item.id)) return false

    ids.push(item.id)

    return true
  })
}
