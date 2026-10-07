import {EuropeFlags,AfricaFlags,AsiaFlags,NorthAmericaFlags,SouthAmericaFlags} from "./flagGuessrelient.js"

//select random country , display flag , store name of country in answer variable
var numofGuess=0;
var numofTurns=0;
var correctans=0;
var incorrectans=0;
var Eu=false;
var As=false;
var Af=false;
var Na=false;
var Sa=false;
//var continents=[Eu,As,Af,Na,Sa];
var answer="";
function randomCountry(country){
    let countries_choice=Array.from(country.keys());
    let val=countries_choice[Math.floor(Math.random()*countries_choice.length)];
    let imgsrc=country.get(val);
   
    $("#imgcontainer").attr("src",imgsrc);

    return val;
}

function selectCont(){
    if (Eu){
        answer=randomCountry(EuropeFlags);
    }   
    if (Af){
        answer=randomCountry(AfricaFlags);
    }
    if(As){
        answer=randomCountry(AsiaFlags);
    }
    if (Na){
        answer=randomCountry(NorthAmericaFlags);
    }
    if(Sa){
        answer=randomCountry(SouthAmericaFlags);
    }
}

$(document).ready(function(){
    while (numofGuess==0){
        numofGuess=prompt("Enter num of guesses");
    }

    $("#ansbtn").click(function(){
        
        var userinput = document.getElementById("guessInput").value;
        userinput = userinput.trim().toLowerCase();
        userinput=userinput.replaceAll(" ","");
       if (userinput==""){
            return;
        }
        numofTurns++;
        if(userinput==answer){
            alert("correct");
            correctans++;
            $("#cprrectans").text("");
            $("#correctans").text(correctans);
            selectCont();
        }
        else{
            alert("incorrect " +answer);
            selectCont();
            incorrectans++;
            $("#incorrectans").text("");
            $("#incorrectans").text(incorrectans);
            selectCont();
            //incorrectans
        }
       if (numofTurns==numofGuess){
            alert("GameOver "+"Your score :"+correctans+"/"+numofGuess);
            window.location.href="../index.html";
        }
        $("#guessInput").val("");
 
    });


    var h2ttl=document.getElementById("h2ttl");
    //$("#imgcontainer").attr("src",EuropeFlags.get("albania"));
    switch(localStorage.getItem("FlagType")){
        case "Eu":
            h2ttl.textContent="Europe Flag Quiz";
            Eu=true;
            break;
        case "As":
            h2ttl.textContent="Asian Flag Quiz";
            As=true;
            break;
        case "Af":
            h2ttl.textContent="African Flag Quiz";
            Af=true;
            break;
        case  "Na":
            h2ttl.textContent="North American Flag Quiz";
            Na=true;
            break;
        case "Sa":
            h2ttl.textContent="South American Flag Quiz";
            Sa=true;
            break;   
    }

    selectCont();

    
});