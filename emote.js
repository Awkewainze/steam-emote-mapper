var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var mappings = {
    "a": ":abc:",
    "b": ":csgob:",
    "c": ":carbon:",
    "d": ":TheD:",
    "e": ":mmep_e:",
    "f": ":ai_fuel:",
    "g": ":gmod:",
    "h": ":htpts:",
    "i": ":rubber:",
    "j": ":maggot:",
    "k": ":onlyleft:",
    "l": ":lp3l:",
    "m": ":scorpio:",
    "n": ":nitrogen:",
    "o": ":p2aperture:",
    "p": ":lp3p:",
    "q": ":Cert:",
    "r": ":rdlogo:",
    "s": ":slender:",
    "t": ":tyger:",
    "u": ":lcrown:",
    "v": ":SFvictory:",
    "w": ":warband:",
    "x": ":Keys:",
    "y": ":Y:",
    "z": ":NZA2_Zed:"
}

function emoteMap(str) {
    return str
        .toLowerCase()
        .split("")
        .map(x => {
            if (mappings[x]) {
                return mappings[x];
            }
            return x;
        })
        .join("");
}

function inputChanged() {
    var input = document.getElementById("input");
    var output = document.getElementById("output");
    for (var letter in letters) {
        mappings[letters[letter]] = document.getElementById(letters[letter]).value;
    }
    output.value = emoteMap(input.value);
    writeMappingToTextArea();
    updatePreviewMessage()
};

function outputClicked() {
    document.getElementById("output").select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        showSnackBarWithMessage('Copying text command was ' + msg);
    } catch (err) {
        showSnackBarWithMessage("Error copying text")
    }
};

function setInputMappings() {
    for (var letter in letters) {
        document.getElementById(letters[letter]).value = mappings[letters[letter]] || "";
    }
}

mappingChanged=()=>{
    var mapping = document.getElementById("mapping");
    try {
        mapping = JSON.parse(mapping.value);
        mappings = mapping
        for (var letter in letters) {
            document.getElementById(letters[letter]).value = mappings[letters[letter]];
        }
        inputChanged();
    } catch (e) {
        showSnackBarWithMessage("Error parsing JSON")
    }
}
writeMappingToTextArea=()=>document.getElementById("mapping").value = JSON.stringify(mappings);
showSnackBarWithMessage=(message)=>{
    var x = document.getElementById("snackbar")
    x.innerHTML = message;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
saveCookie=()=>{
    document.cookie = JSON.stringify(mappings);
}
deleteCookie=()=>{
    document.cookie = "";
    history.go(0);
}

function convertMessageToPreviewFormat(str) {
    let chars = str.toLowerCase().split("");
    return chars.map(char => {
        if (!mappings[char])
            return char;
        return mappings[char];
    }).map(emote => {
        if (!emote.startsWith(":") || !emote.endsWith(":"))
            return emote
        const url = `https://steamcommunity-a.akamaihd.net/economy/emoticon/${emote.substring(1, emote.length-1)}`;
        return `<img src="${url}"></img>`
    }).join("");
}
function updatePreviewMessage() {
    var input = document.getElementById("input");
    var output = document.getElementById("preview");
    output.innerHTML = convertMessageToPreviewFormat(input.value);
}

document.addEventListener('DOMContentLoaded', function() {
    if(document.cookie !== "")
        mappings = JSON.parse(document.cookie);
    writeMappingToTextArea();
    setInputMappings();
});
