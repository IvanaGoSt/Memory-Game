

const container = document.querySelector("#container");

let arrOfSigns = [["car", "blue"], ["camera-retro", "green"] ,["ambulance", "red"], ["anchor", "DodgerBlue"], ["balance-scale", "DarkOrange"], ["bath", "DarkViolet"], ["bed", "MediumOrchid"], ["beer", "OrangeRed"], ["bell", "MediumVioletRed"], ["bicycle", "seagreen"], ["binoculars", "purple"], ["birthday-cake", "Sienna"], ["bomb", "DarkSlateGrey"], ["bug", "DarkOliveGreen"], ["bus", "PaleVioletRed"], ["coffee", "brown"], ["cut", "DarkCyan"], ["dice", "violet"], ["drum", "SteelBlue"], ["envelope", "Tomato"], ["flask", "OliveDrab"], ["futbol", "MediumSlateBlue"], ["gem", "Magenta"], ["gift", "HotPink"], ["glasses", "MidnightBlue"], ["home", "RebeccaPurple"], ["lemon", "yellow"], ["paperclip", "Teal"]];

let cardIsClickable = true;
let arrOfPairs = [];
let openedPairs = [];
let time;
let sec;
let stopWatch = document.getElementById("time");

function displayCards(num) {
  sec = 0;
  stopWatch.innerHTML = sec + " sec";
  container.addEventListener("click", getTime, {once:true}); //stopwatch starts only when you click first card

  let selection = document.getElementById("selection");
let numberOfCards = Number(selection.value);

  while(container.firstChild){    container.removeChild(container.firstChild);// clear previous grid of cards
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
    let card = document.createElement("div");
    card.classList.add("cards");
    card.style.cssText = "border: 3px solid black; border-radius: 5%; box-shadow: 3px 3px 3px gray; background-color: lightgray; display: flex; justify-content: center; align-items: center; font-size: 2em";
    container.appendChild(card);
  }
  container.style.cssText = ("grid-template-columns: repeat(" + columns + ", 1fr); grid-template-rows: repeat(" + rows + ", 1fr)");
  openCards();
}

function giveRandomCards(num) {
  let arrOfCards = [];

  for(let i = 0; i < num / 2; i++) {
    arrOfCards.push(arrOfSigns[i]);// pick signs
    arrOfPairs = arrOfCards.concat(arrOfCards);// make two cards of each sign
     arrOfPairs.sort(function(a, b){return 0.5 - Math.random()});// randomize cards
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
      }// prevent clicking the opened cards
      if(cardIsClickable === true){
        cards[i].innerHTML = "<i class='fas fa-" + arrOfPairs[i][0] + "'></i>";
        cards[i].style.color = arrOfPairs[i][1];

    openedCards.push(arrOfPairs[i]);
      };


     if(openedCards.length === 2) {
       if(openedCards[0] !== openedCards[1]) {
         cardIsClickable = false;
       setTimeout(closeCards, 800);
       function closeCards() {                     cards[arrOfPairs.indexOf(openedCards[0])].innerHTML = "";
cards[arrOfPairs.indexOf(openedCards[1])].innerHTML = "";
cards[arrOfPairs.lastIndexOf(openedCards[0])].innerHTML = "";
cards[arrOfPairs.lastIndexOf(openedCards[1])].innerHTML = "";
    openedCards.splice(0, 2);
     cardIsClickable = true;
         }
       }else {
         openedPairs.push(openedCards[0], openedCards[1]);
        // cards[i].style.border = "5px solid orange";
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
    time = setInterval(getNewSecond, 1000);
  function getNewSecond() {
    sec++;
    stopWatch.innerHTML = sec + " sec";
  }
}
displayCards(12);
