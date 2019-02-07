# Kristen - Web Service - App Móvil
Web Service que se conecta a la base de datos kristensie del proyecto 
Kristen para brindar informacion a la aplicacion Movil del proyecto Kristen

Desarrollado por: 
- Mateo Morales García
- Federico López Pellicer
- José Manuel Gutiérrez Pech
- Erick Alexis Hernández

## Pre-requisitos

* Tener instalado Node.JS; este proyecto trabaja con la v8.11.2
* Tener instalado npm; este proyecto trabaja con la v6.1.0
* Tener la base de datos _kristensie_ del proyecto Kristen (corriendo en 127.0.0.1 puerto 3306) a la cual tenga acceso un usuario con el nombre y la contraseña especificados en el datasource correspondiente al entorno en el que se vaya a correr la aplicación
* Tener instalado git

## Instrucciones de instalación

### Entorno Development

Primero, asegurate de que tengas una base de datos llamada **kristensie**, a la que tenga acceso un usuario llamado **kristen** con el password **kristen** en el Local Host.

Esta base de datos debe tener las tablas de la base de datos kristensie del proyecto Kristen.

Luego clona el repositorio, entra a la carpeta del proyecto, instala los paquetes que necesita el proyecto y corre el servidor.
```
$ git clone https://github.com/mmgescuelaup/Kristen-WebService-AppMovil.git
$ cd Kristen-WebService-AppMovil
$ npm install
$ NODE_ENV='development' node .
```

Podrás ver el explorador del API en http://localhost:3000/explorer

Puedes cambiar la base de datos a la que se conecta la aplicacion desde el datasource.development.json, asi como el usuario y la contraseña que usa

### Entorno Production

1. Asegurarse de:
    - tener MariaDB corriendo en el servidor.
    - tener la base de datos kristensie (con la estructura pertinente).
    - tener un usuario con permisos de SELECT en todas las tablas de kristensie.

2. Clonar el repositorio, entrar a la carpeta del proyecto, instalar los paquetes que necesita el proyecto

    ```
    $ git clone https://github.com/mmgescuelaup/Kristen-WebService-AppMovil.git
    $ cd Kristen-WebService-AppMovil
    $ npm install
    ```

3. Escribir el token en el archivo [setToken.js](server/boot/setToken.js)
    ```js
    app.TOKEN = '<ponga-aqui-su-token>';
    ```
4. Configurar usuario y contraseña en [datasource.production.json](server/datasources.production.json)
    ```json
    {
        "db": {
            "host": "127.0.0.1",
            "port": 3306,
            "url": "",
            "database": "kristensie",
            "password": "<escribir-contraseña>",
            "name": "db",
            "user": "<escribir-usuario>",
            "connector": "mysql",
            "socketPath": "<escribir/path/al/mysql/mysql.sock>",
            "lazyConnect": true
        }
    }
    ```
    ###### Nota: el atributo socketPath puede que no sea necesario, dependiendo de la configuracion y el sistema operativo

5. Corre el programa con la variable ENV de _production_ para comprobar que funciona

    `$ NODE_ENV='production' node .`

    
Desarrollado con Loopback 3
