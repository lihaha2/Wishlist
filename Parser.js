const express = require('express') // Adding Express
const app = express() // Initializing Express
const puppeteer = require('puppeteer') // Adding Puppeteer

// Launching the Puppeteer controlled headless browser and navigate to the Digimon website
const Parser = async(userURL)=>{
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(userURL, {
    waitUntil: 'domcontentloaded',
  })

  const data = await page.evaluate(()=>{
    return document.querySelector('img.gb_Da').src
  })

  app.get('/', (req, res) => {
    res.send(data)
  })
  // console.log(data)

  await browser.close()
}

Parser('https://www.google.com/')



// Making Express listen on port 7000
app.listen(7000, () => {
  console.log('Running on port 7000.')
})