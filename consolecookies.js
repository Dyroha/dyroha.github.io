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
    for (let c of ca) {
        while (c.startsWith(" ")) {
            c = c.substring(1);
        }
        if (c.startsWith(name)) {
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
        inputBox.style.fontSize = size;
    }
}

function initializeTextSpeed() {
    let time = getCookie("pauseTime");
    if (time != "") {
        pauseTime = parseInt(time);
        if (time == "0") {
            document.tsform.ts1.checked = true;
        } else if (time == "500") {
            document.getElementById("ts3").checked = true;
        } else {
            document.getElementById("ts2").checked = true;
        }
    }
}

initializeFontSize();
initializeTextSpeed();
