/* $(document).ready(function() {

}) */
var input = '';
var objA = {token: ""};
$("#toClick").on("click", function() {
    $(".resultDisplay").remove();
    console.log($("#keyword").val());
    input = $("#keyword").val();
    inputResult(input);
});

$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == getDocHeight()) {
        alert("Next page!");
        console.log(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${input}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`)
        if(objA.token!="") {
            nextPage(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${input}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`, objA);
        }
    }
});

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

function inputResult(input) {
    let obj = {token: ""};
    $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${input}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
        type: "GET",
        success: function (response) {  
            objA.token =  response.nextPageToken;

            for (var i = 0; i < 25; i++) {
                var line1 = `<a class="resultDisplay" href="https://www.youtube.com/wathc?v=${response.items[i].id.videoId}"?autoplay="true" target="_blank">
                 <img src="${response.items[i].snippet.thumbnails.medium.url}" alt = "">
               <div class="video_info">
               <h2 class="title"> ${response.items[i].snippet.title}</h2>
               <p class="description">${response.items[i].snippet.description}</p>
               <span>View>></span>
                </div>
                </a>`;
                $("#result-list").append(line1);
            }  
        },
        error: function (err) {
            console.log(err)
        }
    });
}

function nextPage(input, obj) {
    $.ajax({
        url: `${input}&pageToken=${obj.token}`,
        type: "GET",
        success: function (response) {  
            console.log(response);

            for (var i = 0; i < 25; i++) {
                var line2 = `<a class="resultDisplay" href="https://www.youtube.com/wathc?v=${response.items[i].id.videoId}"?autoplay="true" target="_blank">
                 <img src="${response.items[i].snippet.thumbnails.medium.url}" alt = "">
               <div class="video_info">
               <h2 class="title"> ${response.items[i].snippet.title}</h2>
               <p class="description">${response.items[i].snippet.description}</p>
               <span>View>></span>
                </div>
                </a>`;
                $("#result-list").append(line2);
                console.log("Inside the nested loop");
            } 
                obj.token = response.nextPageToken;
        },
        error: function (err) {
            console.log(err)
        }
    });
}
