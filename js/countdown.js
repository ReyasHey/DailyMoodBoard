function startTimer(duration) {
    // Time element
    var time = document.getElementById("time");
    // Text before the time element
    var time_before = document.getElementById("time_before");
    // Redirect preference checkbox
    var redirect_preference = document.getElementById("redirect_preference");

    var timer = duration;
    var minutes;
    var seconds;

    // Take function's ID to destroy it later
    var intervalId = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        // If number is single digit, add a 0 before
        if(minutes < 10)
            minutes = "0" + minutes;

        // If number is single digit, add a 0 before
        if(seconds < 10)
            seconds = "0" + seconds;

        time.textContent = minutes + "m" + seconds + "s";

        // Reduce timer by 1 second
        timer = timer - 1;

        // If timer is 0, reset it
        if (timer < 0) {
            clearInterval(intervalId);

            if(!redirect_preference.checked)
                window.location.href = "index.html";
            else {
                time_before.textContent = "Click to try again";
                time.style.display = "none";
            }
        }
    }, 1000);
}

window.onload = function () {
    // ! TODO: Get duration from function that takes 60mins *minus* the current time's minutes
    var duration = 60 * 60; // base(60) * 60mins

    startTimer(duration);
};
