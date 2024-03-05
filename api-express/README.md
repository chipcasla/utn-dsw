# Documentación de la API Express
## Introducción
Esta API está construida sobre Express.js y proporciona endpoints para administrar clientes, mesas, reservas, platos, reseñas y categorías en un sistema de gestión de restaurantes.

## Instalación
Antes de usar la API, asegúrese de tener Node.js y npm instalados. Luego, ejecute npm install para instalar todas las dependencias necesarias.

## Autenticación
La API utiliza JSON Web Tokens (JWT) para la autenticación. Para acceder a los endpoints protegidos, debe incluir un token de autenticación válido en el encabezado de la solicitud.

## Tecnologías
- Express.js
- Sequelize: ORM utilizado con el dialecto de bases de datos MySQL para interactuar con la base de datos de manera orientada a objetos.
- bcrypt: Para cifrar contraseñas.
- jsonwebtoken: Uso de este implementación de JSON Web Tokens (JWT) en Node.js para la autenticación basada en tokens, generando y verificando tokens de acceso para proteger las rutas y recursos de la API.
- Cloudinary: Servicio en la nube que ofrece almacenamiento y manipulación de imágenes. Se utiliza para almacenar y gestionar las imagenes de los platos del restaurante.
- Cors: Middleware de Express.js que permite configurar la política de intercambio de recursos entre diferentes dominios, para permitir solicitudes HTTP desde determinado dominios o hosts en la API.
- Express-fileupload: Usado para facilitar la carga de archivos en la aplicación, especificamente las imágenes de los platos.
- fs-extra: Extensión del módulo fs (File System) de Node.js que proporciona funciones adicionales para trabajar con archivos y directorios de manera más conveniente. Se utiliza para realizar operaciones de lectura y escritura de imagenes de platos en la carpeta uploads cuando son subidas.

## Standard
- Uso de rutas descriptivas: Las rutas de la API están diseñadas de manera que sean descriptivas y representen recursos específicos. Por ejemplo, /api/platos para obtener una lista de platos o /api/clientes/:id para obtener un cliente específico por su ID.
- Verbos HTTP: La API hace uso de los verbos HTTP estándar (GET, POST, PUT, DELETE) para realizar operaciones CRUD (Create, Read, Update, Delete) en los recursos.
- Respuestas HTTP: Las respuestas HTTP devueltas por la API siguen los códigos de estado estándar (por ejemplo, 200 OK, 404 Not Found, 500 Internal Server Error) y contienen información adicional según sea necesario (por ejemplo, en el cuerpo de la respuesta bajo el atributo "message").
- Formato de datos: La API utiliza formatos de datos estándar para intercambiar información, como JSON (JavaScript Object Notation), que es comúnmente utilizado en las APIs RESTful debido a su ligereza y facilidad de lectura y escritura.
- Estructura de archivos: "Vertical Slice Architecture". Se organiza el código alrededor de las características o funcionalidades completas de la aplicación. Cada "slice" representa una característica completa de la aplicación, y todos los componentes necesarios para implementar esa característica se agrupan juntos.
