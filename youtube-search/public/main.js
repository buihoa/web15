/* $(document).ready(function() {

}) */

$("#toClick").on("click", function() {
    $(".resultDisplay").empty();
    console.log($("#keyword").val());
    inputResult($("#keyword").val());
})

function inputResult(input) {
    let obj = {token: ""};
    $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${input}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
        type: "GET",
        success: function (response) {  
            console.log(response);
            obj.token =  response.nextPageToken;

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
                console.log("Inside the main loop");
            }   
        },
        error: function (err) {
            console.log(err)
        }
    });

    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == getDocHeight()) {
            alert("Next page!");
            console.log(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${input}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`)
            nextPage(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${input}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`, obj);
        }
    });
}


function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

function nextPage(input, obj) {
    console.log(`${input}&pageToken=${obj.token}`);
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
            if(response.nextPageToken) {
                obj.token = response.nextPageToken;
            }
        },
        error: function (err) {
            console.log(err)
        }
    });
}
