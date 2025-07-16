import { expect, test } from '@playwright/test';

import { seedUser } from '@documenso/prisma/seed/users';

import { apiSignin } from '../fixtures/authentication';

// Test language switcher sets Portuguese and cookie

test('[LANGUAGE_SWITCHER]: selecting Portuguese sets cookie', async ({ page }) => {
  const { user } = await seedUser();

  await apiSignin({ page, email: user.email });

  // Open the account menu
  await page.getByTestId('menu-switcher').click();
  // Open the language switcher dialog
  await page.getByRole('menuitem', { name: 'Language' }).click();

  // Verify option is present
  const portugueseOption = page.getByRole('option', { name: 'Portuguese' });
  await expect(portugueseOption).toBeVisible();

  // Select Portuguese
  await portugueseOption.click();

  // Wait for language preference to be saved
  await page.waitForResponse((resp) =>
    resp.url().includes('/api/locale') && resp.status() === 200,
  );

  // Check lang cookie
  const cookies = await page.context().cookies();
  const langCookie = cookies.find((c) => c.name === 'lang');
  expect(langCookie?.value).toBe('pt');
});
