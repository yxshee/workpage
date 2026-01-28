import { chromium, FullPageScreenshotOptions } from "playwright";
import fs from "fs";
import path from "path";
// Note: pixelmatch and pngjs are required for the actual diff comparison
// import pixelmatch from "pixelmatch";
// import { PNG } from "pngjs";

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 812 },
];

const REF_URL = "https://www.etienne.studio/";
const LOCAL_URL = "http://localhost:3000/";

async function captureScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const reportsDir = path.join(process.cwd(), "reports", "diffs");
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  for (const vp of VIEWPORTS) {
    console.log(`Processing ${vp.name}...`);
    await page.setViewportSize({ width: vp.width, height: vp.height });

    // Capture Reference
    await page.goto(REF_URL);
    await page.waitForTimeout(2000); // Wait for animations
    await page.screenshot({ path: path.join(reportsDir, `ref-${vp.name}.png`), fullPage: true });

    // Capture Local
    await page.goto(LOCAL_URL);
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(reportsDir, `local-${vp.name}.png`), fullPage: true });
  }

  await browser.close();
  console.log("Screenshots captured. Use an external tool or pixelmatch for diffing.");
}

captureScreenshots().catch(console.error);
