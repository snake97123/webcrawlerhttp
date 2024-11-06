const { normalizeURL, getURLs, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip protocol', () => {
  const input = 'https://blog.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL strip tailing slash', () => {
  const input = 'https://blog.boot.dev/path/'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

// create a test for the normalizeURL capitals
test('normalizeURL strip http', () => {
  const input = 'http://blog.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

// create a test for the getURLs function
test('getURLs', () => {
  // simple html tag. it contains a html, body, and a tag
  const htmlBody = '<html><body><a href="https://blog.boot.dev/path/">link</a></body></html>'
  const baseURL = 'https://blog.boot.dev'
  const actual = getURLs(htmlBody, baseURL)
  const expected = ['https://blog.boot.dev/path/']
  expect(actual).toEqual(expected)
})

// create a test for the  get relative URL function 

test('getURLs relative URL', () => {
  // simple html tag. it contains a html, body, and a tag
  const htmlBody = '<html><body><a href="/path/">link</a></body></html>'
  const baseURL = 'https://blog.boot.dev'
  const actual = getURLs(htmlBody, baseURL)
  const expected = ['https://blog.boot.dev/path/']
  expect(actual).toEqual(expected)
 })

 // create a test for the  getURLs both relative URL and alternative URL function
 test('getURLs relative URL and alternative URL', () => {
  // simple html tag. it contains a html, body, and a tag
  const htmlBody = '<html><body><a href="/path/">link</a><a href="https://blog.boot.dev/path2/">link2</a></body></html>'
  const baseURL = 'https://blog.boot.dev'
  const actual = getURLs(htmlBody, baseURL)
  const expected = ['https://blog.boot.dev/path/', 'https://blog.boot.dev/path2/']
  expect(actual).toEqual(expected)
 })

 // create a test for the invalid URL function
 test('getURLs invalid URL', () => {
  const htmlBody = '<html><body><a href="invalid">invalid link</a></body></html>'
  const baseURL = 'https://blog.boot.dev'
  const actual = getURLs(htmlBody, baseURL)
  const expected = []
  expect(actual).toEqual(expected)
 })

 test('getURLsFromHTML absolute', () => {
  const htmlBody = '<html><body><a href="https://blog.boot.dev/path">link</a></body></html>'
  const baseURL = ['https://blog.boot.dev/path']
  const actual = getURLsFromHTML(htmlBody, baseURL)
  const expected = ['https://blog.boot.dev/path']
  expect(actual).toEqual(expected)
 })

  test('getURLsFromHTML relative', () => {
     const htmlBody = '<html><body><a href="/path/">link</a></body></html>'
     const baseURL = ['https://blog.boot.dev']
     const actual = getURLsFromHTML(htmlBody, baseURL)
     const expected = ['https://blog.boot.dev/path/']
     expect(actual).toEqual(expected)
  })

  test('getURLsFromHTML relative', () => {
    const htmlBody = '<html><body><a href="/path1/">link1</a><a href="https://blog.boot.dev/path2/">link2</a></body></html>'
    const baseURL = ['https://blog.boot.dev']
    const actual = getURLsFromHTML(htmlBody, baseURL)
    const expected = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/']
    expect(actual).toEqual(expected)
 })

 test('getURLsFromHTML invalid', () => {
  const htmlBody = '<html><body><a href="invalid">link</a></body></html>'
  const baseURL = ['https://blog.boot.dev']
  const actual = getURLsFromHTML(htmlBody, baseURL)
  const expected = []
  expect(actual).toEqual(expected)
})