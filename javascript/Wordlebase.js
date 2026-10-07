import {fiveLetterWords,UsersInput,lettersInSelected,lettersInPlace,lettersInPlace2,lettersInPlace3,lettersInPlace4,lettersInPlace5,lettersInPlace6,lettersInPlace7,lettersInPlace8, lettersInSelected2, lettersInSelected3, lettersInSelected4, lettersInSelected5, lettersInSelected6, lettersInSelected7, lettersInSelected8} from "./Relient.js"

var divs=[];
var wordleswon=[];
var wordleswoncount=0;
var wordshad=[];

function SelectWord(){
    const randomindex=Math.floor(Math.random()*fiveLetterWords.length);
    const SelectedWord=fiveLetterWords[randomindex];
    return SelectedWord;
}

function AllowedNumOfTurns(numofwordle){
    switch(numofwordle){
        case 1:
            return 5;
        case 2:
            return 7;
        case 4:
            return 10;
        case 8:
            return 13;
        default:
            break;
    }
}

var selectedword=SelectWord();
var selectedwords=[];
var letterInSelected_all=[lettersInSelected,lettersInSelected2,lettersInSelected3,lettersInSelected4,lettersInSelected5,lettersInSelected6,lettersInSelected7,lettersInSelected8];
var numofTurns=0;

var won=false;

$(document).ready(function () {
    //need to fix ts
    if (!won){
        document.getElementById("userStatus").textContent = "In Progress";
    }
   
    var numofwordle = parseInt(localStorage.getItem("numofwordle"));
    var AllowedNumTurns=AllowedNumOfTurns(parseInt(numofwordle));
    for (let i=0;i<numofwordle;i++){
        selectedwords.push(SelectWord());
        wordleswon.push(0);
    }
//create a new div, box for every wordle for as many wordles as the user selected
    if (numofwordle!=8){
        for (let i = 0; i < numofwordle; i++) {
            let newdiv = document.createElement("div");
            newdiv.style.border = "solid 5px black";
            newdiv.style.position = "absolute";
            newdiv.style.top = "20%";
            newdiv.style.fontSize = "25px";
            newdiv.style.fontFamily = "sans-serif";
            newdiv.style.fontWeight = "bold";
            newdiv.style.marginLeft = "20px";
            newdiv.style.left = "20%";
            newdiv.style.display = "inline-block";
            newdiv.style.height = "300px";
            newdiv.style.width = "400px";
    
    
    
            if ((i == 1 || i == 3)&&numofwordle!=8) {
                newdiv.style.left = "48%";
            }
            if ((i == 2 || i == 3)&&numofwordle!=8) {
                newdiv.style.top = "61%";
            }
            
            document.body.appendChild(newdiv);
            divs.push(newdiv);
        }
    }
    
    if (numofwordle == 8) {
        for (let i = 0; i < numofwordle; i++) {
            let newdiv = document.createElement("div");
            newdiv.style.border = "solid 5px black";
            newdiv.style.position = "absolute";
            newdiv.style.fontSize = "25px";
            newdiv.style.height = "317px";
            newdiv.style.width = "350px";
            newdiv.style.top = "19%";
            newdiv.style.letterSpacing="5px";

    
            switch (i) {
                case 0:
                    newdiv.style.left = "0%";
                    break;
                case 1:
                    newdiv.style.left = "25%";
                    break;
                case 2:
                    newdiv.style.left = "50%";
                    break;
                case 3:
                    newdiv.style.left = "75%";
                    break;
                case 4:
                    newdiv.style.left = "0%";
                    newdiv.style.top = "61%";  // Adjust top for the second row
                    break;
                case 5:
                    newdiv.style.left = "25%";
                    newdiv.style.top = "61%";  // Adjust top for the second row
                    break;
                case 6:
                    newdiv.style.left = "50%";
                    newdiv.style.top = "61%";  // Adjust top for the second row
                    break;
                case 7:
                    newdiv.style.left = "75%";
                    newdiv.style.top = "61%";  // Adjust top for the second row
                    break;
            }
    
            document.body.appendChild(newdiv);
            divs.push(newdiv);

        }
    }
    
    

    $("#enterbutton").click(function () {
        var userinput = document.getElementById("inputbox").value;
        userinput = userinput.trim().toLowerCase();

        if (userinput.length == 5) {
            numofTurns++;
            if (UsersInput.includes(userinput)) {
                document.getElementById("messageBox").textContent = "Cannot enter word already entered";
            } else {
                UsersInput.push(userinput);

                selectedwords.forEach(function(word,index){
                    if(word==userinput){
                        let winwordlep=document.createElement("p");
                        winwordlep.textContent="You beat wordle"+(index+1);
                        wordleswon[index]=1;

                        
                    }
                });
                wordleswon.forEach(function(value){
                    if(value==1){
                        wordleswoncount++;
                    }
                });
                if (wordleswoncount==parseInt(numofwordle)){
                    won=true;
                }
                else{
                    wordleswoncount=0;
                }

                // Loop through each selected word
                for (let i = 0; i < selectedwords.length; i++) {
                    let selectedword_i = selectedwords[i];

                    // Check every index of user input
                    for (let j = 0; j < userinput.length; j++) {
                        if (selectedword_i.includes(userinput.charAt(j))) {
                            // Add to letterInSelected_all array
                            letterInSelected_all[i].push(userinput.charAt(j));
                        }
                    }
                }
                for (let i=0;i<userinput.length;i++){
                    if (! wordshad.includes(userinput.charAt(i))){
                        wordshad.push(userinput.charAt(i));
                    }
                }
                var wordshad_div=document.getElementById("wordsHad");
                wordshad_div.innerText="";
                for (let i=0;i<wordshad.length;i++){
                    let currword=wordshad[i]
                    for (let j=0;j<currword.length;j++){
                        let span=document.createElement("span");
                        span.innerText=wordshad[i]
                        wordshad_div.appendChild(span);

                    }
                }
                var numTunrsdiv=document.getElementById("movediv")
                numTunrsdiv.textContent="";
                numTunrsdiv.textContent=numofTurns+"/"+AllowedNumTurns;

                // Display word with color coding
                divs.forEach(function (box,index) {
                    //associates a selected word with the same index as the div
                    let selectedword_curr=selectedwords[index];
                    let letterInSelected_curr=letterInSelected_all[index];

                    for (let j=0;j<userinput.length;j++){
                        //gets current character of user input
                        if(selectedword_curr.charAt(j)==userinput.charAt(j)){
                            box.innerHTML+="<span style='color:green'>" +userinput.charAt(j) +"</span>";
                        }
                        else if (letterInSelected_curr.includes(userinput.charAt(j))){
                            box.innerHTML+="<span style='color:orange'>"+ userinput.charAt(j) +"</span>";
                        }
                        else{
                            box.innerHTML+="<span>"+ userinput.charAt(j) +"</span>";
                        }
                    }

                    box.innerHTML += "<br>";
                });
            }
        }

        if (!userinput) {
            document.getElementById("messageBox").textContent = "Must enter a word";
            return;
        } else if (userinput.length != 5) {
            document.getElementById("messageBox").textContent = "Input must be exactly 5 letters";
            return;
        }
        if ((numofTurns==AllowedNumTurns)&&won!=true){
            alert("You lost , the word was "+selectedwords);
            window.location.href="/Geo-Wordle-Site/index.html";
        }
        if (won==true){
            alert("you won");
            window.location.href="/Geo-Wordle-Site/index.html";
        }
    

    });
});

