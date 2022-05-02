let input = document.getElementById("keyInput");
let keyEntry = document.getElementById("keyEntry")
let mainContainer = document.getElementById("mainContainer");
let apiKey;

let newScript = document.createElement("script");
newScript.type = "text/javascript";
newScript.defer = true;
newScript.src = 'script.js';

if(localStorage.getItem("apiKey")!=null){
    apiKey = localStorage.getItem("apiKey");
    mainContainer.style.display = "flex";
    keyEntry.style.display = "none";
    document.head.appendChild(newScript)
}

function enter(){
    apiKey = input.value;
    localStorage.setItem("apiKey", apiKey);
    mainContainer.style.display = "flex";
    keyEntry.style.display = "none";
    document.head.appendChild(newScript)
}