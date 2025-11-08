//Importamos los elementos del DOM
const pointsMarc = document.querySelector('.points');
const noticeMarc = document.querySelector('.notice');
const pmaxMarc = document.querySelector('.pmax');
const windowGame = document.querySelector('.window');
const subwindow = document.querySelectorAll('.subwindow');
const box = document.querySelector('.box');
const box2 = document.querySelector('.box2');
const ninoDiv = document.querySelector('.nino');
const darkMode = document.querySelector('.dark-mode');

//Importamos los botones
const dModeButton = document.querySelector('.d-mode');
const resetGameButton = document.querySelector('.reset-game');

//defino las variables de puntos ...etc
let points = 0;
let maxPoints = [];
let failCounter = 0;

//gurado el timeOut de el modo difícil
let timeoutA = null;

//Defino la función que mueve la caja entre las subventanas
function boxMove() {
    const randomNumber = Math.round(Math.random() * subwindow.length - 1);
    subwindow[randomNumber].appendChild(box);

    if (!box.dataset.eventListenerAdded) {
        box.addEventListener('click', (event) => {

            event.stopPropagation();

            if(points == 25) {
                box.style.borderRadius = '50%';
            };

            if(points == 50) {
                box.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                box.style.backgroundColor = 'blue';
                // Mantén el tamaño original
                box.style.height = '70px';
                box.style.width = '70px';
                box.style.borderRadius = '0%';
            };

        });
        box.dataset.eventListenerAdded = true;

    };
    points++;
    if(points == 1) {
        pointsMarc.innerHTML = "llevas 1 punto";
    } else if (points > 1) {
        pointsMarc.innerHTML = `llevas ${points} puntos`;
    }

};

//Defino la función que mueve automaticamente la caja
function difficultMode() {
    const randomNumber2 = Math.round(Math.random() * subwindow.length - 1);

    box.remove();
    box2.style.display = 'block';

    if(!box2.dataset.eventListenerAdded) {

        box2.addEventListener('click', (event) => {
            
            points++;
            if(points == 1) {
                pointsMarc.innerHTML = "llevas 1 punto";
            } else if (points > 1) {
                pointsMarc.innerHTML = `llevas ${points} puntos`;
            }

            event.stopPropagation();

            if(points == 25) {
                box2.style.borderRadius = '50%';
            };

            if(points == 50) {
                box2.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                box2.style.backgroundColor = 'blue';
                // Mantén el tamaño original
                box2.style.height = '70px';
                box2.style.width = '70px';
                box2.style.borderRadius = '0%';
            };

        });

        box2.dataset.eventListenerAdded = true;

    };

    function boxMove2 () {
        subwindow[randomNumber2].appendChild(box2);
        console.log(`el cubo se ha modivo a la casilla ${randomNumber2}`);
    };

    boxMove2();

    clearTimeout(timeoutA);
    timeoutA = setTimeout(() => {
        difficultMode()
    }, 1200);

};

//event listener para indicar la subwindow en la que se falló
subwindow.forEach((element, i) => {
    if(!element.dataset.eventListenerAdded) {
        element.addEventListener('click', () => {

            failCounter++;
            if(failCounter == 3) {

                const imgNino = document.createElement('img');
                imgNino.className = 'ninoImg';
                imgNino.src = './fotos/imagenNinho.png';
                ninoDiv.appendChild(imgNino);
                noticeMarc.innerHTML = 'has perdido ya 3 veces, mierdas';

                if(!imgNino.dataset.eventListenerAdded) {
                    imgNino.addEventListener('click', () => {
                        imgNino.style.display = 'none';
                    });
                    imgNino.dataset.eventListenerAdded = true;
                };

            } else if(failCounter > 3) {
                noticeMarc.innerHTML = 'has perdido ya más de 3 veces, eres un real mierdas';
            };

            const zoneDeath = document.createElement('div');
            zoneDeath.className = 'zoneDeathCircle';
            zoneDeath.style.height = '110px';
            zoneDeath.style.width = '110px';
            zoneDeath.style.borderRadius = '50%';
            zoneDeath.style.position = 'absolute';
            zoneDeath.style.alignSelf = 'center';
            zoneDeath.style.justifySelf = 'center';
            zoneDeath.style.backgroundColor = 'red';

            element.appendChild(zoneDeath);

            box.style.display = 'none';
            box2.style.display = 'none';
            clearTimeout(timeoutA);

        });
        element.dataset.eventListenerAdded = true;
    };
});

//función para reiniciar el juego
function resetGame() {

    box.remove();
    box2.remove();
    const zoneDeath = document.querySelectorAll('.zoneDeathCircle');
    zoneDeath.forEach(element  => {
        element.remove();
    })
    box.removeAttribute('style');
    box2.removeAttribute('style');
    box.className = 'box';
    box2.className = 'box2';
    maxPoints.push(points);

    subwindow.forEach(element => {
        element.style.backgroundColor = 'transparent';

    });

    for (i = 0; i < maxPoints.length; i++) {
        if(maxPoints[i] > points) {
            pmaxMarc.innerHTML = `puntuación máxima ${maxPoints[i]}`;
            points = maxPoints[i];
        } else {
            pmaxMarc.innerHTML = `puntuación máxima ${points}`;
        };
    };

    points = 0;
    clearTimeout(timeoutA);
    box.className = 'box';
    windowGame.appendChild(box);
    box.style.display = 'block';
};

let github = document.createElement('a');
github.style.width = '100%';
github.target = '_blank';
github.textContent = 'GitHub';
github.className = 'github-perfil';
github.href = 'https://github.com/elskussa';
github.style.textDecoration = 'none';
github.style.color = 'black';
github.style.textAlign = 'center';
github.style.textDecoration = 'none';

const footer = document.querySelector('footer');
console.log(footer)
footer.style.display = 'flex';
footer.style.flexDirection = 'column';
footer.style.justifyContent = 'center';
footer.style.alignItems = 'center';
footer.style.marginTop = '20px';

footer.appendChild(github);

//función para cambiar el fondo
function switchBackgroundColor() {//chatGPT
    // Aplicar transición suave
    document.body.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    // Pequeño retraso para mejor UX
    setTimeout(() => {
        document.body.style.backgroundColor = 'rgb(10, 21, 41)';
        document.body.style.color = 'white';
        github.style.color = 'white';
    }, 50);
}

box.onclick = boxMove;
resetGameButton.onclick = resetGame
dModeButton.onclick = difficultMode;
darkMode.onclick = switchBackgroundColor;
