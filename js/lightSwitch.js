function initializeMode () {
    var mode = window.localStorage.getItem("mode");         // False = Dark Mode    // True = Light Mode

    switch (mode) {
        case '0':                                       // Make Light mode
            document.body.classList.remove("DarkModeBoard");
            document.getElementById("switch").classList.remove("DarkModeSwitch");

            document.getElementById("WODPost").classList.remove("DarkModePost");
            document.getElementById("WODPost").classList.add("LightModePost");

            document.getElementById("CODPost").classList.remove("DarkModePost");
            document.getElementById("CODPost").classList.add("LightModePost");

            break;

        case '1':                                       // Make Dark mode
            document.body.classList.add("DarkModeBoard");
            document.getElementById("switch").classList.add("DarkModeSwitch");
            document.getElementById("switch").style.transform = 'rotate(90deg)';

            document.getElementById("WODPost").classList.remove("LightModePost");
            document.getElementById("WODPost").classList.add("DarkModePost");

            document.getElementById("CODPost").classList.remove("LightModePost");
            document.getElementById("CODPost").classList.add("DarkModePost");

            break;

        default:                                        // If it doesn't exist
            window.localStorage.setItem("mode", 0);     // Safely create it and run it for the first time in light mode :)

            document.getElementById("WODPost").classList.add("LightModePost");

            document.getElementById("CODPost").classList.add("LightModePost");
    }
}

function changeMode () {
    var mode = window.localStorage.getItem("mode");         // False = Dark Mode    // True = Light Mode

    switch (mode) {
        case '0':                                       // If Light mode
                                                        // Make it Dark mode
            window.localStorage.setItem("mode", "1");

            document.body.classList.add("DarkModeBoard");
            document.getElementById("switch").classList.add("DarkModeSwitch");
            document.getElementById("switch").style.transform = 'rotate(90deg)';

            document.getElementById("WODPost").classList.remove("LightModePost");
            document.getElementById("WODPost").classList.add("DarkModePost");

            document.getElementById("CODPost").classList.remove("LightModePost");
            document.getElementById("CODPost").classList.add("DarkModePost");

            break;

        case '1':                                       // If Dark mode
                                                        // Make it Light mode
            window.localStorage.setItem("mode", "0");

            document.body.classList.remove("DarkModeBoard");
            document.getElementById("switch").classList.remove("DarkModeSwitch");
            document.getElementById("switch").style.transform = 'rotate(270deg)';

            document.getElementById("WODPost").classList.remove("DarkModePost");
            document.getElementById("WODPost").classList.add("LightModePost");

            document.getElementById("CODPost").classList.remove("DarkModePost");
            document.getElementById("CODPost").classList.add("LightModePost");

            break;

        default:
    }
}
