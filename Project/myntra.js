let puppeteer = require("puppeteer");
(async function () {
  try{
  let browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"]
  });
  let tabs = await browser.pages();
  let tab = tabs[0];
  await tab.goto("https://www.myntra.com")
  await tab.waitFor(3000);
  await tab.waitForSelector(".desktop-searchBar");
  await tab.type(".desktop-searchBar", "t-shirt", {delay: 120});
  let submitBtn = await tab.$(".desktop-submit");
  await submitBtn.click();
  await tab.waitFor(800);
  await tab.waitForSelector(".gender-list")
  let gender = await tab.$$(".gender-list .common-customRadio.gender-label");
  await gender[0].click("input[type=radio]");
  await tab.waitFor(2000);
  await tab.waitForSelector(".brand-list")
  let brand = await tab.$$(".brand-list .common-checkboxIndicator");
  await brand[4].click();
  await tab.waitFor(2000);
  await tab.waitForSelector(".colour-listItem")
  let color = await tab.$$(".colour-listItem .common-checkboxIndicator");
  await color[1].click();
  await tab.waitFor(2000);

  await tab.waitForSelector(".price-list")
  let price = await tab.$$(".price-list .price-input");
  await price[1].click();
  await tab.waitFor(5000);
  await autoScroll(tab);
await tab.screenshot({ path: 'screenshot.png', fullPage: true })

await browser.close();
  }catch(err){
      console.log(err);
  }
})();
async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        var totalHeight = 0;
        var distance = 2000;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
  
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  }