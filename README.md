# Catálogo de productos con JavaScript

Aplicación web desarrollada con **HTML, CSS, JavaScript y Bootstrap** como práctica de consumo de APIs REST, manipulación del DOM y manejo de eventos.

El proyecto consiste en un catálogo de productos que obtiene información de una API pública y permite visualizar, buscar y filtrar productos según su disponibilidad, sin necesidad de recargar la página.

## Objetivo de la práctica

Reforzar los fundamentos de JavaScript mediante un proyecto funcional que integre peticiones HTTP, programación asíncrona, métodos de arreglos y actualización dinámica de elementos HTML.

La práctica también busca comprender cómo organizar las funciones y los eventos para evitar ejecuciones innecesarias y mantener el código más ordenado.

## Funcionalidades

- **Consumo de API:** consulta de 30 productos mediante `fetch()`.
- **Catálogo dinámico:** generación de tarjetas HTML utilizando JavaScript.
- **Búsqueda en tiempo real:** filtrado de productos por nombre mientras el usuario escribe.
- **Filtro de disponibilidad:** visualización de todos los productos, disponibles o agotados.
- **Contadores:** muestra el total de productos, disponibles y agotados.
- **Estados simulados:** los primeros tres productos se marcan como agotados para probar los filtros.
- **Skeleton loading:** muestra tarjetas de carga mientras se obtiene la información.
- **Actualización del catálogo:** permite consultar nuevamente la API mediante un botón, sin recargar toda la página.
- **Manejo de errores:** muestra un mensaje cuando falla la petición a la API.
- **Diseño responsivo:** distribución de las tarjetas mediante el sistema de columnas de Bootstrap.

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura de la aplicación |
| CSS3 | Estilos de la interfaz |
| JavaScript (ES6+) | Lógica, eventos y manipulación del DOM |
| Bootstrap 5 | Componentes, diseño responsivo y skeletons |
| DummyJSON | API pública para obtener productos |

## API utilizada

El proyecto consume el siguiente endpoint:

`https://dummyjson.com/products?limit=30`

La API devuelve un objeto JSON que contiene un arreglo de productos.

Para construir las tarjetas se utilizan propiedades como:

- `title`: nombre del producto.
- `price`: precio.
- `thumbnail`: imagen.
- `stock`: cantidad de unidades disponibles.

Los primeros tres productos se modifican localmente para asignarles `stock: 0`. Esto permite probar los filtros de disponibilidad sin modificar la información original de la API.

## Funcionamiento

### 1. Carga de productos

Al iniciar la aplicación, se ejecuta la función asíncrona `cargarCatalogo()`.

Esta función muestra primero los skeletons, realiza una petición HTTP mediante `fetch()` y espera la respuesta utilizando `await`.

Una vez recibidos los datos, se procesan los productos y se actualiza la interfaz.

### 2. Procesamiento de datos

Se utiliza `map()` para crear un nuevo arreglo de productos y modificar el stock de los primeros tres elementos mediante el operador spread (`...`).

Posteriormente, `filter()` permite separar los productos en dos arreglos: disponibles y agotados.

Los resultados también se utilizan para actualizar los contadores del catálogo.

### 3. Renderizado dinámico

La función `mostrarProductos(lista)` recibe un arreglo y genera las tarjetas correspondientes.

Para construir los elementos se utilizan métodos del DOM como:

- `document.createElement()`
- `document.querySelector()`
- `append()`
- `replaceChildren()`
- `textContent`
- `classList`

Las tarjetas incluyen imagen, nombre, precio y una etiqueta visual de disponibilidad.

### 4. Búsqueda y filtros

El buscador utiliza el evento `input` para detectar los cambios mientras el usuario escribe.

La búsqueda combina `filter()`, `toLowerCase()` e `includes()` para encontrar productos por nombre sin distinguir entre mayúsculas y minúsculas.

El selector de disponibilidad utiliza el evento `change` para mostrar los productos correspondientes al estado seleccionado.

Ambos eventos se registran una sola vez, fuera de la función encargada de consultar la API.

### 5. Skeleton loading

Antes de realizar la petición se generan seis tarjetas temporales utilizando los placeholders de Bootstrap.

Se incluye una espera artificial de un segundo mediante una promesa y `setTimeout()` para poder observar el estado de carga durante la práctica.

Cuando termina el procesamiento de los datos, los skeletons se reemplazan por las tarjetas de los productos.

### 6. Actualización del catálogo

El botón **Actualizar catálogo** vuelve a ejecutar `cargarCatalogo()`.

Esto permite consultar nuevamente la API, mostrar los skeletons y actualizar el contenido sin utilizar `location.reload()` ni recargar todo el documento.

### 7. Manejo de errores

La petición está controlada mediante `try...catch`.

Se verifica la propiedad `response.ok` y, si la respuesta HTTP no es satisfactoria, se lanza un error mediante `throw new Error()`.

Cuando ocurre un problema, se muestra un mensaje de error en la interfaz.

## Conceptos de JavaScript practicados

Durante el desarrollo se trabajaron los siguientes conceptos:

| Concepto | Aplicación |
|---|---|
| `async / await` | Manejo de operaciones asíncronas |
| `fetch()` | Consumo de una API REST |
| `try...catch` | Captura y manejo de errores |
| Promesas | Espera artificial mediante `setTimeout()` |
| Arrow functions | Callbacks y procesamiento de arreglos |
| Destructuring | Extracción de propiedades de objetos |
| Spread syntax | Copia y modificación de objetos |
| `map()` | Transformación de productos |
| `filter()` | Búsqueda y filtros por disponibilidad |
| `for...of` | Recorrido de productos para generar tarjetas |
| `addEventListener()` | Manejo de eventos del usuario |
| Scope | Alcance de variables y funciones |
| `let` y `const` | Declaración y reasignación de variables |
| Operador ternario | Condiciones para textos y clases CSS |
| Template literals | Construcción de textos dinámicos |
| DOM | Creación y actualización de elementos HTML |

## Cómo ejecutar el proyecto

1. Clonar el repositorio:

   ```bash
   git clone URL_DEL_REPOSITORIO
   ```

2. Abrir la carpeta del proyecto en Visual Studio Code.

3. Ejecutar `index.html` utilizando Live Server o un servidor local.

4. Esperar a que se carguen los productos desde DummyJSON.

No se requiere instalar dependencias de Node.js ni configurar variables de entorno para consumir la API.

## Consideraciones

- La información de los productos proviene de DummyJSON y se utiliza únicamente con fines de aprendizaje.
- La modificación del stock se realiza localmente y no afecta a la API.
- La espera artificial de un segundo se agregó para practicar los estados de carga.
- La búsqueda por nombre y el filtro de disponibilidad funcionan de manera independiente.
- El proyecto no utiliza frameworks de JavaScript; la lógica está desarrollada con JavaScript nativo.

## Propósito

Este proyecto forma parte de mi práctica de desarrollo frontend con JavaScript.

El objetivo no es solamente consumir una API, sino comprender el flujo de ejecución del código, el comportamiento de las funciones asíncronas, la manipulación del DOM y la interacción del usuario mediante eventos.