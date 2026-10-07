$(document).ready(function(){
    $("#b1").click(function(){
        window.location.href = "/Geo-Wordle-Site/html/WorldeHomePage.html";
    }); 

    $("#b2").click(function(){
        window.location.href = "/Geo-Wordle-Site/html/GeoBase.html";
    });

//used to set to Login to use withing the app.js to determine if user is loggin in or creating account
    $(".loginclick").click(function(){
        localStorage.setItem("LogType","logIn");
    });

});
