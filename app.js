"use strict";

let productosModificados = [];
let disponibles = [];
let agotados = [];

async function cargarCatalogo(){
    // Contenedor del listado de productos
    const contenedor = document.querySelector("#lista-productos");
    const mensajeEstado = document.querySelector("#mensaje-estado");
    
    try{

        function mostrarSkeletons() {
            contenedor.replaceChildren();
        
            for (let i = 0; i < 6; i++) {
                const columna = document.createElement("div");
                columna.className = "col-12 col-md-6 col-xl-4";

                columna.innerHTML = `
                    <div class="card h-100" aria-hidden="true">
                        <div class="placeholder-glow">
                            <div class="placeholder col-12" style="height: 180px;"></div>
                        </div>
                        <div class="card-body placeholder-glow">
                            <h5 class="placeholder col-9"></h5>
                            <p class="placeholder col-5"></p>
                            <span class="placeholder col-4"></span>
                        </div>
                    </div>
                `;
                contenedor.append(columna);
            }
        }

        mostrarSkeletons()

      
        const respuesta = await fetch("https://dummyjson.com/products?limit=30");
        await new Promise(resolve => setTimeout(resolve, 1000));

        if(!respuesta.ok){
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        const { products } = datos;

        productosModificados = products.map((producto, indice) => {
            if (indice < 3) {
                return {
                    ...producto,
                    stock: 0
                };
            }
            return producto;
        });

        console.log(productosModificados)

        // Filtamos las condicionales de stock > 0 para disponibles y para agotados sotck === 0
        disponibles = productosModificados
        .filter(({ stock }) => stock > 0);
        agotados = productosModificados
        .filter(({ stock }) => stock === 0);
        
        // Asignamos los valores reales de la api para mostrar los textos de cantidad de productos, productos disponibles y agotados
        document.querySelector("#total-productos").textContent = products.length;
        document.querySelector("#total-disponibles").textContent = disponibles.length;
        document.querySelector("#total-agotados").textContent = agotados.length;

       
        mostrarProductos(productosModificados)

    }catch(error)
    {
        console.log(error)
        document.querySelector("#total-productos").textContent = "Error";
        mensajeEstado.textContent = "No se pudo conectar con la API. Intenta recargar la página.";
        mensajeEstado.classList.remove("d-none");
        mensajeEstado.classList.replace("alert-info", "alert-danger");
    }
}

function mostrarProductos(lista) {
    const contenedor = document.querySelector("#lista-productos");

    contenedor.replaceChildren();
    const conteoResultados = document.querySelector("#conteo-resultados");
    const sinResultados = document.querySelector("#sin-resultados");
    
    conteoResultados.textContent = (lista.length === 1) ?
    `${lista.length} producto encontrado` :
    `${lista.length} productos encontrados`

    sinResultados.classList.toggle("d-none", lista.length > 0);

    for (const producto of lista) {
        const { title, price, thumbnail, stock } = producto

        const estado = document.createElement("span");
        estado.textContent = (stock > 0) ? "Disponible" : "Agotado"
        estado.className = (stock > 0) ? "badge bg-success" : "badge bg-danger"
            
        const columna = document.createElement("div");
        columna.className = "col-12 col-md-6 col-xl-4";

        // Creamos la tarjeta div y asignamos la clase card
        const tarjeta = document.createElement("div");
        tarjeta.className = "card h-100";

        const imagen = document.createElement("img");
        imagen.className = "card-img-top"
        imagen.src = thumbnail
        imagen.alt = title;
        imagen.loading = "lazy";

        const cuerpo = document.createElement("div");
        cuerpo.className = "card-body";

        // Creamos el tituo h5 y le asignamos el texto del titulo del endpoint  que estamos construyendo a tra vez del destructuring relacaionado con el primer producto
        const titulo = document.createElement("h5");
        titulo.textContent = title;

        // Creamos el parrafo p y le asignamos como texto el precio que estamos construyendo a traves del destructuring del primer producto
        const precio = document.createElement("p");
        precio.textContent = `$${price}`;

        contenedor.append(columna); // El contenedor recibe la columna
        columna.append(tarjeta);    // La columna recibe la tarjeta
        tarjeta.append(imagen, cuerpo);     // La tarjeta recibe imagen y cuerpo
        cuerpo.append(titulo, precio, estado); // El cuerpo recibe ambos
    }
}

const btnRecargar = document.querySelector("#btn-recargar");

btnRecargar.addEventListener("click", () => {
    cargarCatalogo();
});

 // El input de search
const buscador = document.querySelector("#buscar-producto");

buscador.addEventListener("input", () => {
    const busqueda = buscador.value.toLowerCase();
    const resultado = productosModificados.filter(({ title }) => { return title.toLowerCase().includes(busqueda) });
    mostrarProductos(resultado)
});

// El filtro de estados de productos
const filtroEstado = document.querySelector("#filtro-estado");

filtroEstado.addEventListener('change', () => {
    let opcion = filtroEstado.value;
    
    if(opcion === "disponible"){
        mostrarProductos(disponibles)
    }else if(opcion === "agotado"){
        mostrarProductos(agotados)
    }else{
        mostrarProductos(productosModificados)
    }
})

cargarCatalogo();