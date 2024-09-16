# Gestión de Seguros - API

Esta es una API para la gestión de seguros, que incluye autenticación de usuarios, creación y administración de pólizas, clientes, cotizaciones y entidades. La API utiliza **NestJS**, **MongoDB** (con MongoDB Atlas) y **JWT** para la autenticación.

## Características principales

- **Autenticación JWT**: Registro y autenticación de usuarios con diferentes roles (admin, broker, cliente).
- **Multi-tenant**: Separación lógica de datos entre diferentes entidades (brokers).
- **CRUD completo**: Para usuarios, pólizas, clientes y cotizaciones.
- **Documentación de API**: Swagger para documentación interactiva de la API.

## Requisitos previos

Antes de comenzar, asegúrate de tener lo siguiente instalado:

- [Node.js](https://nodejs.org/) v16 o superior
- [NestJS CLI](https://docs.nestjs.com/cli/overview) v8 o superior
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (o una instancia de MongoDB local)
- Cuenta en [Docker](https://www.docker.com/) para ejecutar imágenes en un contenedor

## Variables de entorno

Asegúrate de tener un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```bash
# Archivo .env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mi_base_de_datos
JWT_SECRET=mi_clave_secreta_para_jwt
```

## Instrucciones de despliegue

### Despliegue local

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu_usuario/gestion-seguros.git
   cd gestion-seguros
   ```

2. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env` (como se indica arriba).

4. Inicia la aplicación en desarrollo:

   ```bash
   npm run start:dev
   ```

5. La aplicación estará disponible en `http://localhost:3000`.

6. Para acceder a la documentación de la API (Swagger), visita `http://localhost:3000/api`.

### Despliegue en producción con Docker

1. Asegúrate de tener **Docker** instalado y en funcionamiento en tu máquina.

2. Crea una imagen de Docker:

   ```bash
   docker build -t gestion-seguros-api .
   ```

3. Ejecuta el contenedor:

   ```bash
   docker run -d -p 3000:3000 --env-file .env gestion-seguros-api
   ```

4. La API estará disponible en `http://localhost:3000`.

### Despliegue en un servidor remoto (Heroku)

1. Instala el [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

2. Inicia sesión en Heroku:

   ```bash
   heroku login
   ```

3. Crea una nueva aplicación en Heroku:

   ```bash
   heroku create gestion-seguros-api
   ```

4. Establece las variables de entorno en Heroku:

   ```bash
   heroku config:set MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mi_base_de_datos
   heroku config:set JWT_SECRET=mi_clave_secreta_para_jwt
   ```

5. Despliega la aplicación en Heroku:

   ```bash
   git push heroku main
   ```

6. La API estará disponible en `https://gestion-seguros-api.herokuapp.com`.

## Configuración CI/CD con GitHub Actions

El proyecto incluye un pipeline de **CI/CD** utilizando **GitHub Actions** para ejecutar pruebas y desplegar la aplicación automáticamente.

### Archivo `.github/workflows/ci-cd.yml`

A continuación, se muestra un ejemplo de configuración de CI/CD utilizando GitHub Actions para construir, probar y desplegar el proyecto automáticamente.

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

  deploy:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to Heroku
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
        run: |
          git remote add heroku https://git.heroku.com/gestion-seguros-api.git
          git push heroku main
```

### Instrucciones para la configuración de CI/CD

1. Crea un archivo en tu repositorio en la ruta `.github/workflows/ci-cd.yml`.

2. Establece las variables secretas de Heroku en los **secrets** de tu repositorio de GitHub:
   - **HEROKU_API_KEY**: La API key de Heroku que puedes obtener en la configuración de tu cuenta en Heroku.

3. Cuando hagas un **push** a la rama `main`, GitHub Actions ejecutará las pruebas y desplegará automáticamente en Heroku.

## Uso de la API

### Documentación de la API

La documentación de la API está disponible mediante Swagger. Puedes acceder a ella en:

```
http://localhost:3000/api
```

### Ejemplo de Endpoints

- **POST /auth/register**: Registra un nuevo usuario.
- **POST /auth/login**: Inicia sesión con un usuario registrado.
- **GET /users**: Obtiene una lista de todos los usuarios (solo para administradores).

## Licencia

Este proyecto está bajo la licencia MIT. Para más información, consulta el archivo [LICENSE](LICENSE).
```

### Explicación del README:

1. **Características principales**: Describe las características clave de la aplicación.
2. **Requisitos previos**: Lista las herramientas necesarias para ejecutar el proyecto.
3. **Variables de entorno**: Especifica las variables que deben configurarse en el archivo `.env`.
4. **Instrucciones de despliegue**: Explica cómo desplegar la aplicación de forma local, con Docker y en Heroku.
5. **Configuración de CI/CD con GitHub Actions**: Proporciona un ejemplo de archivo de workflow de GitHub Actions para CI/CD, y cómo configurarlo.
6. **Documentación de la API**: Incluye instrucciones para acceder a la documentación de la API generada con Swagger.
7. **Licencia**: Proporciona información sobre la licencia del proyecto. 

Este **README.md** te proporciona toda la información necesaria para ejecutar, desplegar y mantener el proyecto con CI/CD.