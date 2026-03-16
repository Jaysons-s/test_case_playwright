# E2E Testing - Sistema de Vidriería Moderna

Este repositorio contiene la automatización de pruebas para el proyecto de la Vidriería Moderna, utilizando Playwright bajo el patrón Page Object Model (POM).

## Requisitos
* [Node.js](https://nodejs.org/) instalado.
* Servidor local (XAMPP/Apache) activo con el sistema de vidriería.

## Instalación
1. Clona el repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)

## Ejecucion de pruebas
Para evitar errores de conexión con la base de datos de XAMPP, las pruebas deben correrse con un solo trabajador (worker) a la vez:
Terminal: npx playwright test --workers=1

## Reporte de pruebas
Una vez finalizada la ejecución, puedes ver los resultados detallados (incluyendo los fallos analizados por latencia) con el siguiente comando:
Terminal: npx playwright show-report