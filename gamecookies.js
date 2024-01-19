//these first 2 functions are taken from w3 schools for ease (no point rewriting what's already been done)

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//own code from here

function initializeFontSize() {
    let size = getCookie("fontSize");
    if (size != "") {
        document.getElementById("fontSize").value = parseInt(
            size.substring(0, size.length - 2)
        );
        outputBox.style.fontSize = size;
    }
}

function initializeTextSpeed() {
    let time = getCookie("pauseTime");
    if (time != "") {
        pauseTime = parseInt(time);
    }
}

initializeFontSize();
initializeTextSpeed();
