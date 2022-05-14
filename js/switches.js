var body = document.getElementsByTagName("body")[0];
var sun = document.getElementById("LightSwitch");
var moon = document.getElementById("DarkSwitch");

// Light and Dark variants for variables
// Hue for the day
var h;
// Full variables
var lightBodyBG;
var darkBodyBG;
var darkPostBG;

// Convert HEX color to HSL color
function hex2hsl () {
    var color = "#" + window.localStorage.getItem("COD");
	var r = parseInt(color.substr(1,2), 16);
	var g = parseInt(color.substr(3,2), 16);
	var b = parseInt(color.substr(5,2), 16);

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var s, l;       // h is already declared globally
    h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    // Convert value returned between 0 and 1 to degrees
	h = h * 360;

    // Convert float values to percentage
    // s = s*100;
    // l = l*100;

    return h;
}

// Set Light Background Variable
function lightBodyBG () {
    var s = 22;
    var l = 92;

    lightBodyBG = "hsl(" + h + ", " + s + "%, " + l + "%" + ")";
}

// Set Dark Background Variable
function darkBodyBG () {
    // The Telegram App uses s = 15
    var s = 11;
    var l = 9;

    darkBodyBG = "hsl(" + h + ", " + s + "%, " + l + "%" + ")";
}

// Set Dark Background Variable (Light Mode doesn't need to be a hue)
function darkPostBG () {
    // The Telegram App uses s = 15
    var s = 11;
    var l = 16;

    darkPostBG = "hsl(" + h + ", " + s + "%, " + l + "%" + ")";
}

// Start the page with default or previously changed colors
function initializeMode () {
    // Set Daily HUE
    hex2hsl();
    // Set the variables to be used below
    lightBodyBG();
    darkBodyBG();
    darkPostBG();

    var mode = window.localStorage.getItem("mode");         // False = Dark Mode    // True = Light Mode

    switch (mode) {
        case '0':                                       // Make Light mode
            body.style.setProperty ("--text", "black");
            body.style.setProperty ("--body-bg", lightBodyBG);
            body.style.setProperty ("--post-bg", "#fefefe");
            body.style.setProperty ("--switch-fill", "black");
            body.style.setProperty ("--button-bg", "#1e1e1e");

            sun.style.fill = "black";
            moon.style.fill = "#8f8f8f";

            break;

        case '1':                                       // Make Dark mode
            body.style.setProperty ("--text", "#e8e6e3");
            body.style.setProperty ("--body-bg", darkBodyBG);
            body.style.setProperty ("--post-bg", darkPostBG);
            body.style.setProperty ("--switch-fill", "#e8e6e3");
            body.style.setProperty ("--button-bg", darkPostBG);

            sun.style.fill = "#747372";
            moon.style.fill = "#e8e6e3";

            break;

        default:                                        // If it doesn't exist
            window.localStorage.setItem("mode", 0);     // Safely create it and run it for the first time in light mode :)

            body.style.setProperty ("--text", "black");
            body.style.setProperty ("--body-bg", lightBodyBG);
            body.style.setProperty ("--post-bg", "#fefefe");
            body.style.setProperty ("--switch-fill", "black");
            body.style.setProperty ("--button-bg", "#1e1e1e");

            sun.style.fill = "black";
            moon.style.fill = "#8f8f8f";
    }
}

// Change Page to Light Mode
function lightMode () {
    window.localStorage.setItem("mode", "0");   // Make it Light mode

    body.style.setProperty ("--text", "black");
    body.style.setProperty ("--body-bg", lightBodyBG);
    body.style.setProperty ("--post-bg", "#fefefe");
    body.style.setProperty ("--switch-fill", "black");
    body.style.setProperty ("--button-bg", "#1e1e1e");

    sun.style.fill = "black";
    moon.style.fill = "#8f8f8f";
}

// Change Page to Dark Mode
function darkMode () {
    window.localStorage.setItem("mode", "1");   // Make it Dark mode

    body.style.setProperty ("--text", "#e8e6e3");
    body.style.setProperty ("--body-bg", darkBodyBG);
    body.style.setProperty ("--post-bg", darkPostBG);
    body.style.setProperty ("--switch-fill", "#e8e6e3");
    body.style.setProperty ("--button-bg", darkPostBG);

    sun.style.fill = "#747372";
    moon.style.fill = "#e8e6e3";
}

// Change HEX value from hover to static or viceversa
function hexSwitch () {
    if(document.getElementById("color1").classList.contains("color-hover")) {       // If hover, make it static
        document.getElementById("hexViewSwitch").style.transform = "rotate(270deg)";

        document.getElementById("color1").classList.remove("color-hover");
        document.getElementById("color1").classList.add("color-static");

        document.getElementById("color2").classList.remove("color-hover");
        document.getElementById("color2").classList.add("color-static");

        document.getElementById("color3").classList.remove("color-hover");
        document.getElementById("color3").classList.add("color-static");

        document.getElementById("color4").classList.remove("color-hover");
        document.getElementById("color4").classList.add("color-static");

        document.getElementById("color5").classList.remove("color-hover");
        document.getElementById("color5").classList.add("color-static");
    } else {                                                                        // If hover, make it static
        document.getElementById("hexViewSwitch").style.transform = "rotate(90deg)";

        document.getElementById("color1").classList.remove("color-static");
        document.getElementById("color1").classList.add("color-hover");

        document.getElementById("color2").classList.remove("color-static");
        document.getElementById("color2").classList.add("color-hover");

        document.getElementById("color3").classList.remove("color-static");
        document.getElementById("color3").classList.add("color-hover");

        document.getElementById("color4").classList.remove("color-static");
        document.getElementById("color4").classList.add("color-hover");

        document.getElementById("color5").classList.remove("color-static");
        document.getElementById("color5").classList.add("color-hover");
    }
}
