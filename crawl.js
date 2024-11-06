// write a stub out function that get URLs from HTML content
// arguments: htmlbody and baseURL
// return: array of URLs


// import jsdom package
const { JSDOM } = require('jsdom')


async function crawlPage(currentURL) {
  console.log(`actively crawling: ${currentURL}`)
  const response = await fetch(currentURL)
  console.log(response.text())
}

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

function getURLsFromHTML(htmlbody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlbody);
  const elementLinks = dom.window.document.querySelectorAll('a');
  
  for (const elementLink of elementLinks) {
    const href = elementLink.getAttribute('href');
    
    // hrefが絶対URLもしくは相対URLでない場合は無効とする
    if (href && /^(https?:\/\/|\/)/i.test(href)) {
      const url = new URL(href, baseURL);
      urls.push(url.href);
    } else if (href) {
      // "invalid" のようなURLは無効とみなし、空の配列を返す
      return [];
    }
  }
  
  return urls;
}

module.exports = {
   normalizeURL,
   getURLs,
   getURLsFromHTML
  }