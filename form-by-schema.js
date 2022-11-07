module.exports = { formBySchema }

function formBySchema(item) {
  const { id, username: author, prompt, image_paths: [url] } = item

  return { id, author, prompt, url }
}
