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
const botonModoDificil = document.querySelector('.modoDificil')
//variable que guarda la cantidad de muertes, para así hacer un sistema de muertes
let numeroDeMuertes = 0;
//variable que guarda el timeout del modo difícil
let timeOutA = '';
//Esta función mueve el muñeco de div, para simular la desaparición de un sitio y apareción en otro
let puntos = 0;
function moverMunheco() {
    event.stopPropagation();
    const numeroRandom = Math.floor(Math.random() * ventana.length);
    if(munheco) {//Este If es un poco inútil
        ventana[numeroRandom].appendChild(munheco);
        puntos++;
        marcoAvisos.innerHTML = `llevas ${puntos} puntos`;
    };
    console.log(`muñeco movido a ventana ${numeroRandom}`);
};
//Esta función vuelve a añadir el muñeco al espacio de ventanas
function resetGame() {
    munheco.remove()
    ventanas.appendChild(munheco);
    marcoAvisos.innerHTML = "";
    clearTimeout(timeOutA)
    puntos = 0;
};

function modoDificil() {
    let numeroRandom2 = Math.floor(Math.random() * ventana.length);
    timeOutA = setTimeout(() => {
        if(munheco) {
            moverMunheco()
        }
        modoDificil()
        console.log(`el muñeco se ha movido solo a la ventana ${numeroRandom2}`)
    },1200);
    
};
//Esta función añade un listener a cada subventana, para así hacer la acción de fallo, al llegar a la cantidad de 3 fallos muestra una imagen en pantalla junto a un mensaje
subventana.forEach((element, i) => {
    if(!element.dataset.eventListenerAdded) {
        element.addEventListener('click', () => {
            botonReset.style.backgroundColor = 'red';
            botonReset.style.color = 'white';
            munheco.remove()
            clearTimeout(timeOutA)
            numeroDeMuertes++;//Aquí se actualiza el contador de muertes para luego ir comprobando según se vaya ejecutando el listener
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
                    });
                };
            };
            puntos = 0;
            marcoAvisos.innerHTML = `Perdiste ${numeroDeMuertes} veces`;
            console.log(`has muerto ${numeroDeMuertes}`)
        });
        element.dataset.eventListenerAdded = true;
    };
});

/*munheco.onclick = moverMunheco(munheco); esto no se puede hacer
para poder hacer eso hay que hacer :
    munheco.onclick = function() {
        moverMunheco(munheco)
    }
*/
//Al hacer click en el muñeco se ejecuta la función que mueve el muñeco de div
munheco.onclick = moverMunheco;
//Al hacer click en el botón el muñeco vuelve a aparecer en el espacio de ventanas
botonReset.onclick = resetGame;
//Al hacer click se activa el modo difícil que hace que el munheco se mueva solo todo el rato
botonModoDificil.onclick = modoDificil;





