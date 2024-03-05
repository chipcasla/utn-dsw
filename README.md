# UTN FRRO - Desarrollo de Software
# Proyecto Sistema de Gestión de Restaurante

Este proyecto consiste en una aplicación web para la gestión de un restaurante. Incluye un backend desarrollado con Express.js y un frontend desarrollado con Angular.

## Instalación y Ejecución

### Backend (API Express)

1. Clona este repositorio en tu máquina local:
```bash
git clone https://github.com/chipcasla/utn-dsw.git
```

2. Navega al directorio del backend:
```bash
cd utn-dsw/api-express
```
3. Instala las dependencias del backend:
```bash
pnpm install
```
> Asegúrate de tener pnpm instalado en tu sistema antes de seguir estos pasos. Puedes instalarlo globalmente usando npm con el siguiente comando:
> ```bash
> npm install -g pnpm
>  ```
4. Ejecuta el servidor:
```bash
pnpm start:dev
```
El servidor se ejecutará en `http://localhost:3000/`.

### Frontend (Angular)

1. Abre una nueva terminal.
2. Navega al directorio del frontend:
```bash
cd utn-dsw/frontend
```
3. Instala las dependencias del frontend:
```bash
npm install
```
4. Inicia la aplicación Angular:
```bash
ng serve --o
```
La aplicación estará disponible en `http://localhost:4200/`.
 
### Acceso:
> Usuario admin:
> - dni: 12312312
> - password: 123

> Usuario cliente:
> - dni: 87654321
> - password: 123

Instrucciones para la ejecucion:
- Instalar los modulos necesarios mediante 'npm install'. En caso de error, realizar 'npm install --peer-legacy-deps'
- Inicializar el backend mediante 'npm run start:dev'
- Inicializar el frontend mediante 'ng serve --o'

Contributors
--------------------

- Alejandro Foresi [@chipcasla](https://github.com/chipcasla)
- Lucio Pecoraro [@pecorarolucio](https://github.com/pecorarolucio)
- Leandro Berto [@leandroberto2010](https://github.com/leandroberto2010)
