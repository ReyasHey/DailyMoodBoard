function toggleInfo () {
    var info = document.getElementById("infoOverlay");

    if(info.style.display.localeCompare("flex") == 0)
        info.style.display = "none";
    else
        document.getElementById("infoOverlay").style.display = "flex";
}

function toggleDetails(id) {
    var details = document.getElementById(id);

    console.log(details.style.display);

    if (details.style.display.localeCompare("block") == 0)
        details.style.display = "none";
    else
        details.style.display = "block";

    console.log(details.style.display);
}
