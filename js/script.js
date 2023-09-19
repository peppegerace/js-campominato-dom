// Programma che al click di un bottone genera una griglia di gioco quadrata.

// 1. Selezionare il bottone e salvarlo in una variabile.

// 2. Mettere in ascolto il bottone e scatenare un evento al 'click'.

// 3. Al click del bottone selezionare il container contenente la griglia.

// 4. Fare un ciclo su 100 (quanto il numero di blocchi che vogliamo avere in griglia).

// 5. Generare un quadrato ad ogni ciclo.

// 6. Ad ogni quadrato generato aggiungere un evento "click".

// 7. Al click del quadrato aggiungere o togliere la classe "clicked".

// 8. Aggiungere il quadrato al conteiner.

/***************SECONDA PARTE *************** */

// 9. Creare un array vuoto per le bombe.

// 10. Generare 16 numeri casuali unici ed inserirli nell'array delle bombe.

// 11. Creare un array per tenere traccia delle celle cliccate.

// 12. Creare una funzione che avvii il gioco.

// 13. Determinare le condizioni per la vittoria o la sconfitta nel gioco.

// 14. Alla fine del gioco, mostra il punteggio, visualizza tutte le bombe in griglia e congela il gioco.


// Variabili globali
const buttonGenerator = document.querySelector('.btn-custom')
const levelSelect = document.querySelector('#level');
let squareNumbers;
const levels = [100, 81, 49];
let bombe = []; 
let giocoFinito = false;
let punteggio = 0;
const contenitore = document.querySelector('.wrapper')


// 2.
buttonGenerator.addEventListener('click', function(){
  reset();
  giocoFinito = false; 
  const messaggioDiv = document.querySelector('.messaggio');
  messaggioDiv.textContent = '';
  punteggio = 0
  generatePlay();
})

/************FUNZIONI************/ 

// funzione per generare una cella nella griglia
function createSquare(index) {
  const square = document.createElement('div');
  square.className = 'square';
  square.classList.add('square' + squareNumbers)
  square._squareID = index;
  return square;
}

// funzione per generare numeri random
function generaNumeroCasuale(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Funzione per generare le bombe
function generaBombe() {
  bombe = [];
  while (bombe.length < 16) {
    const numeroCasuale = generaNumeroCasuale(1, squareNumbers + 1);
    if (!bombe.includes(numeroCasuale)) {
      bombe.push(numeroCasuale);
    }
  }
}

// Funzione per terminare il gioco e mostrare il punteggio
function fineGioco(vittoria) {
  const messaggioDiv = document.querySelector('.messaggio');
  if (vittoria) {
    messaggioDiv.textContent = `Hai vinto! Il tuo punteggio è ` +punteggio;
  } else {
    messaggioDiv.textContent = `Hai perso! Il tuo punteggio è ` +punteggio;
  }

  giocoFinito = true; // Imposta il gioco come finito

  // Congela la griglia
  const celle = document.querySelectorAll('.square');
  celle.forEach(function (cella) {
    cella.removeEventListener('click', function () { });
  });
}

// funzione di reset
function reset () {
  const contenitore = document.querySelector('.wrapper')
  contenitore.innerHTML = '';
}

// funzione per attivare il tasto play
function generatePlay () {
 
  squareNumbers = levels[levelSelect.value]
  const grid = document.createElement('div');
  grid.className = 'game-wrapper'

  // 4.
  for (let i = 1; i <= squareNumbers; i++) {
    // 5.
    const square = createSquare(i);
    // 8.
    grid.append(square);
  }

  contenitore.append(grid)

  // Genera le bombe
  generaBombe();

  // aggiungo un gestore di eventi a tutte le celle
  const celle = document.querySelectorAll('.square');
  celle.forEach(function(cella) {
    cella.addEventListener('click', function() {
      if (giocoFinito || this.classList.contains('clicked')) {
        return;
      }

      const numeroCella = this._squareID;

      // verifica se la cella è una bomba
      if (bombe.includes(numeroCella)) {
        this.classList.add('bomba');
        fineGioco(false)
      } else {
        this.classList.add('vuoto');
        punteggio++;
        console.log(punteggio)
      }
      if (document.querySelectorAll('.square.clicked').length === squareNumbers - 16) {
        fineGioco(true);
      }
    })
  })
}