const express = require('express') // Adding Express
const app = express() // Initializing Express
const puppeteer = require('puppeteer') // Adding Puppeteer

// Mvideo title: h1.fl-h1, img: .c-media-container__image, cost: .fl-pdp-price__current

app.get('/Parser', async(req, res) => {
  let site = req.query.site
  const browser = await puppeteer.launch({headless:false, slowMo:100})
  const page = await browser.newPage()
  await page.goto(site, {waitUntil: 'domcontentloaded'})

  const data = await page.evaluate(async () => {
    return {
      title: document.querySelector('h1.fl-h1').innerText,
      img: document.querySelector('.c-media-container__image').src,
      cost: document.querySelector('.fl-pdp-price__current').innerText
    }
  })

  res.send(data)
  await browser.close()
})

app.listen(7000, () => {
  console.log('Running on port 7000.')
})