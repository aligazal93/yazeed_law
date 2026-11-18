import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000/ar')

    await expect(page).toHaveTitle(/يزيد عبدالرحمن الزهراني/)

    const heading = page.locator('h1').first()

    await expect(heading).toBeVisible()
    await expect(heading).not.toBeEmpty()
  })
})
