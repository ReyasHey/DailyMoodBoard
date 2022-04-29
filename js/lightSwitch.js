var body = document.getElementsByTagName("body")[0];
var sun = document.getElementById("LightSwitch");
var moon = document.getElementById("DarkSwitch");

    // ! SWITCH VAR WILL BE USED IN UPCOMING SWITCHED THROUGHOUT THE SITE

function initializeMode () {
    var mode = window.localStorage.getItem("mode");         // False = Dark Mode    // True = Light Mode

    switch (mode) {
        case '0':                                       // Make Light mode
            body.style.setProperty ("--text", "black");
            body.style.setProperty ("--body-bg", "#ebecee");
            body.style.setProperty ("--post-bg", "#fefefe");
            body.style.setProperty ("--switch-fill", "black");

            sun.style.fill = "black";
            moon.style.fill = "#747372";

            break;

        case '1':                                       // Make Dark mode
            body.style.setProperty ("--text", "#e8e6e3");
            body.style.setProperty ("--body-bg", "#121212");
            body.style.setProperty ("--post-bg", "#1e1e1e");
            body.style.setProperty ("--switch-fill", "#e8e6e3");

            sun.style.fill = "#747372";
            moon.style.fill = "#121212";

            break;

        default:                                        // If it doesn't exist
            window.localStorage.setItem("mode", 0);     // Safely create it and run it for the first time in light mode :)
    }
}

function changeMode () {
    var mode = window.localStorage.getItem("mode");         // False = Dark Mode    // True = Light Mode

    switch (mode) {
        case '0':                                       // If Light mode
            window.localStorage.setItem("mode", "1");   // Make it Dark mode

            body.style.setProperty ("--text", "#e8e6e3");
            body.style.setProperty ("--body-bg", "#121212");
            body.style.setProperty ("--post-bg", "#1e1e1e");
            body.style.setProperty ("--switch-fill", "#e8e6e3");

            sun.style.fill = "#747372";
            moon.style.fill = "#e8e6e3";

            break;

        case '1':                                       // If Dark mode
            window.localStorage.setItem("mode", "0");   // Make it Light mode

            body.style.setProperty ("--text", "black");
            body.style.setProperty ("--body-bg", "#ebecee");
            body.style.setProperty ("--post-bg", "#fefefe");
            body.style.setProperty ("--switch-fill", "black");

            sun.style.fill = "black";
            moon.style.fill = "#747372";

            break;

        default:
    }
}
