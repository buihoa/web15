function start () {
    $.ajax( {
    url: "http://localhost:5000/result",
    type: "GET",
    success: function(response) {
        if(response) {
        console.log("Move from result to main successfully.");
        console.log(response);
        var totalAnswer = response["yes"] + response["no"];
        console.log(totalAnswer);
        var percentYes = response.yes / totalAnswer * 100;
        var percentNo = response.no / totalAnswer * 100;
        $("#percentYes").text(percentYes);
        $("#percentNo").text(percentNo); 
        $("#questionDisplay2").text(response.questionContent);
    }
},
    error: function(err) {
        console.log(err);
    }
});
}

start();