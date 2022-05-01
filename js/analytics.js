function hidePopup () {
    document.getElementById("cookies-Popup").style.display = "none";
}

function denyCookies () {
    gtag('consent', 'update', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied'
    });
}
