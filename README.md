# Backend Challenge

## Requerimientos Previos

Antes de comenzar, debes tener instalados los siguientes requisitos en tu sistema:

- Node.js 18.17.0.
- npm (Node Package Manager).

Puedes descargar Node.js y manejar sus versiones de una forma sencilla con [nvm](https://github.com/nvm-sh/nvm) o [nvm para windows](https://github.com/coreybutler/nvm-windows).

## Paso a Paso

Sigue estos pasos para configurar y ejecutar la aplicación de manera local:

1. **Clonar el Repositorio**

   Clona este repositorio en tu máquina local utilizando el siguiente comando:

   ```bash
   git clone https://github.com/MaxiDeMichieli/BackendChallenge.git
   ```

3. **Instalar dependencias**

   Instala las dependencias del proyecto ejecutando el siguiente comando:

   ```bash
   npm install
   ```

2. **Configurar Variables de Entorno**

   Crea un archivo llamado `.env` en la raíz del proyecto y configura las siguientes variables de entorno:

   ```plaintext
   PORT=<puerto_a_utilizar>
   JWT_SECRET=<clave_secreta_para_generar_el_JWT>
   ```

3. **Inicializar la Base de Datos (Opcional)**

   Si deseas inicializar la base de datos con datos de prueba, ejecuta los siguientes comandos en el directorio del proyecto:

   ```bash
   npm run db:init
   npm run seed:movies
   npm run seed:users
   ```

   Estos comandos insertarán datos de prueba en la base de datos, incluyendo un usuario administrador con las siguientes credenciales:

   ```json
   {
     "email": "admin@test.com",
     "password": "Admin123."
   }
   ```

4. **Compilar el Proyecto**

   Realiza una compilación del proyecto utilizando el siguiente comando:

   ```bash
   npm run build
   ```

5. **Ejecutar la Aplicación**

   Inicia la aplicación ejecutando el siguiente comando:

   ```bash
   npm run start
   ```

   La aplicación se ejecutará en el puerto especificado en el archivo `.env`.

6. **Acceder a Swagger**

   Una vez que la aplicación esté en funcionamiento, puedes acceder a la documentación Swagger a través de la siguiente URL en tu navegador:

   ```
   http://localhost:<PORT>/api/documentation
   ```

   Esto te proporcionará una interfaz interactiva para explorar y probar los endpoints de la API.