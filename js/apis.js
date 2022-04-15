var year;
var month;

var ColourReply = 0;

// WOD = Word of the Day
// COD = Colours of the Day



function capitalStart(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}// capitalStart



function lowercaseStart(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}// lowercaseStart



function getPstDate () {
    year = new Date().getUTCFullYear();
    month = new Date().getUTCMonth();       // for some reason months are returned in 0 based value
    month = month + 1;                      // based
    var day = new Date().getUTCDate();
    var hours = new Date().getUTCHours();

    hours = hours - 7;
    if (hours < 0){                     // If hours less than 0 = its the previous day
        hours = 24 - hours;
        day = day - 1;

        console.log("Changed day to:" + day);
        if (day == 0){                   // If day 0 = its the last day of previous month
            console.log("Month is being changed to:" + month);
            month = month - 1;
            console.log("Month is being changed to:" + month);

            if (month == 0) {           // If month = its the previous year
                year = year - 1;
                month = 12;
            }

            switch (month) {    // Calculating the last day of the previous month, yes, including leap years
                case 1, 3, 5, 7, 8, 10, 12:
                    day = 31;
                    break;

                case 4, 6, 9, 11:
                    day = 30;
                    break;

                case 2:     // Leap year
                    if (year % 100 == 0) {
                        if (year % 400 == 0) {      // Its a leap year!
                            day = 29;
                        } else {                    // Its not a leap year!
                            day = 28;
                        }
                    } else {
                        if (year % 4 == 0) {        // Its a leap year!
                            day = 29;
                        } else {                    // Its not a leap year!
                            day = 28;
                        }
                    }

                default:
            }
        }
    }

    window.localStorage.setItem("day", day);
    window.localStorage.setItem("hours", hours);
}// getPstDate



function changeHex (hexString) {
    var hexString = hexString.toString();                      // String holding the starting hexadeimal

    console.log("HEX IN = " + hexString);

    var hex = 0;

    var char;                           // Holding single character at a time

    var shift = window.localStorage.getItem("day");                             // Ceasar cypher shift
    shift = shift.charAt(shift.length-1);                                       // Based on the last digit of the day

    for (let i = 0; i < 6; i++) {
        char = hexString.charCodeAt(i) + +shift;            // translate letter at i position into ascii number + add cypher shift

        hex = hex + char.toString(16);                      // turn the last number cyohered => hexadecimal, and add to the string
    }// for


    if (hex.length > 6) {                           // The word is longer than 6 letters =>
        hex = hex.slice(0, 6);                      //Trim it to 6 letters
    }


    console.log("HEX OUT = " + hex);

    return hex;
}



function hexToday () {          // Returns a chopped up or the word, ceasar cypher-ed to form a 6 digit HEX value
    var WOD = lowercaseStart(window.localStorage.getItem("WOD"));

    // HEX value to calculate and return
    // Hex equivalent in letter
    var hexString = WOD;
    var hexStringLength = hexString.length;
    // Hex in numbers
    var hex = '';

    if (hexStringLength < 6) {                          // The word is shorter than 6 letters =>
        var lengthNeeded = 6 - hexStringLength;             //Check how much it needs to reach 6 letters
        var timesToAdd = lengthNeeded / hexStringLength;    // Add more letters repeating the letters in the original word until 6 letters

        for (let i = 0; i < timesToAdd; i++) {          // Add more letters repeating the letters in the original word
            hexString = hexString + WOD;
        }
    }// if

    hexStringLength = hexString.length;

    if (hexStringLength > 6) {                              // The word is longer than 6 letters =>
        hexString = hexString.slice(0, 6);                  //Trim it to 6 letters
    }



    var shift = window.localStorage.getItem("day");                             // Ceasar cypher shift
    shift = shift.charAt(shift.length-1);                                       // Based on the last digit of the day

    // Turn every char of hexString into ascii
    for (let i = 0; i < 6; i++) {
        let char = hexString.charCodeAt(i) + +shift;        // translate letter at i position into ascii number + add cypher shift

        hex = hex + char.toString(16);                      // turn the last number cyohered => hexadecimal, and add to the string
    }// for


    if (hex.length > 6) {                           // The word is longer than 6 letters =>
        hex = hex.slice(0, 6);                      //Trim it to 6 letters
    }

    console.log(hex);
    return hex;
}// randomHex



function getWOD () {
    var todayWord;
    var WODDefinition1;
    var WODDefinition2;

    var urlStart = "https://api.wordnik.com/v4/words.json/wordOfTheDay?date=";
    var urlYear = year;
    var urlMonth = month;
    var urlDay = window.localStorage.getItem("day");
    var urlEnd = "&api_key=cidzekce26f4oemqtvfg63ql8etftods14e47y4dtd0jiji0a";


    var timesCalled = +window.localStorage.getItem("TimesCalled");
    timesCalled += 1;
    window.localStorage.setItem("TimesCalled", timesCalled);
    console.log("Times the API has been called since a while: " + timesCalled);

    return fetch(urlStart + urlYear + "-" + urlMonth + "-" + urlDay + urlEnd)      // Call API
        .then(response => response.json())
        .then(data => {
            console.log(data);

            todayWord = capitalStart(data.word);                                // Take and Store the Word of The Day
            window.localStorage.setItem("WOD", todayWord);

            WODDefinition1 = data.definitions[0].text;                          // Take and store the first definition
            window.localStorage.setItem("WODDefinition1", WODDefinition1);

            WODDefinition2 = data.definitions[1].text;                          // Take and store the second definition
            window.localStorage.setItem("WODDefinition2", WODDefinition2);
            // ! Todo: End loading screen here
        }).catch((error) => {
            console.error('Error:' + error);
        });
}// getWOD



async function getSingularWOD (urlWord) {
    var urlStart = "https://api.wordnik.com/v4/word.json/";
    urlWord = lowercaseStart(urlWord);
    var urlEnd = "/definitions?limit=1&includeRelated=false&sourceDictionaries=wiktionary&useCanonical=false&includeTags=false&api_key=cidzekce26f4oemqtvfg63ql8etftods14e47y4dtd0jiji0a";

    var wordLength = urlWord.length - 1;
    var resultTextLength;
    var newWOD;

    return fetch(urlStart + urlWord + urlEnd)      // Call API
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (data[0].text.slice(0, 6) == "Plural") {     // If Word of the Day is plural, change it, its pronounciation and definition to singular
                resultTextLength = data[0].text.length;

                newWOD = data[0].text.slice(resultTextLength - 8 - wordLength, resultTextLength - 8);
                newWOD = capitalStart(newWOD);

                window.localStorage.setItem("WOD", newWOD);
            }
        }).catch((error) => {
            console.error('Error:' + error);
        });
}// getSingularWOD



function simpleDef (def) {
    console.log("OH BOY APIIIIIII" + def);

    var defLength = def.length;
    var newString = '';

    var lastIndex = 0;
    for(var i = 0; i < defLength; i++) {

        if(def.charAt(i) == "<") {
            newString = newString.concat(def.slice(lastIndex, i));

            if(def.charAt(i+1) == "/") {

                i = i+7;
            } else {
                i = i+6;
            }

            lastIndex = i;
        }// if
    }// for

    newString = newString.concat(def.slice(lastIndex, defLength));

    console.log(newString);

    return newString;
}// simpleDef



async function getWODDefinition (urlWord) {
    var urlStart = "https://api.wordnik.com/v4/word.json/";
    urlWord = lowercaseStart(urlWord);
    var urlEnd = "/definitions?limit=2&includeRelated=false&sourceDictionaries=wiktionary&useCanonical=false&includeTags=false&api_key=cidzekce26f4oemqtvfg63ql8etftods14e47y4dtd0jiji0a";

    return fetch(urlStart + urlWord + urlEnd)      // Call API
        .then(response => response.json())
        .then(data => {
            console.log(data);

            window.localStorage.setItem("WODDefinition1", simpleDef(data[0].text));

            if (data[1].text){
                window.localStorage.setItem("WODDefinition2", simpleDef(data[1].text));
            }
        }).catch((error) => {
            console.error('Error:' + error);
        });
}// getSingularWOD



function getPhonetic (urlWord) {
    var urlStart = "https://api.wordnik.com/v4/word.json/";
    urlWord = lowercaseStart(urlWord);
    var urlEnd = "/pronunciations?useCanonical=false&sourceDictionary=wiktionary&limit=50&api_key=cidzekce26f4oemqtvfg63ql8etftods14e47y4dtd0jiji0a";

    var WODPhonetic;

    return fetch(urlStart + urlWord + urlEnd)      // Call API
        .then(response => response.json())
        .then(data => {
            console.log(data);

            WODPhonetic = data[0].raw;

            window.localStorage.setItem("WODPhonetic", WODPhonetic);
        }).catch((error) => {
            console.error('Error:' + error);
        });
}// getPhonetic



function getCOD (hex) {
    return $.ajax({
        url: 'https://www.colourlovers.com/api/palettes',
        dataType: 'jsonp',                  // Ask for reply in jsonp hence no CORS
        data: {
            format: 'json',                 // Tell we're sending data through json
            hex: hex,
            numResults: '1',
        },
        jsonp: 'jsonCallback',              // Callback function
        success: function(data){
            if (data[0]) {                  // Reply has data
                window.localStorage.setItem("CODTitle", data[0].title);
                window.localStorage.setItem("COD1", data[0].colors[0]);
                window.localStorage.setItem("COD2", data[0].colors[1]);
                window.localStorage.setItem("COD3", data[0].colors[2]);
                window.localStorage.setItem("COD4", data[0].colors[3]);
                window.localStorage.setItem("COD5", data[0].colors[4]);

                ColourReply = 0;
            } else {                        // Reply is undefined if there are no palettes with the proposed color
                ColourReply = 1;
            }
        },
    });
}// getCOD (Colours of the Day)



// ! Todo: Start loading screen before limitRate ?
async function limitRate () {
    getPstDate();
    today = +window.localStorage.getItem("day");
    reqDay = +window.localStorage.getItem("reqDay");

    var hex;

    if (today != reqDay) {        // If today or ever the API has not been called, call it
        // Clear Local Storage ONLY of this site's variables so to not touch other data
        window.localStorage.removeItem("WODDefinition1");
        window.localStorage.removeItem("WODDefinition2");
        window.localStorage.removeItem("WODPhonetic");
        window.localStorage.removeItem("CODTitle");
        window.localStorage.removeItem("COD2");
        window.localStorage.removeItem("COD3");
        window.localStorage.removeItem("COD4");
        window.localStorage.removeItem("COD5");
        // Today is the last
        window.localStorage.setItem("reqDay", today);
        // Wordnik API
        await getWOD();                                                         //  ! TODO: Check if
        await getSingularWOD(window.localStorage.getItem("WOD"));               //  ! TODO: We exceeded
        await getPhonetic(window.localStorage.getItem("WOD"));                  //  ! TODO: The amount of calls
        await getWODDefinition(window.localStorage.getItem("WOD"));             //  ! TODO: For our free key

        // ColourLover API
        hex = hexToday();
        await getCOD(hex);

        // Check if the operation worked else -> change hex, repeat
        for (let i = 0; ColourReply == 1 && i < 5; i++){     // Return = 0 : no errors       // 1 : API error/s      // 2 : color palette with hex doesnt exist
            hex = changeHex(hex);
            await getCOD(hex);
        }
    }
    return null;
}// limitRate



async function setElements () {
    console.log("Start of call storage:");
    console.log(window.localStorage);

    await limitRate();

    console.log("End of call storage:");
    console.log(window.localStorage);

    // WOD elements
    // WOD
    document.getElementById("WOD").textContent = window.localStorage.getItem("WOD");
    // Phonetics if avaliable
    if (window.localStorage.getItem("WODPhonetic") != 'undefined' && window.localStorage.getItem("WODPhonetic") != null) {
        document.getElementById("WODPhonetic").textContent = "• " + window.localStorage.getItem("WODPhonetic");
    } else
        document.getElementById("WODPhonetic").style.display = "none";
    // Definition 1
    document.getElementById("WODDefinition1").textContent = window.localStorage.getItem("WODDefinition1");
    // Definition 2 if available
    if (window.localStorage.getItem("WODDefinition2") != 'undefined' && window.localStorage.getItem("WODDefinition2") != null) {
        document.getElementById("WODDefinition2").textContent = window.localStorage.getItem("WODDefinition2");
    } else {
        document.getElementById("WODDefinition2no").style.display = "none";
        document.getElementById("WODDefinition2").style.display = "none";
    }

    // COD
    // COD Title of Palette
    document.getElementById("CODTitle").textContent = '"' + window.localStorage.getItem("CODTitle") + '"';
    // COD Colours vars
    var COD1 = window.localStorage.getItem("COD1");
    var COD2 = window.localStorage.getItem("COD2");
    var COD3 = window.localStorage.getItem("COD3");
    var COD4 = window.localStorage.getItem("COD4");
    var COD5 = window.localStorage.getItem("COD5");

    var COD1Dom = document.getElementById("color1");
    var COD2Dom = document.getElementById("color2");
    var COD3Dom = document.getElementById("color3");
    var COD4Dom = document.getElementById("color4");
    var COD5Dom = document.getElementById("color5");
    // COD Colours
    if (COD1 != "undefined") {
        COD1Dom.style.backgroundColor = "#" + COD1;
    } else {
        COD1Dom.style.display = "none";
    }
    if (COD2 != "undefined") {
        COD2Dom.style.backgroundColor = "#" + COD2;
    } else {
        COD2Dom.style.display = "none";
    }
    if (COD3 != "undefined") {
        COD3Dom.style.backgroundColor = "#" + COD3;
    } else {
        COD3Dom.style.display = "none";
    }
    if (COD4 != "undefined") {
        COD4Dom.style.backgroundColor = "#" + COD4;
    } else {
        COD4Dom.style.display = "none";
    }
    if (COD5 != "undefined") {
        COD5Dom.style.backgroundColor = "#" + COD5;
    } else {
        COD5Dom.style.display = "none";
    }
    // COD Description
    COD1Dom.title = "#" + COD1;
    COD2Dom.title = "#" + COD2;
    COD3Dom.title = "#" + COD3;
    COD4Dom.title = "#" + COD4;
    COD5Dom.title = "#" + COD5;
}// setElements
