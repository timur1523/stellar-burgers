import { test, expect } from '@playwright/test';

const mockUser = {
  success: true,
  user: {
    email: 'test@example.com',
    name: 'Test User'
  }
};

const mockAuthTokens = {
  accessToken: 'Bearer mock-access-token',
  refreshToken: 'mock-refresh-token'
};

const mockOrderResponse = {
  success: true,
  name: 'Флюоресцентный бургер',
  order: {
    number: 54321
  }
};

test.describe('Страница конструктора', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'accessToken',
        value: mockAuthTokens.accessToken,
        url: 'http://localhost:4000'
      }
    ]);

    await page.addInitScript((tokens) => {
      localStorage.setItem('refreshToken', tokens.refreshToken);
    }, mockAuthTokens);

    await context.route('**/auth/user', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockUser)
      })
    );

    await context.route('**/orders', async (route) => {
      // Проверяем, что это POST-запрос
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockOrderResponse)
        });
      } else {
        await route.continue();
      }
    });

    await page.goto('/');
  });

  test('Отображает список ингредиентов из моков', async ({ page }) => {
    await expect(page.locator('text=Краторная булка N-200i')).toBeVisible();
    await expect(page.locator('text=Филе Люминесцентного тетраодонтимформа')).toBeVisible();
    await expect(page.locator('text=Соус фирменный Space Sauce')).toBeVisible();
  });

  test('Добавляет булку в конструктор', async ({ page }) => {
    await page.locator('li:has-text("Краторная булка N-200i") button:has-text("Добавить")').click();
    await expect(page.locator('text=Краторная булка N-200i (верх)')).toBeVisible();
    await expect(page.locator('text=Краторная булка N-200i (низ)')).toBeVisible();
  });

  test('Добавляет начинку в конструктор', async ({ page }) => {
    await page.locator('li:has-text("Филе Люминесцентного тетраодонтимформа") button:has-text("Добавить")').click();
    await expect(page.locator('[data-testid="burger-constructor"] >> text=Филе Люминесцентного тетраодонтимформа')).toBeVisible();
  });

  test('Открывает модальное окно ингредиента', async ({ page }) => {
    await page.locator('li:has-text("Филе Люминесцентного тетраодонтимформа")').click();
    await expect(page.locator('text=Детали ингредиента')).toBeVisible();
    await expect(page.locator('[data-testid="modal"] >> text=Филе Люминесцентного тетраодонтимформа')).toBeVisible();
  });

  test('Закрывает модальное окно по кнопке', async ({ page }) => {
    await page.locator('li:has-text("Филе Люминесцентного тетраодонтимформа")').click();
    await expect(page.locator('[data-testid="modal"]')).toBeVisible();
    await page.locator('[data-testid="modal-close-button"]').click();
    await expect(page.locator('text=Детали ингредиента')).toHaveCount(0);
  });

  test('Закрывает модальное окно по оверлею', async ({ page }) => {
    await page.locator('li:has-text("Филе Люминесцентного тетраодонтимформа")').click();
    await expect(page.locator('[data-testid="modal"]')).toBeVisible();
    await page.locator('[data-testid="modal-overlay"]').click({ position: { x: 5, y: 5 } });
    await expect(page.locator('text=Детали ингредиента')).toHaveCount(0);
  });

  test('Создает заказ и показывает номер', async ({ page }) => {
    await page.locator('li:has-text("Краторная булка N-200i") button:has-text("Добавить")').click();
    await page.locator('li:has-text("Филе Люминесцентного тетраодонтимформа") button:has-text("Добавить")').click();

    await page.locator('button:has-text("Оформить заказ")').click();

    await expect(page.locator('[data-testid="modal"]')).toBeVisible({ timeout: 30000 });

    await  expect(page.locator('[data-testid="modal"]')).toContainText(String(mockOrderResponse.order.number));

    await expect(page.locator('[data-testid="modal"]')).toContainText(/\d+/);
  });

  test('Закрывает окно заказа и очищает конструктор', async ({ page }) => {
    await page.locator('li:has-text("Краторная булка N-200i") button:has-text("Добавить")').click();
    await page.locator('li:has-text("Филе Люминесцентного тетраодонтимформа") button:has-text("Добавить")').click();

    await page.locator('button:has-text("Оформить заказ")').click();

    await expect(page.locator('[data-testid="modal"]')).toContainText(/\d+/, { timeout: 30000 });

    await page.getByTestId('modal-close-button').click();

    await expect(page.locator('text=Выберите булки').first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Выберите начинку')).toBeVisible();
  });
}); 