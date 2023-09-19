// Programma che al click di un bottone genera una griglia di gioco quadrata.

// 1. Selezionare il bottone e salvarlo in una variabile.

// 2. Mettere in ascolto il bottone e scatenare un evento al 'click'.

// 3. Al click del bottone selezionare il container contenente la griglia.

// 4. Fare un ciclo su 100 (quanto il numero di blocchi che vogliamo avere in griglia).

// 5. Generare un quadrato ad ogni ciclo.

// 6. Ad ogni quadrato generato aggiungere un evento "click".

// 7. Al click del quadrato aggiungere o togliere la classe "clicked".

// 8. Aggiungere il quadrato al conteiner.


// 1.
const buttonGenerator = document.querySelector('.btn-custom')

const levelSelect = document.querySelector('#level');

// data
let squareNumbers;
const levels = [100, 81, 49];


// 2.
buttonGenerator.addEventListener('click', function(){

  squareNumbers = levels[levelSelect.value]
  // 3
  const contenitore = document.querySelector('.game-wrapper')
  contenitore.classList.remove('d-none')

  contenitore.innerHTML = '';

  // 4.
  for (let i = 1; i <= squareNumbers; i++) {
    // 5.
    const square = createSquare(i);
    
    // 6.
    square.addEventListener('click', function(){
      // determino se l'indice è pari o dispari
      const oddEven = i % 2 === 0 ? 'even' : 'odd';

      // 7.
      this.classList.toggle('clicked')
      this.classList.toggle(oddEven)
      console.log(this)
      console.log(i)
    })

    // 8.
    contenitore.append(square);
  }
})

/************FUNZIONI************/ 
function createSquare(index) {
  const square = document.createElement('div');
  square.className = 'square';
  square.classList.add('square' + squareNumbers)
  square.innerHTML = `<span>${index}</span>`;
  square._squareID = index;

  return square;
}

function reset() {
  contenitore.innerHTML = '';
}



