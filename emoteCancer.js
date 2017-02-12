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

emoteMap=(str)=>str.toLowerCase().split("").map((x)=>mappings[x]!==undefined?mappings[x]:x).join("")
inputChanged=()=>{
    var input = document.getElementById("input");
    var output = document.getElementById("output");
    output.value = emoteMap(input.value);
};

outputClicked=()=>{
    document.getElementById("output").select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        alert('Copying text command was ' + msg);
    } catch (err) {
        alert('Oops, unable to copy');
    }
}
