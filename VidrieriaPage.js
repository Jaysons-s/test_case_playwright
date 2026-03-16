exports.VidrieriaPage = class VidrieriaPage {
    constructor(page) {
        this.page = page;
        this.btnPagar = page.locator('button', { hasText: 'Proceder a pagar' });
        this.carrito = page.locator('#carrito');
        this.modal = page.locator('#modalCompra');
        this.btnCancelar = page.locator('#modalContenido button', { hasText: 'Cancelar Venta' });
        this.btnCerrar = page.locator('#modalContenido button', { hasText: 'Cerrar' });
    }

    async cargarPagina() {
        await this.page.goto('http://localhost/vidrios_bd/productos.html');
        await this.page.waitForSelector('.card');
    }

    async agregarProducto(cantidad) {
        const producto = this.page.locator('.card').last();
        await producto.locator('input[type="number"]').fill(cantidad.toString());
        
        // Ignoramos errores de diálogo para que no traben el flujo
        this.page.once('dialog', d => d.accept().catch(() => {})); 
        await producto.locator('button', { hasText: 'Agregar' }).click();
        await this.page.waitForTimeout(1000); // Tiempo suficiente para que XAMPP procese
    }

    async confirmarCompra() {
        this.page.once('dialog', d => d.accept().catch(() => {}));
        await this.btnPagar.click();
        await this.page.waitForTimeout(1000);
    }
};