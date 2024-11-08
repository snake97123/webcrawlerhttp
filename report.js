export function printReport(pages){
  console.log('==========')
  console.log('Report')
  console.log('==========')
  const sortedPages = sortPages(pages)
  for(const sortPage of sortedPages) {
    const url = sortPage[0]
    const count = sortPage[1]
    console.log(`${url}: ${count}`)
  }
  console.log('==========')
  console.log('End of Report')
  console.log('==========')
}

export function sortPages(pages) {
  const passArr = Object.entries(pages);
  passArr.sort((a, b) => b[1] - a[1]);
  return passArr;            
}