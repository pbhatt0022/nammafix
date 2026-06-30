import { chromium } from 'playwright';
import { rename } from 'fs/promises';
import { existsSync, readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const compDir = path.join(projectRoot, 'brag-output', 'composition');
const outDir = path.join(projectRoot, 'brag-output');

const browser = await chromium.launch();

const ctx = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: {
    dir: outDir,
    size: { width: 1280, height: 720 },
  },
});

const page = await ctx.newPage();

// Load the composition from the filesystem
const compUrl = 'file:///' + compDir.replace(/\\/g, '/') + '/index.html';
console.log('Loading:', compUrl);

await page.goto(compUrl);

// Wait for fonts + GSAP CDN to load
await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
await page.waitForTimeout(500);

// Wait for the full 20s animation to play
console.log('Recording 20s animation…');
await page.waitForTimeout(21000);

// Close context to flush the video
const videoPath = await page.video().path();
await ctx.close();
await browser.close();

// Rename to brag.mp4
const dest = path.join(outDir, 'brag.mp4');
await rename(videoPath, dest);
console.log('✓ Saved:', dest);
