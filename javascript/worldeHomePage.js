var numOfWorldes=0
$(document).ready(function(){
    $("#b1").click(function(){
        var numOfWorldes=1;
        localStorage.setItem("numofwordle",numOfWorldes);
        window.location.href="/Geo-Wordle-Site/html/Wordlebase.html";

    });
    $("#b2").click(function(){
        var numOfWorldes=2;
        localStorage.setItem("numofwordle",numOfWorldes);
        window.location.href="/Geo-Wordle-Site/html/Wordlebase.html";
    });
    $("#b3").click(function(){
        var numOfWorldes=4;
        localStorage.setItem("numofwordle",numOfWorldes);
        window.location.href="/Geo-Wordle-Site/html/Wordlebase.html";
    });
    $("#b4").click(function(){
        var numOfWorldes=8;
        localStorage.setItem("numofwordle",numOfWorldes);
        window.location.href="/Geo-Wordle-Site/html/Wordlebase.html";
    });
    $("#b5").click(function(){
        window.location.href="/Geo-Wordle-Site/index.html";
    });
});

