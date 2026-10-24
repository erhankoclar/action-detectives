const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const fs = require('node:fs');

/** Gerçek çevrimdışı sayfada kategori, deste, kayıt ve kesinti davranışlarını doğrular. */
async function verifyGame() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(pathToFileURL(path.resolve('index.html')).href);
    await page.clock.install();
    assert.equal(await page.locator('#category-picker').isVisible(), true);
    assert.equal(await page.locator('#next').isDisabled(), true);
    for (const [id, count] of [['classroom-language', 16], ['countries-nationalities', 14]]) {
      await page.locator(`[data-category="${id}"]`).click();
      await page.waitForFunction(() => ready);
      const original = await page.evaluate(() => [...deck]);
      const shown = [];
      for (let i = 0; i < count; i++) {
        await page.locator('#next').click();
        await page.evaluate(() => selectNext());
        await page.clock.runFor(3050);
        shown.push(await page.evaluate(() => lastIndex));
      }
      assert.deepEqual(shown, original);
      assert.equal(new Set(shown).size, count);
      const reshuffled = await page.evaluate(() => [...deck]);
      assert.notDeepEqual(reshuffled, original);
      assert.notEqual(reshuffled[0], shown.at(-1));
      await page.locator('#next').click();
      await page.clock.runFor(3050);
      assert.equal(await page.evaluate(() => lastIndex), reshuffled[0]);
      if (id === 'countries-nationalities') {
        assert.equal(await page.locator('#caption').textContent(), await page.evaluate(() => images[lastIndex].text));
        assert.equal(await page.locator('#caption').isVisible(), true);
      } else assert.equal(await page.locator('#caption').isVisible(), false);
      const state = await page.evaluate(() => ({ deck, nextIndex, lastIndex }));
      await page.reload();
      assert.equal(await page.locator('#category-picker').isVisible(), true);
      await page.locator(`[data-category="${id}"]`).click();
      await page.waitForFunction(() => ready);
      assert.deepEqual(await page.evaluate(() => ({ deck, nextIndex, lastIndex })), state);
      await page.locator('#next').click();
      await page.clock.runFor(500);
      await page.locator('#change-category').click();
      await page.clock.runFor(3500);
      await page.locator(`[data-category="${id}"]`).click();
      await page.waitForFunction(() => ready);
      assert.deepEqual(await page.evaluate(() => ({ deck, nextIndex, lastIndex })), state);
      await page.locator('#reset').click();
      assert.equal(await page.evaluate(() => nextIndex), 0);
      assert.equal(await page.evaluate(() => lastIndex), null);
      await page.locator('#next').click();
      await page.clock.runFor(3050);
      fs.mkdirSync('output/playwright', { recursive: true });
      for (const [width, height] of [[1366, 768], [820, 650], [390, 844], [850, 420]]) {
        await page.setViewportSize({ width, height });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth && document.documentElement.scrollHeight <= innerHeight), true);
        for (const selector of ['#picture', '#next', '#change-category', '#fullscreen', ...(id === 'countries-nationalities' ? ['#caption'] : [])]) {
          const box = await page.locator(selector).boundingBox();
          assert.ok(box && box.width > 0 && box.height > 0 && box.y >= 0 && box.y + box.height <= height + 1, selector + ' fits ' + width);
        }
        await page.screenshot({ path: `output/playwright/${id}-${width}.png` });
      }
      await page.locator('#change-category').click();
      console.log('PASS', id, count, 'cards; exact deck order, reshuffle, persistence, cancellation, reset, 4 viewports');
    }
    await page.evaluate(() => localStorage.setItem('eylem-dedektifleri.progress.v2.countries-nationalities', JSON.stringify({ version: 2, deck: Array(14).fill(0), nextIndex: 0, lastIndex: null })));
    await page.locator('[data-category="countries-nationalities"]').click();
    await page.waitForFunction(() => ready);
    assert.equal(await page.evaluate(() => new Set(deck).size), 14);
    const allFiles = await page.evaluate(() => Object.entries(categories).flatMap(([id, category]) => category.cards.map(card => 'resimler/' + id + '/' + card.file)));
    allFiles.forEach(file => assert.ok(fs.existsSync(file), file));
    assert.deepEqual(errors, []);
    console.log('PASS invalid saved deck recovery, all 30 image paths, no runtime errors');
  } finally { await browser.close(); }
}
verifyGame().catch(error => { console.error(error); process.exitCode = 1; });
