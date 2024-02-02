//Declaración de constantes.
const MAX_INTENTOS = 6;
const MAX_COMBI_COLORES = 4;
const COLORS = ['white', 'blue', 'green', 'violet', 'yellow', 'red', 'orange', 'cyan'];
const GREY = "grey";
const WHITE = "white";
const BLACK = "black";


/** Template con el código HTML que corresponde a cada fila de juego/intento. */
const ROW_RESULT = `
<div class="rowResult w100 flex wrap center">
    <div class="rowUserCombi w100 flex wrap">
       <div class="w25 flex">
           <div class="cel flex"></div>
       </div>
       <div class="w25 flex">
           <div class="cel flex"></div>
       </div>
       <div class="w25">
           <div class="cel flex"></div>
       </div>
       <div class="w25">
           <div class="cel flex"></div>
       </div>
    </div>
    <div class="rowCercleResult w25 flex wrap center">
       <div class="w25 h25">
            <div class="cercleResult flex"></div>
       </div>
       <div class="w25 h25">
           <div class="cercleResult flex"></div>
       </div>
       <div class="w25 h40">
           <div class="cercleResult flex"></div>
       </div>
       <div class="w25 h40">
           <div class="cercleResult flex"></div>
       </div>
    </div>=================================================================================
</div>`; 


//Declaración de variables globales.
let imputColors = document.getElementsByClassName("cel flex");
let cercleResult = document.getElementsByClassName("cercleResult flex");
let button = document.getElementById("check");
let colors = document.getElementsByClassName("w100 cel flex");
const master = [];
const userCombi = [];
var intento = 0;
var aciertos = 0;
var currentColor = 0;
let currentTry = 0;

function init() {
    //1. Genera el código random del master

    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
    master [i] = COLORS[Math.floor(Math.random() * 7)];
    imputColors[i].style.border = "1px solid black";
    
    }
    //2. Crea todas las filas según el número de intentos.
    for (let i = 0; i < MAX_INTENTOS; i++) {
        let fila = document.createElement("div");
        fila.innerHTML = ROW_RESULT;
        document.getElementById("Result").appendChild(fila);
    }
}




/* Llamaremos a esta función desde el botón HTML de la página para comprobar la propuesta de combinación que nos ha
introducido el usuario.
Informamos al usuario del resultado y del número de intentos que lleva*/
function Comprobar() {
    let firstTry = document.getElementsByClassName("w100 info");
    if (currentColor < MAX_COMBI_COLORES) {
        firstTry[0].textContent = "Has introduir 4 colors";
        firstTry[0].style.display = "block";
    }
    else
    {
        firstTry[0].style.display = "none";
        currentColor = 0;
        for (let i = 12 ; i < 16 ; i++) {
            imputColors[i + (4 * currentTry)].style.backgroundColor = userCombi[i-(12)];
            imputColors[i-(12)].style.backgroundColor = "grey";
            if (userCombi[i-(12)] == "white") {
                imputColors[i + (4 * currentTry)].style.border = "1px solid black";
               
            }

            if (userCombi[i-(12)] == master[i-(12)]) {
                cercleResult[i-(12) + (4 * currentTry)].style.backgroundColor = "black";
            }
            else if (master.includes(userCombi[i-(12)])) {
                cercleResult[i-(12) + (4 * currentTry)].style.backgroundColor = "white";
            }
            else {
                cercleResult[i-(12) + (4 * currentTry)].style.backgroundColor = "grey";
            }
        }
        currentTry++;
        if (master.toString() == userCombi.toString()) {
            for (let i = 0 ; i < 4 ; i++) {
                imputColors[i].style.backgroundColor = master[i];
            }
            firstTry[0].textContent = "Felicitats, has guanyat!";
            firstTry[0].style.display = "block";
            endGame();
            
            for (let i = 0 ; i < 8 ; i++) {
                colors[i].disabled = true;
            }
        }
        else if (currentTry == MAX_INTENTOS) {
            for (let i = 0 ; i < 4 ; i++) {
                imputColors[i].style.backgroundColor = master[i];
            }
            firstTry[0].textContent = "Has perdut, aquesta era la combinació correcta";
            firstTry[0].style.display = "block";
            endGame();

        }
    }
    


    
}

/** Procedimiento que se ejecuta cada vez que el usuario selecciona un color, hasta el número máximo de colores permitidos en la combinación. */
function añadeColor(color) {
    if (currentColor < MAX_COMBI_COLORES) {
        
        imputColors[currentColor].style.backgroundColor = color;
        userCombi[currentColor] = color;
         currentColor++;

}
}
function endGame() {

            button.style.backgroundColor = "green";
            button.textContent = "Tornar a Jugar";
            button.setAttribute("onclick", "location.reload()");
            for (let i = 0; i < 8 ; i++) {
                colors[i].removeAttribute("onclick");
            }
}
