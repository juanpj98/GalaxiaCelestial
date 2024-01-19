document.addEventListener("DOMContentLoaded", function(e){

    const parrafos = document.querySelectorAll('.descripcion')

    let alturas = [];
    let alturaMaxima = 0;

    const aplicarAlturas = (function aplicarAlturas(){
        
        parrafos.forEach(parrafos =>{
            if(alturaMaxima == 0){
                alturas.push(parrafos.clientHeight);

            }
            else{
                parrafos.style.hegiht = alturaMaxima + "px";
            }
        });
        return aplicarAlturas;
    })();
    alturaMaxima = Math.max.apply(Math, alturas);

    aplicarAlturas();
})

