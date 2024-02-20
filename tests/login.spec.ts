import { expect, test } from '@playwright/test';

test('Login exitoso', async ({ page }) => {
  // Navego a la página de login
  await page.goto('http://localhost:4200/login');

  await page.fill('#dni', '43378663');
  await page.fill('#password', 'asd');
  // Envío el formulario
  await page.click('button[type="submit"]');

  const orderSent = page.locator('#bienvenida');
  await orderSent.waitFor();

  const mensaje = await page.textContent('#bienvenida');
  expect(mensaje).toContain('Bienvenido');
  // Verifico que no haya mensajes de error
  const error = await page.$$eval(
    '.text-red-500',
    (elements) => elements.length
  );
  expect(error).toBe(0);
});
