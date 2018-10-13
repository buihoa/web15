/* function countCharacters() {  
    var textEntered, countRemaining, counter;  
    textEntered = document.getElementById('questionContent').value; 
    counter = (200 - (textEntered.length)); 
    countRemaining = document.getElementById('conLai');
    countRemaining.innerText = "Con lai " + counter + " /200 ki tu";  
}
result = document.getElementById('questionContent');
result.addEventListener('input', countCharacters, false); */


$("#questionContent").on("input", function() {
    var remainChar = 200 - $("#questionContent").val().length;
    $("#conLai").text(remainChar);
});