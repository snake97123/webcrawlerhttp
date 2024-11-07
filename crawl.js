// write a stub out function that get URLs from HTML content
// arguments: htmlbody and baseURL
// return: array of URLs


// import jsdom package
const { JSDOM } = import('jsdom')
import fetch from 'node-fetch'


export async function crawlPage(currentURL) {
  console.log(`actively crawling: ${currentURL}`)
  try {
    const response = await fetch(currentURL)
    
    if(response.status > 399) {
      console.log(`error: ${response.status} on page: ${currentURL}`)
      return 
    }

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('text/html')) {
      console.log(`error: content type is not text/html on page: ${currentURL}`)
      return
    }

    console.log(await response.text())
  } catch (error) {
    console.log(`error in fetch: ${error.message}. on page: ${currentURL}`)
  }

}

export function getURLs(htmlbody, baseURL)
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


export function normalizeURL(url) 
{
  const urlObj = new URL(url)
  let normalizedPath = urlObj.pathname
  if (normalizedPath.length > 0 && normalizedPath.endsWith('/')) {
    normalizedPath = normalizedPath.slice(0, -1)
  }
  return `${urlObj.hostname}${normalizedPath}`
  
}

export function getURLsFromHTML(htmlbody, baseURL) {
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



// module.exports = {
//    normalizeURL,
//    getURLs,
//    getURLsFromHTML,
//    crawlPage
//   }