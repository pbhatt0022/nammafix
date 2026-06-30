import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

mkdirSync('docs/screenshots', { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

// ---- 1. Reporting flow ----
await page.goto('https://nammafix-ai-564629031889.asia-southeast1.run.app/');
await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
// Open app
await page.click('button:has-text("Open App")');
await page.waitForTimeout(800);
// Click Report New Spot
const reportBtn = page.locator('button:has-text("Report New Spot")');
await reportBtn.click();
await page.waitForTimeout(600);
// Click Preset 1 to auto-fill
const preset = page.locator('button:has-text("PRESET #1")');
await preset.click();
await page.waitForTimeout(400);
await page.screenshot({ path: 'docs/screenshots/report-flow.png', fullPage: false });
console.log('✓ report-flow.png');

// ---- 2. Active case view ----
// Cancel report form, click a report card
const cancel = page.locator('button:has-text("CANCEL")').first();
await cancel.click();
await page.waitForTimeout(600);
// Click the high-voltage cable case (97% priority)
const caseCard = page.locator('text=Damaged high-voltage cable').first();
await caseCard.click();
await page.waitForTimeout(800);
await page.screenshot({ path: 'docs/screenshots/active-case.png', fullPage: false });
console.log('✓ active-case.png');

// ---- 3. Impact + Karma dashboard ----
// Click profile avatar to open Civic Karma passbook
const profileBtn = page.locator('button:has-text("Priyanka Bhatt")');
await profileBtn.click();
await page.waitForTimeout(600);
await page.screenshot({ path: 'docs/screenshots/impact-dashboard.png', fullPage: false });
console.log('✓ impact-dashboard.png');

await browser.close();
console.log('Done.');
