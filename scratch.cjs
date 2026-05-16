const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  try {
    await page.goto('http://localhost:5173/registration-form/6a0379c0b60d84e551e25431', { waitUntil: 'networkidle0' });
    console.log("Navigation complete.");
  } catch (error) {
    console.error('Failed to navigate:', error);
  }

  await browser.close();
})();
