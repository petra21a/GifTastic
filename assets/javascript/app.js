// let urlQuery = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"
let topics = ["swim","run","jump","glide","sit","talk"];
const apiKey = "nSYAjwmjaYmqnTuJHqRejr13snhO8ONY";

createButtons();


function createButtons(){
    for(i=0; i<topics.length; i++){
        let newButton =$("<button>")
        .addClass("search-gifs")
        .attr("data-name",topics[i])
        .text(topics[i]);
        $("nav").append(newButton);
    };
}

$("#add-topic").on("click", function(){
    event.preventDefault();
    $("nav").empty();
    let newTopic = $("#new-topic").val().trim();
    if(newTopic!==""){
        topics.push(newTopic);
        console.log(topics);
        $("#new-topic").val("");
    }
    createButtons();
});

$(document).on("click",".search-gifs", function(){
    event.preventDefault();
    search = $(this).attr("data-name");
    $("main").empty();
    let gifList = $("<div>").attr("id","gif-list");
    console.log(search)
    let queryURL = "http://api.giphy.com/v1/gifs/search?q="+search+"&api_key="+apiKey+"&limit=10"
        $.ajax({
            url: queryURL,
            method: "GET"
          })
            .then(function(response) {
              console.log(response, response.data.length);
              for(let i = 0; i<response.data.length; i++){
                  gifList.append("<img class='gif' id='"+search+"-"+i+"' src='"+response.data[i].images.downsized_still.url+"' data-still='"+
                  response.data[i].images.downsized_still.url+"' data-animate='"+
                  response.data[i].images.downsized.url+"' data-state='still' >");
              }

    });
    $("main").append(gifList);
});

$(document).on("click","img", function(){
    let state = $(this).attr("data-state");
    console.log(state);
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

});