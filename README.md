# Tareas y Notas

La aplicación sobre Tareas y Notas es una solución web y móvil que ha sido diseñada para brindar a los usuarios una manera eficiente de administrar sus actividades diarias. Entre las características que ofrece se encuentran la capacidad de crear, editar y eliminar tareas. También permite asignar etiquetas y fechas de vencimiento para organizar mejor las tareas. La interfaz de usuario es intuitiva y fácil de usar, lo que hace que la gestión de tareas sea una experiencia sencilla y efectiva.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Instalación

1. **Clonar el Repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/tu-proyecto.git
    cd tu-proyecto
    ```

2. **Instalar Dependencias:**

    ```bash
    npm install
    ```

3. **Servicios utilizados:**

    - "dependencies": {
        "@angular/core": "^16.2.0",
        "@angular/fire": "^16.0.0",
        "@angular/forms": "^16.2.0",
        "@angular/platform-browser": "^16.2.0",
        "@angular/platform-browser-dynamic": "^16.2.0",
        "@angular/router": "^16.2.0",
        "@angular/service-worker": "^16.2.0",
        "firebase": "^10.6.0",
        "rxjs": "~7.8.0",
        "tslib": "^2.3.0",
        "zone.js": "~0.13.0"
      }

4. **Lanzar la Aplicación:**

    ```bash
    ng serve 'o
    ```

## Uso

Para usar la aplicacion tanto en desktop como en movil estara el formulario donde campos como: Nombre,  Fecha y contenido son obligatorios, por parte de las etiquetas estas pueden ser opcionales
<img width="1279" alt="image" src="https://github.com/DanielCollaguazo2003/Proyecto_Tareas_PWA_Angular_Firebase/assets/109354364/1248849f-2552-4d06-94a8-c0b86327d75f">
 Dentro de la lista podremos eliminar o actualizar/observar la tarea
 <img width="1272" alt="image" src="https://github.com/DanielCollaguazo2003/Proyecto_Tareas_PWA_Angular_Firebase/assets/109354364/20640eaf-3d10-4dc6-90e2-939c668c0489">
En la parte movil tendremos un menu de navegacion para la lista y el formulario
<img width="304" alt="image" src="https://github.com/DanielCollaguazo2003/Proyecto_Tareas_PWA_Angular_Firebase/assets/109354364/bf12dd87-3e2c-4a58-9b1a-f452e9cce465">

## Estructura del Proyecto

El proyecto esta diseñado para el manejo de tareas y notas utilizando los servicios de Firebase y PWA para poder instalarla en nuestros dispositivos, basicamente tendremos un formulario donde el usuario podra crear tareas o notas y un formulario donde podra observar sus tareas endientes o creadas, asi mismo como funciones para Crear, Eliminar, Actualizar y Observar la tarea. Por otro lado la parte de PWA dara un dinamismo a la pagina gracias al uso de su modo ofline guardando en cache las peticiones requeridas

## Tecnologías Utilizadas

- Angular
- Firestore
- PWA
- HTML
- CSS
- TypeScrip


## Licencia

Proyecto creado por Daniel Collaguazo Malla


# ProyectoPrueba

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
