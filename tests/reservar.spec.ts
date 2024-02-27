import { expect, test } from "@playwright/test"

const CANTIDAD_PERSONAS = 2;
const FECHA_HORA = '22/02/2024 19:00';
const UBICACION = 'adentro';

test('Nueva reserva', async ({ page }) => {
  // Navego a la página de login
  await page.goto('http://localhost:4200/login');

  await page.fill('#dni', '98789876');
  await page.fill('#password', '123');
  // Envío el formulario
  await page.click('button[type="submit"]');

  const mensaje = await page.textContent('#bienvenida');
  expect(mensaje).toContain('Bienvenido');
  // Verifico que no haya mensajes de error
  const error = await page.$$eval(
    '.text-red-500',
    (elements) => elements.length
  );
  expect(error).toBe(0);

  await page.goto('http://localhost:4200/nuevaReserva');

  // Ingreso datos de reserva
  await page.fill('#cantPersonas', CANTIDAD_PERSONAS.toString());
  await page.getByLabel('Fecha y Hora:').click();
  await page.getByLabel('Fecha y Hora:').fill('2024-03-22T19:00');
  await page.selectOption('#ubicacion', UBICACION);

  await page.click('button[type="submit"]');

  // Selecciono la primera mesa disponible

  await page.getByRole('button', { name: 'Reservar' }).first().click();
  // Espero el mensaje de confirmación
  await page.waitForSelector('.mensaje-confirmacion');
  const mensajeConfirmacion = await page.textContent(
    '.mensaje-confirmacion h3'
  );
  expect(mensajeConfirmacion).toContain('Reservado!!!');
});
