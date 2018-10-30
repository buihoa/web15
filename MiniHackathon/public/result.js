const params = new URL(window.location.href).pathname.split("/");
const playersId = params[params.length - 1];

$.ajax({
    type: "GET",
    url: "/playersDetail/" + playersId,
    success: function (response) {
        if (response && response.success) {
            $('#name1').text(response.players.player1.name);
            $('#name2').text(response.players.player2.name);
            $('#name3').text(response.players.player3.name);
            $('#name4').text(response.players.player4.name);

            presentSum(response);

            if(response.players.countRound > 0) {
                printRound(response);
                newRound(response.players.countRound+1);
            }

            $("#idTeam").empty();
            $("#idTeam").append(`<input id="idTeam" type="hidden" name="idTeam" value="${playersId}">`);

            $("#numRound").empty();
            $("#numRound").append(` <input id="numRound" type="hidden" name="numRound" value="${response.players.countRound}">`);
        }
    },
    error: function (err) {
        console.log(err);
    }
});

function presentSum(response) {
    var sumOne = (response.players.player1.score).reduce(add, 0);
    var sumTwo = (response.players.player2.score).reduce(add, 0);
    var sumThree = (response.players.player3.score).reduce(add, 0);
    var sumFour = (response.players.player4.score).reduce(add, 0);

    $('#sum1').text(sumOne);
    $('#sum2').text(sumTwo);
    $('#sum3').text(sumThree);
    $('#sum4').text(sumFour);
}


function printRound(response) {
    var num = response.players.countRound;
    for (var i = 1; i <= num; i++) {
        var item1 = `
        <tr>
        <th scope="row">Round ${i}</th>
        <td>${response.players.player1.score[i]}</td>
        <td>${response.players.player2.score[i]}</td>
        <td>${response.players.player3.score[i]}</td>
        <td>${response.players.player4.score[i]}</td>
      </tr>`
        $('#toShowRound').append(item1);
    }
}

function add(a, b) {
    return a + b;
}

function newRound(roundNo) {
    $("#roundNumber").text(roundNo);
}