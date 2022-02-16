const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let time = (35*size);

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

    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    firstCard.children[1].src = "resources/cardback-nothing.png";
    secondCard.children[1].src = "resources/cardback-nothing.png";

    console.log(firstCard.children[0]);
   
    let clock = document.getElementById("clock");
    console.log(firstCard.children[1]);

    if(clock == firstCard)
    {
        time = time + 50;
    }

    if(firstCard == clock)
    {
        time = time + 50;
    }
    if(matched == size)
    {
        window.alert("Win!!");
        window.location.reload();
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
let writtenTime = "";
if(time >= 60)
{
    writtenTime = Math.floor(time/60)+":"+(time - (Math.floor(time/60)*60) < 10 ? "0" + (time - (Math.floor(time/60)*60))  : time - (Math.floor(time/60)*60));
}
else{writtenTime = "0:"+time; document.getElementById("timer").style.color = "red";}

document.getElementById("timer").innerHTML = "<b>" + writtenTime + "</b>";
}
else
{
    window.alert("Out of time, you loose!!")
    window.location.reload();
}


},1000);

