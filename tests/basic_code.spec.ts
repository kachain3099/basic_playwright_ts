import { test, expect } from '@playwright/test';

test('For loop', async ({ page }) => {
    for (const name of ['A', 'B', 'C']) {
        console.log(name);
    }
});