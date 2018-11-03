
const container = document.querySelector("#container");

let arrOfSigns = ["car", "camera-retro", "ambulance", "anchor", "balance-scale", "bath", "bed", "beer", "bell", "bicycle", "binoculars", "birthday-cake", "bomb", "bug", "bus", "coffee", "cut", "dice", "drum", "envelope", "flask", "futbol", "gem", "gift", "glasses", "home", "lemon", "paperclip"];

let card;
let arrOfPairs = [];
let openedPairs = [];
let time;
let sec;

function displayCards(num) {
  container.addEventListener("click", getTime, {once:true});

  let selection = document.getElementById("selection");
let numberOfCards = Number(selection.value);

  while(container.firstChild){    container.removeChild(container.firstChild);
}
  num = numberOfCards;
  giveRandomCards(num);
  let rows;
  let columns;
  if(num === 12) {
    rows = 3;
    columns = 4;
  }else if(num === 20) {
    rows = 4;
    columns = 5;
  }else if(num === 30) {
    rows = 5;
    columns = 6
  }else if(num === 42) {
    rows = 6;
    columns = 7
  }else if(num === 56) {
    rows = 7;
    columns = 8;
  }

  for(let i = 0; i < num; i++) {
    card = document.createElement("div");
    card.classList.add("cards");
    card.style.cssText = "border: 1px solid black; background-color: lightgray; display: flex; justify-content: center; align-items: center; font-size: 2em";
    container.appendChild(card);
  }
  container.style.cssText = ("grid-template-columns: repeat(" + columns + ", 1fr); grid-template-rows: repeat(" + rows + ", 1fr)");
  openCards();
}

function giveRandomCards(num) {
  let arrOfCards = [];

  for(let i = 0; i < num / 2; i++) {
    arrOfCards.push(arrOfSigns[i]);
    arrOfPairs = arrOfCards.concat(arrOfCards);
     arrOfPairs.sort(function(a, b){return 0.5 - Math.random()});
  }
}

function freshStart() {
  clearInterval(time);
  openedPairs = [];
}

function openCards() {
  freshStart();
  let openedCards = [];
  const cards = document.querySelectorAll(".cards");

  for(let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", open);

    function open() {
      if(cards[i].innerHTML != "") {
        return;
      }
        cards[i].innerHTML = "<i class='fas fa-" + arrOfPairs[i] + "'></i>";
      openedCards.push(arrOfPairs[i]);
     if(openedCards.length === 2) {
       if(openedCards[0] !== openedCards[1]) {
       setTimeout(closeCards, 800);
       function closeCards() {                     cards[arrOfPairs.indexOf(openedCards[0])].innerHTML = "";
cards[arrOfPairs.indexOf(openedCards[1])].innerHTML = "";
cards[arrOfPairs.lastIndexOf(openedCards[0])].innerHTML = "";
cards[arrOfPairs.lastIndexOf(openedCards[1])].innerHTML = "";
    openedCards.splice(0, 2);
         }
       }else {
         openedPairs.push(openedCards[0], openedCards[1]);
         openedCards.splice(0, 2);
        }
      }
      if(openedPairs.length === arrOfPairs.length) {
    alert("Congratulations!!! The game is solved in " + sec + " seconds!");
        freshStart();
      }
    }
  }
}
 function getTime() {
   sec = 0;
   let stopWatch = document.getElementById("time");
    time = setInterval(getNewSecond, 1000);
  function getNewSecond() {
    sec++;
    stopWatch.innerHTML = sec + " sec";
  }
}

displayCards(12);
