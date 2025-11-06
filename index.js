//Importar elementos del DOM
const ventana = document.querySelectorAll('.subventana');
const munheco = document.querySelector('.munheco');
const subventana = document.querySelectorAll('.subventana');
const botonReset = document.querySelector('.botonReset');
const marcoAvisos = document.querySelector('.avisos');
const ventanas = document.querySelector('.ventanas')
const textoImagenDesonrra = document.querySelector('.textoImagenDesonrra');
const imagenDesonrraNinho = document.querySelector('.imagenDesonrraNinho');
const imagenDesonrra = document.querySelector('.imagenDesonrra');

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
    ventanas.appendChild(munheco);
    marcoAvisos.innerHTML = "";
}

subventana.forEach((element, i) => {
    if(!element.dataset.eventListenerAdded) {
        element.addEventListener('click', () => {
            botonReset.style.backgroundColor = 'red';
            botonReset.style.color = 'white';
            munheco.remove()
            numeroDeMuertes++;
            if(numeroDeMuertes == 3) {
                textoImagenDesonrra.innerHTML = `has muerto ${numeroDeMuertes} veces, eres un mierdas`
                const imagenNinho = document.createElement('img');
                imagenNinho.className = 'img';
                imagenNinho.src = './fotos/imagenNinho.png'
                imagenDesonrraNinho.appendChild(imagenNinho);
                imagenDesonrra.style.display = 'flex';
                if(!imagenNinho.dataset.eventListenerAdded) {
                    imagenNinho.addEventListener('click', () => {
                        imagenDesonrra.style.display = 'none';
                    })
                }
            }
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
