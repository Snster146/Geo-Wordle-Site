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
    for (let i=0;i<SelectedCountryArr.length;i++){
        let currbox=document.createElement("input");
        let currCount=document.createElement("span");
        currCount.innerHTML=SelectedCountryArr[i];
        currbox.style.height="25px";
        currbox.style.width="150px";
        currbox.style.marginLeft="40px";
        currCount.style.fontFamily="sans-serif"
        currCount.style.fontSize="20px";
        currCount.style.marginLeft="40px"
        currbox.style.fontFamily="sans-serif";
        currbox.style.fontSize="20px";
        let br=document.createElement("br")
        
        document.body.appendChild(currCount);
        document.body.appendChild(currbox);
        inputboxarr.push(currbox);
        if (i%2==0){
            document.body.appendChild(br);
        }
        currbox.addEventListener("input",function(){
            checkans(currbox,i);
        });
       // alert(SelectedCapitalArr);

    }
}
function checkans(inputbox,i){
   let inputval=inputbox.value.trim().toLowerCase();
   let correctans=SelectedCapitalArr[i];
   if (inputval==correctans){
    inputbox.style.backgroundColor="lightGreen";
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
        window.location.href="/Geo-Wordle-Site/index.html";
    });
    $("#giveup").click(function(){
        alert("you gave up");
        for(let i=0; i<inputboxarr.length;i++){
            let currbox=inputboxarr[i];
            let val=currbox.value;
            if (val==""){
                let currcap=SelectedCapitalArr[i];
                currbox.value=currcap;
                currbox.style.backgroundColor="red";
                currbox.disabled=true;
            }
        }
    });

});