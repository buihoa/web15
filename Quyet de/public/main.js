var result;

/* function randQues() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("quesDisplay").innerHTML =
      this.responseText;
    }
  }; */
    
 /*    let content = xhttp.open("GET", "../randomQues.txt", true);
    document.getElementById("quesDisplay").innerHTML = content;
    xhttp.send(content);
}
 */

function getRandomQuestion () {
  $.ajax({
    url:"http://localhost:5000/randomQuestion",
    type: "GET",
    success: function(response) {
      if(response) {
          $("#questionDisplay").text(response.questionContent);
          $(".answer_btn").data("questionid", response.id);
      }
    },
    error: function(err) {
      console.log(err);
    }
  }); 
}

getRandomQuestion();

// In this case, response == response.data, different from normal jvs

/* axios.get('http://localhost:5000/randomQuestion') 
  .then(function(response) {
    if(response.data) {
      console.log(response.data);
        document.getElementById("questionDisplay").innerText = response.data.questionContent;
    }
  })
  .catch(function(error) {
    console.log(error);
  }) */


$("#otherQuestion").on("click", function() {
  getRandomQuestion();
});


$(".answer_btn").on("click", function() {
  //console.log($(this).data())//element ma Event vua chay// data gach thi tat ca se vao data()
$.ajax({
    url:"http://localhost:5000/yesNo",
    type: "POST",
    data: $(this).data(),
    success: function(response) {
      if(response.success) {
        window.location.href = "/result.html";
      }
    },
    error: function(err) {
      window.location.href = "https://google.com/search?q=site:stackoverflow.com why my code didn't run";
      console.log(err);
    }
  });
});

