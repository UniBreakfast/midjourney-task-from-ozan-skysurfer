module.exports = { generateLinks }

const baseURL = 'https://www.midjourney.com/api/public-feed/'

function generateLinks() {
  const orders = ['top', 'popular', 'hot', 'new', '']
  const pages = 3
  const caches = 2 // don't know what it means
  const links = []

  for (let cache = 1; cache <= caches; cache++) {
    for (const order of orders) {
      for (let page = 0; page < pages; page++) {
        let link = baseURL

        if (cache || order || page) link += '?'

        if (cache) link += `cache=${cache}`

        if (order) link += `${cache ? '&' : ''}orderBy=${order}`

        if (page) link += `${cache || order ? '&' : ''}page=${page}`

        links.push(link)
      }
    }
  }

  return links
}
