function hidePopup () {
    document.getElementById("cookies-Popup").style.display = "none";
}

function acceptCookies () {
    gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted'
    });
}

function denyCookies () {
    gtag('consent', 'update', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied'
    });
}
