function normalizeURL(url) 
{
  const urlObj = new URL(url)
  let normalizedPath = urlObj.pathname
  if (normalizedPath.length > 0 && normalizedPath.endsWith('/')) {
    normalizedPath = normalizedPath.slice(0, -1)
  }
  return `${urlObj.hostname}${normalizedPath}`
  
}

module.exports = {
   normalizeURL
}