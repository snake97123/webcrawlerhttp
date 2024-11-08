import { crawlPage } from './crawl.js'
import { printReport } from './report.js'

/**
 * The main function checks the command line arguments to determine if a website URL has been provided.
 * If no URL is provided, it logs 'No website provided' and exits the process with a status code of 1.
 * If a URL is provided, it logs 'Starting crawl'.
 */
async function main(){
  // check command line arguments. 
  // if not enough arguments, output no website provided
  if(process.argv.length < 3){
    console.log('No website provided')
    // exit the process with a status code of 1
    // status code 1 means there was an error
    process.exit(1)
  }

  // check command line arguments. if amount of arguments than three, too many arguments
  if(process.argv.length > 3){
    console.log('Too many arguments')
    process.exit(1)
  }
  // get the website from the command line arguments
  const website = process.argv[2]

  console.log(`Starting crawl of ${website}`)
  const pages = await crawlPage(website, website, {})                         
  printReport(pages)
}

main()

