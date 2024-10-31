// write a stub out function that get URLs from HTML content
// arguments: htmlbody and baseURL
// return: array of URLs


// import jsdom package
const { JSDOM } = require('jsdom')


function getURLs(htmlbody, baseURL)
{
  const urls = []
  const dom = new JSDOM(htmlbody)
  const aTags = dom.window.document.querySelectorAll('a')
  aTags.forEach(aTag => {
    const href = aTag.getAttribute('href')
    if (/^(https?:\/\/|\/)/i.test(href)) {
    const url = new URL(href, baseURL)
    urls.push(url.href)
    }
  })
  return urls
}


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
   normalizeURL,
   getURLs
  }