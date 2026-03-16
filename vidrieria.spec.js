const { test, expect } = require('@playwright/test');
const { VidrieriaPage } = require('../pages/VidrieriaPage');

test.describe('Pruebas E2E - Flujos UX/UI', () => {
    let vidrieria;

    test.beforeEach(async ({ page }) => {
        vidrieria = new VidrieriaPage(page);
        await vidrieria.cargarPagina();
    });

    test('CP-1.1: Compra exitosa normal', async () => {
        await vidrieria.agregarProducto(1);
        await vidrieria.confirmarCompra();
        await expect(vidrieria.modal).toBeVisible({ timeout: 15000 });
    });

    test('CP-1.2: Pagar con carrito vacío', async () => {
        await vidrieria.btnPagar.click();
        await expect(vidrieria.modal).toBeHidden();
    });

    test('CP-1.3: Comprar el stock límite', async ({ page }) => {
        const spanStock = page.locator('.card').last().locator('span[id^="stock_"]');
        const stockActual = parseInt(await spanStock.innerText());
        await vidrieria.agregarProducto(stockActual);
        await expect(spanStock).toHaveText('0');
    });

    test('CP-2.1: Actualización dinámica', async () => {
        await vidrieria.agregarProducto(1);
        await expect(vidrieria.carrito).toContainText('(x');
    });

    test('CP-2.2: Validación input vacío', async ({ page }) => {
        const producto = page.locator('.card').last();
        await producto.locator('input[type="number"]').fill('');
        await producto.locator('button', { hasText: 'Agregar' }).click();
        await expect(vidrieria.modal).toBeHidden();
    });

    test('CP-2.3: Superar límite de stock', async ({ page }) => {
        const producto = page.locator('.card').last();
        await producto.locator('input[type="number"]').fill('9999');
        page.once('dialog', d => d.accept().catch(() => {}));
        await producto.locator('button', { hasText: 'Agregar' }).click();
        await expect(vidrieria.modal).toBeHidden();
    });

    test('CP-3.1: Cancelar venta exitosamente', async ({ page }) => {
        await vidrieria.agregarProducto(1);
        await vidrieria.confirmarCompra();
        await expect(vidrieria.modal).toBeVisible({ timeout: 10000 });
        page.once('dialog', d => d.accept().catch(() => {})); 
        await vidrieria.btnCancelar.click();
        await expect(vidrieria.modal).toBeHidden({ timeout: 10000 }); 
    });

    test('CP-3.2: Arrepentirse de cancelar', async ({ page }) => {
        await vidrieria.agregarProducto(1);
        await vidrieria.confirmarCompra();
        await expect(vidrieria.modal).toBeVisible({ timeout: 10000 });
        page.once('dialog', d => d.dismiss().catch(() => {})); 
        await vidrieria.btnCancelar.click();
        await expect(vidrieria.modal).toBeVisible();
    });

    test('CP-3.3: Cerrar modal sin cancelar', async () => {
        await vidrieria.agregarProducto(1);
        await vidrieria.confirmarCompra();
        await expect(vidrieria.modal).toBeVisible({ timeout: 10000 });
        await vidrieria.btnCerrar.click();
        await expect(vidrieria.modal).toBeHidden();
    });
});