
// -----------SLIDER---------------
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3, // Corrección de la opción
    spaceBetween: 30,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination:{
        el:".swiper-pagination",
        clickable:true,

    },
    navigation:{
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev"
    },

    brekpoints:{
        0:{
            slidesPerView:1
        },
        520:{
            slidesPerView:2
        },
        950:{
            slidesPerView:3
        }
    }

});
// -------CARRITO------------------
const carrito = document.getElementById('carrito');
const elementos = document.getElementById('lista');
const elementos2 = document.getElementById('lista-2');
const elementos3 = document.getElementById('lista-3');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarcarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();
function cargarEventListeners(){
    elementos.addEventListener('click',comprarElemento);
    elementos2.addEventListener('click',comprarElemento);
    elementos3.addEventListener('click',comprarElemento);


    carrito.addEventListener('click',eliminarElemento);

    vaciarcarritoBtn.addEventListener('click',vaciarcarrito);

    document.addEventListener('DOMContentLoaded',leerLocalStorage);

}

function comprarElemento(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const elemento = e.target.parentElement.parentElement;
        leerDatosElementos(elemento);

    }
}

function leerDatosElementos(elemento){
    const infoElemento = {
        imagen : elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento){
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>

        <img src="${elemento.imagen}" width=100>
    </td>
    <td>

        ${elemento.titulo}
    </td>
    <td>

        ${elemento.precio}
    </td>
    <td>

        <a href="#" class="borrar" data-id="${elemento.id}">X</a>
    </td>
    `;

    lista.appendChild(row);
    guardarElementoLocalStorage(elemento);

}

function eliminarElemento(e){
    e.preventDefault();

    let elemento,
        elementoId;
    
    if(e.target.classList.contains('borrar')){
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = elemento.querySelector('a').getAttribute('data-id');
        
        
    }
    eliminarElementoLocalStorage(elemento)
}

function vaciarcarrito(){
    while(lista.firstChild)
    {
        lista.removeChild(lista.firstChild);
    }

    vaciarLocalStorage();
    return false;

}
function guardarElementoLocalStorage(elemento){
    let elementos;
    elementos = obtenerElementosLocalStorage;
    elementos.push(elemento);

    localStorage.setItem('elemetos', JSON.stringify(elementos));
}
function obtenerElementosLocalStorage(){
    let elementosLs;
    if(localStorage.getItem('elementos')=== null){
        elementosLs = [];

    }
    else{
        elementosLs = JSON.parse(localStorage.getItem('elementos'));
    }
    return elementosLs;

}

function leerLocalStorage(){
    let elementosLs;
    elementosLs = obtenerElementosLocalStorage();
    elementosLs.forEach(function(elemento){

            const row = document.createElement('tr');
            row.innerHTML = `
            <td>
        
                <img src="${elemento.imagen}" width=100>
            </td>
            <td>
        
                ${elemento.titulo}
            </td>
            <td>
        
                ${elemento.precio}
            </td>
            <td>
        
                <a href="#" class="borrar" data-id="${elemento.id}">X</a>
            </td>
            `;
        
            lista.appendChild(row);

    });
}

function eliminarElementoLocalStorage(elemento){
    let elementosLS;
    elementosLs = obtenerElementosLocalStorage();
    elementosLs.forEach(function(elementosLS, index){
        if(elementosLS.id === elemento){
            elementosLS.splice(index, 1);
        }
    });

    localStorage.setItem('elementos',JSON.stringify(elementosLs));
}

function vaciarLocalStorage(){
    localStorage.clear();
    alert("Ha comprado")
}