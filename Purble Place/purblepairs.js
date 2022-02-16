const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let time = 210;

let matched = 0;

document.getElementById("gridSize").value = size;

function updateGrid()
{
    let newSize = document.getElementById("gridSize").value;
    localStorage.setItem("gridSize",newSize);
    window.location.reload();
}

function flipCard() {
    if (lockBoard) {
        return;
    }
    if (this === firstCard) {
        firstCard.classList.remove('flip');
        resetBoard();
        return;
    }


    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {

    //console.log(firstCard.id);
    //document.getElementById(firstCard.id).src = "resources/cardback-nothing";

    matched = matched +1;
    if(matched == Math.floor(size/2))
    {
        console.log("win!");
    }
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    let firstCardOld = firstCard;
    let secondCardOld = secondCard;
    resetBoard();
    setTimeout(() => {
        firstCardOld.classList.remove('flip');
        secondCardOld.classList.remove('flip');
    }, 900);
}

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

(function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.ceil(Math.random() * (24));
        card.style.order = ramdomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

setInterval(function(){

if( time > 0)
{
    

time = time - 1;
document.getElementById("timer").innerHTML = "<b>" + time + " Seconds" + "</b>";
}
else
{
    console.log("lose");
}


},1000);

