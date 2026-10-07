import { asianCountries,europeanCountries,africanCountries,southAmericanCountries,northAmericanCountries } from "./countryrelient.js";

var Eu=false;
var As =false;
var Af=false;
var Na=false;
var Sa=false
var selectedcont=false;
var createdboxes=false;
var inputboxarr=[];
var SelectedArr=[];

var correctAns=0;

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

function selectArr(){
    if (Eu){
        return europeanCountries;
        
    }
    if (As){
        return asianCountries;
    }
    if(Af){
        return africanCountries;
    }
    if (Na){
        return northAmericanCountries;
    }
    if (Sa){
        return southAmericanCountries;
    }
};

function CreateInputBoxes(SelectedArr){
    let grid = document.getElementById("country-answer-grid");
    if (!grid) {
        grid = document.createElement("div");
        grid.id = "country-answer-grid";
        grid.className = "game-answer-grid";
        document.body.appendChild(grid);
    }

    for(let i=0;i<SelectedArr.length;i++){
        let cell = document.createElement("div");
        cell.className = "game-answer-cell";

        let label = document.createElement("span");
        label.className = "game-answer-label";
        label.textContent = `Country ${i + 1}`;

        let inputbox=document.createElement("input");
        inputbox.className = "game-answer-input";
        inputbox.id = `ib${i}`;

        cell.appendChild(label);
        cell.appendChild(inputbox);
        grid.appendChild(cell);
        inputboxarr.push(inputbox);
        inputbox.addEventListener("input",function(){
            checkans(inputbox);
        });
    }
}

function checkans(inputbox){
    let inputval=inputbox.value.trim().toLowerCase();
    
    if (SelectedArr.includes(inputval)){
        let index=SelectedArr.indexOf(inputval);
        SelectedArr.splice(index,1);
        inputbox.classList.add("is-correct");
        inputbox.disabled=true;
        correctAns++;
        if (correctAns==SelectedArr.length){
            showGamePopup("Quiz Complete", "You answered every country correctly.");
        }
    }
}

$(document).ready(function(){
    
    var h1ttl=document.getElementById("h1ttl");

    switch(localStorage.getItem("Continent")){
        case "Eu":
            h1ttl.textContent="Europe Country Quiz";
            Eu=true;
            break;
        case "As":
            h1ttl.textContent="Asian Country Quiz";
            As=true;
            break;
        case "Af":
            h1ttl.textContent="African Country Quiz";
            Af=true;
            break;
        case  "Na":
            h1ttl.textContent="North Country Flag Quiz";
            Na=true;
            break;
        case "Sa":
            h1ttl.textContent="South Country Flag Quiz";
            Sa=true;
            break;   
    }
    if (! selectedcont){
        SelectedArr=selectArr();
        selectedcont=true;
    }
    if(!createdboxes){
        CreateInputBoxes(SelectedArr);
        createdboxes=true;
    }
    $("#homebttn").click(function(){
        window.location.href="../index.html";
    })

    $("#giveupbtn").click(function(){
        for(let i=0; i<inputboxarr.length;i++){
            let currbox=inputboxarr[i];
            let val=currbox.value;
            if (val==""){
                let currcount=SelectedArr[0];
                currbox.value=currcount;
                currbox.style.backgroundColor="#f7d5d5";
                currbox.disabled=true;
                SelectedArr.splice(0,1);
            }
        }
        showGamePopup("Round Ended", "You gave up — the remaining answers have been revealed.");
    });
    $("#refreshbttn").click(function(){
        window.location.href = window.location.href;

    });

    

});