function toggleDetails(id) {
    var details = document.getElementById(id);

    console.log(details.style.display);

    if (details.style.display.localeCompare("block") == 0)
        details.style.display = "none";
    else
        details.style.display = "block";

    console.log(details.style.display);
}
