require("dotenv").config();
const axios = require("axios")
const moment = require("moment")

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var userCommand = process.argv[2]
var userInput = process.argv.slice(3);


function getMyBands() {
    console.log("inside bands function")
    var bandQuery = "https://rest.bandsintown.com/artists/" + userInput.join('') + "/events?app_id=codingbootcamp"
    console.log(bandQuery)
    axios.get(bandQuery)
    .then(response => {
        // console.log(response.data)
            if (response.data.length === 0) {
                console.log("Sorry, ", userInput.join(" "), "currently does not have any upcoming performances.")
            } else {
                
                console.log(userInput.join(" "), " will be playing at the following venues:")
                for (i = 0; i < response.data.length; i++) {
                    console.log(response.data[i].venue.name)
                    console.log(response.data[i].venue.city, ", ", response.data[i].venue.country)
                    var concertTime = moment(response.data[i].datetime).format('MM/DD/YYYY');
                    console.log(concertTime)
                    console.log("----------------------")
                }
            }
        });
}

function getMeSpotify () {
    console.log("inside spotify function")
    spotify.search({ type: 'track', query: userInput }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
    //   console.log(data); 
      var songs = data.tracks.items[0];
      console.log(songs)
      console.log(songs.album.artists)
      console.log(userInput.join(" "), "was composed and performed by", songs.artists[0].name)
      console.log("Check it out: ", songs.album.artists[0].external_urls.spotify)
    });
}

//commands that liri can take in
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

console.log(userInput)
// console.log(spotify)
console.log(keys.id)
console.log(keys.secret)


if (userCommand == "movie-this") {
    console.log(userCommand)
    console.log("time to ombd")
}

if (userCommand == "do-what-it-says") {
    console.log(userCommand)
    console.log("time to randomize")
}

//concert-this system:

function start(ar1, arg2){
    switch(ar1) {
        case "concert-this": getMyBands(arg2);
           console.log("time to rock the fuck out") 
           
          break;

        case "spotify-this-song": getMeSpotify(arg2);
             break;

        case "movie-this": 
    
        default: console.log("Please enter one of the following commands: concert-this, spotify-this-song, or movie-this.  Then enter the title of a song, musical act, or film.");
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
