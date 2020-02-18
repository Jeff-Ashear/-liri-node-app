require("dotenv").config();
const axios = require("axios")
const moment = require("moment")

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

function getMeSpotify () {
    console.log("inside spotify function")
    spotify.search({ type: 'track', query: userInput }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      //console.log(data); 
      var songs = data.tracks.items[0];
      console.log(songs.album.artists)
    });
}

//commands that liri can take in
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says
var userCommand = process.argv[2]
var userInput = process.argv.slice(3);

console.log(userInput)
// console.log(spotify)
console.log(keys.id)
console.log(keys.secret)

if (userCommand == "concert-this") {
    console.log(userCommand)
    var userConcertURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
    console.log("time to BandsInTown")
    console.log("gotta query: ", userConcertURL)

    //query bands in town via axios
    axios.get(userConcertURL)
        .then(response =>  {
            //loop
        console.log(response.data[0])
        console.log(userInput, "will be playing the following venues:")
        // for (i = 0; i < offers.length; i++) {
            console.log(response.data[0].venue.name)      
    })

    .catch(function(error) {
        console.log(error);
    })
}

if (userCommand == "spotify-this-song") {
    console.log(userCommand)
    console.log("time to spotify")
    getMeSpotify();
}

if (userCommand == "movie-this") {
    console.log(userCommand)
    console.log("time to ombd")
}

if (userCommand == "do-what-it-says") {
    console.log(userCommand)
    console.log("time to randomize")
}

//concert-this system:

function start(ar1, ar2){
    switch(ar1) {
        case "spotify-this-song": getMeSpotify(arg2);
             break;
    
        case "concert-this": getMyBands(arg2);
          // code block
          break;
        default: console.log("I don't know what you are taking");
          // code block
      }
}
start(userCommand, userInput);
function doWhatItSays(){
    // read random.txt file
    // you will get data back after reading the file
    var resultArray = data.split(",");
    start(resultArray[0], resultArray[1]);
}
