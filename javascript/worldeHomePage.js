$(document).ready(function () {
    const redirect = "../html/Wordlebase.html";

    $("#b1").on("click", function () {
        localStorage.setItem("numofwordle", 1);
        window.location.href = redirect;
    });

    $("#b2").on("click", function () {
        localStorage.setItem("numofwordle", 2);
        window.location.href = redirect;
    });

    $("#b3").on("click", function () {
        localStorage.setItem("numofwordle", 4);
        window.location.href = redirect;
    });

    $("#b4").on("click", function () {
        localStorage.setItem("numofwordle", 8);
        window.location.href = redirect;
    });

    $("#b5").on("click", function () {
        window.location.href = "../index.html";
    });
});

