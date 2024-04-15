let background = document.getElementById("background");
let foreground = document.getElementById("foreground");

let backgroundColor = document.getElementById("bg_color");
let foregroundColor = document.getElementById("fg_color");

let spacerLeft = document.getElementById("spacer_left");
let spacerRight = document.getElementById("spacer_right");

let result_left = document.getElementById("result_left");
let result_right = document.getElementById("result_right");

let left = document.getElementById("left");
let right = document.getElementById("right");

let aa = document.getElementsByClassName("aa");
let aalarge = document.getElementsByClassName("aalarge");
let aaa = document.getElementsByClassName("aaa");
let aaalarge = document.getElementsByClassName("aaalarge");

applyColor();

foregroundColor.addEventListener('input', () =>{
    applyColor()
});

backgroundColor.addEventListener('input', () =>{
    applyColor()
});

function applyColor() {
    background.style.backgroundColor = foregroundColor.value;
    foreground.style.backgroundColor = backgroundColor.value;
    background.style.color = backgroundColor.value;
    foreground.style.color = foregroundColor.value;
    result_left.style.backgroundColor = backgroundColor.value
    result_right.style.backgroundColor = foregroundColor.value
    result_left.style.color = foregroundColor.value
    result_right.style.color = backgroundColor.value
    spacerLeft.style.backgroundImage = ""
    spacerRight.style.backgroundImage = ""
    spacerLeft.style.backgroundColor = backgroundColor.value
    spacerRight.style.backgroundColor = foregroundColor.value
    left.style.backgroundColor = backgroundColor.value
    right.style.backgroundColor = foregroundColor.value
    left.style.color = foregroundColor.value;
    right.style.color = backgroundColor.value;

    let assembleCall = "https://webaim.org/resources/contrastchecker/?fcolor=000000&bcolor=FFFFFF&api".replace("000000", backgroundColor.value.replace("#", "")).replace("FFFFFF", foregroundColor.value.replace("#", ""));

    const xhr = new XMLHttpRequest();
    xhr.open('GET', assembleCall);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            
            applyToAll(aa, data.AA)
            applyToAll(aalarge, data.AALarge)
            applyToAll(aaa, data.AAA)
            applyToAll(aaalarge, data.AAALarge)
            
            if (data.AALarge === "fail") {
                result_left.style.backgroundColor = change(backgroundColor.value, 30)
                result_right.style.backgroundColor = change(foregroundColor.value, -30)
                result_left.style.color = change(foregroundColor.value, -30)
                result_right.style.color = change(backgroundColor.value, 30)
                spacerLeft.style.backgroundImage = "linear-gradient(#000000, #ffffff)".replace("#000000", backgroundColor.value).replace("#ffffff", change(backgroundColor.value, 30));
                spacerRight.style.backgroundImage = "linear-gradient(#000000, #ffffff)".replace("#000000", foregroundColor.value).replace("#ffffff", change(foregroundColor.value, -30));
            }
        } else {
            console.error(`Error: ${xhr.status}`);
        }
    };
    xhr.onerror = function() {
     console.error('Request error');
    };
    xhr.send();
}


function change(hex, amount) {
    if (!isValidHexColor(hex)) {
        console.error('Invalid hex color input');
        return '#000000'; // Default to black or any other default color
    }
    // Proceed with color adjustment logic
    let color = parseInt(hex.slice(1), 16);
    let r = Math.min(255, Math.max(0, (color >> 16) + amount));
    let g = Math.min(255, Math.max(0, ((color & 0x00FF00) >> 8) + amount));
    let b = Math.min(255, Math.max(0, (color & 0x0000FF) + amount));
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

function isValidHexColor(hex) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}

function applyToAll(elements, data) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].innerText = data
    }
}


