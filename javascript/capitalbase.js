import { europeanCapitals,europeanCountries ,asianCountries,asianCapitals,africanCountries,africanCapitals,southAmericanCountries,southAmericanCapitals,northAmericanCountries,northAmericanCapitals} from "./capitalrelient.js";

var Eu=false;
var As=false;
var Sa=false;
var Na=false;
var Af=false

var SelectedCountryArr=[];
var SelectedCapitalArr=[];
var inputboxarr=[];

var hasSelected=false;

function showGamePopup(title, message) {
    const existing = document.getElementById("aq-game-modal");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "aq-game-modal";
    overlay.className = "aq-modal-overlay";

    const card = document.createElement("div");
    card.className = "aq-modal-card";

    const heading = document.createElement("h3");
    heading.textContent = title;

    const text = document.createElement("p");
    text.textContent = message;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "aq-modal-button";
    button.textContent = "Close";
    button.addEventListener("click", () => overlay.remove());

    card.appendChild(heading);
    card.appendChild(text);
    card.appendChild(button);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
}
//capitalrelient.js stores countries and their capitals 
//for every country create input box , store in an array 
//loop through each input box ,(add action listner) check its value with corresponding position in array of countries

function SelectCountArr(){
    if (Eu){
        return europeanCountries;
    }
    if (As){
        return asianCountries;
    }
    if (Af){
        return africanCountries;
    }
    if (Sa){
        return southAmericanCountries;
    }
    if (Na){
        return northAmericanCountries;
    }
}
function SelectCapArr(){
    if (Eu){
        return europeanCapitals;
    }
    if (Af){
        return africanCapitals;
    }
    if (As){
        return asianCapitals;
    }
    if (Na){
        return northAmericanCapitals;
    }
    if (Sa){
        return southAmericanCapitals;
    }
}
function displayBoxes(){
    let grid = document.getElementById("capital-answer-grid");
    if (!grid) {
        grid = document.createElement("div");
        grid.id = "capital-answer-grid";
        grid.className = "game-answer-grid";
        document.body.appendChild(grid);
    }

    for (let i=0;i<SelectedCountryArr.length;i++){
        let cell = document.createElement("div");
        cell.className = "game-answer-cell";

        let currCount=document.createElement("span");
        currCount.className = "game-answer-label";
        currCount.textContent=SelectedCountryArr[i];

        let currbox=document.createElement("input");
        currbox.className = "game-answer-input";
        currbox.setAttribute("aria-label", `Capital for ${SelectedCountryArr[i]}`);

        cell.appendChild(currCount);
        cell.appendChild(currbox);
        grid.appendChild(cell);
        inputboxarr.push(currbox);
        currbox.addEventListener("input",function(){
            checkans(currbox,i);
        });
    }
}
function checkans(inputbox,i){
   let inputval=inputbox.value.trim().toLowerCase();
   let correctans=String(SelectedCapitalArr[i]).trim().toLowerCase();
   if (inputval==correctans){
    inputbox.classList.add("is-correct");
    inputbox.disabled=true;
    }
}

function displayttl(){
    let h1ttl=document.getElementById("h1tttl");
    if (Eu){
        h1ttl.textContent="Europe Capital quiz"; 
    }
    if (As){
        h1ttl.textContent="Asia Capital quiz"; 
    }
    if (Na){
        h1ttl.textContent="North America Capital quiz"; 
    }
    if (Sa){
        h1ttl.textContent="South America Capital quiz"; 
    }
    if (Af){
        h1ttl.textContent="Africa Capital quiz"; 
    }
}

$(document).ready(function(){

    switch(localStorage.getItem("Continent")){
        case "Eu":
            Eu=true;
            break;
        case "As":
            As=true;
            break;
        case "Af":
            Af=true;
            break;
        case "Sa":
            Sa=true;
            break;
        case "Na":
            Na=true;
            break;
    }
    displayttl();

    if(! hasSelected){
        SelectedCountryArr=SelectCountArr();
        SelectedCapitalArr =SelectCapArr();
        hasSelected=true;
    }

    displayBoxes();

    $("#refreshbtn").click(function(){
        window.location.href=window.location.href;
    });
    $("#home").click(function(){
        window.location.href="../index.html";
    });
    $("#giveup").click(function(){
        for(let i=0; i<inputboxarr.length;i++){
            let currbox=inputboxarr[i];
            let val=currbox.value;
            if (val==""){
                let currcap=SelectedCapitalArr[i];
                currbox.value=currcap;
                currbox.style.backgroundColor="#f7d5d5";
                currbox.disabled=true;
            }
        }
        showGamePopup("Round Ended", "You gave up — the remaining capitals have been revealed.");
    });

});