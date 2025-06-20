import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, webkit, Browser, BrowserContext, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { MarketPage } from '../pages/MarketPage';
import { CoinDetailPage } from '../pages/CoinDetailPage';
import fs from 'fs';
import path from 'path';
import { config } from '../config/env';

setDefaultTimeout(60 * 1000); // 60 saniye timeout

let browser: Browser;
let context: BrowserContext;
let page: Page;

let homePage: HomePage;
let marketPage: MarketPage;
let coinPage: CoinDetailPage;

// ✅ ENV üzerinden browser seçimini al
function getBrowserFromEnv(): 'chromium' | 'firefox' | 'webkit' {
  const browserEnv = process.env.BROWSER?.toLowerCase() || 'chromium';
  if (!['chromium', 'firefox', 'webkit'].includes(browserEnv)) {
    console.warn(`❗ Unsupported browser "${browserEnv}". Falling back to chromium.`);
    return 'chromium';
  }
  return browserEnv as 'chromium' | 'firefox' | 'webkit';
}

Before(async function () {
  const browserType = getBrowserFromEnv();
  console.log(`🔍 Launching browser: ${browserType}`);

  const browserLauncher = {
    chromium,
    firefox,
    webkit,
  }[browserType];

  browser = await browserLauncher.launch({
    headless: false,
    args: browserType === 'chromium' ? ['--start-maximized'] : [], 
  });

  context = await browser.newContext({
    viewport: null, 
    permissions: ['geolocation'],
  });

  page = await context.newPage();

 
  if (browserType !== 'chromium') {
    await page.setViewportSize({ width: 1920, height: 1080 });
  }


  homePage = new HomePage(page);
  marketPage = new MarketPage(page);
  coinPage = new CoinDetailPage(page);

  
  this.page = page;
  this.browser = browser;
  this.homePage = homePage;
  this.marketPage = marketPage;
  this.coinPage = coinPage;
  this.baseUrl = config.baseUrl;
});

After(async function (scenario) {
  if (scenario.result?.status === 'FAILED') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `FAILED_${scenario.pickle.name}_${timestamp}.png`;
    const screenshotPath = path.join('screenshots', fileName);

    if (!fs.existsSync('screenshots')) {
      fs.mkdirSync('screenshots');
    }

    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`[DEBUG] Screenshot captured: ${screenshotPath}`);
  }

  
  if (this.browser) {
    await this.browser.close();
  }
});
