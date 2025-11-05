//Importar elementos del DOM
const ventana = document.querySelectorAll('.subventana');
const munheco = document.querySelector('.munheco');
const subventana = document.querySelectorAll('.subventana');
const botonReset = document.querySelector('.botonReset');
const marcoAvisos = document.querySelector('.avisos');
const ventanas = document.querySelector('.ventanas')

let numeroDeMuertes = 0;

function moverMunheco() {
    event.stopPropagation();
    const numeroRandom = Math.floor(Math.random() * ventana.length);
    if(munheco) {
        ventana[numeroRandom].appendChild(munheco);
    }
    console.log(`muñeco movido a ventana ${numeroRandom}`)
};

function revivirMunheco() {
    const nuevoMunheco = document.createElement('div');
    nuevoMunheco.className = 'Munheco';
    ventanas.appendChild(munheco);
    nuevoMunheco.onclick = moverMunheco;
    marcoAvisos.innerHTML = "";
}

subventana.forEach((element, i) => {
    if(!element.dataset.eventListenerAdded) {
        element.addEventListener('click', () => {
            botonReset.style.backgroundColor = 'red';
            botonReset.style.color = 'white';
            munheco.remove()
            numeroDeMuertes++;
            marcoAvisos.innerHTML = `Perdiste ${numeroDeMuertes} veces`;
            console.log(`has muerto ${numeroDeMuertes}`)
        });
        element.dataset.eventListenerAdded = true;
    }
});

/*munheco.onclick = moverMunheco(munheco); esto no se puede hacer
para poder hacer eso hay que hacer :
    munheco.onclick = function() {
        moverMunheco(munheco)
    }
*/
munheco.onclick = moverMunheco;
botonReset.onclick = revivirMunheco;