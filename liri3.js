require("dotenv").config();
const axios = require("axios")
const moment = require("moment")
const fs = require("fs")

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
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                    console.log(response.data[i].venue.name)
                    console.log(response.data[i].venue.city, ", ", response.data[i].venue.country)
                    var concertTime = moment(response.data[i].datetime).format('MM/DD/YYYY');
                    console.log(concertTime)
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                }
            }
        });
}

function getMeSpotify () {
    console.log("inside spotify function")
    if (userCommand === "spotify-this-song" && userInput.length === 0) {
        console.log('The instructions insist that I set the default spotify query to "The Sign" by Ace of Base.  I have tremendous difficulties imagining why, but I did it anyway.  When you are done with that drek and you find yourself ready to hear some music with a much higher level of facility and craft, try querying "Shofukan" by Snarky Puppy, "CAFO" by Animals as Leaders, or "Garden in the Bones" by Periphery.  Your brain and ears deserve it.')
        userInput = "the sign"
    }
        spotify.search({ type: 'track', query: userInput }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
        
        //   console.log(data);

            
                for (i = 0; i < data.tracks.items.length; i++) {
        
                var songs = data.tracks.items[i];
                //   console.log(songs)
                // console.log("Songs.album.artists: ", songs.album.artists)
                console.log("Artist: ", songs.artists[0].name)
                console.log("Track Title: ", songs.name)
                console.log("Check it out: ", songs.external_urls.spotify)
                console.log("From the album: ", songs.album.name)
                console.log("----------------------------")
            }
        });
    }


function getMyMovies() {
    console.log("Movie function is moving.")
    if (userCommand === "movie-this" && userInput.length === 0) {
        console.log("nothing to see hear...")
        userInput = "Mr. Nobody"
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function(response){
            console.log("=============================")
            // console.log(response.data)
            console.log("Title: ", response.data.Title)
            console.log("Released: ", response.data.Year)
            console.log("IMDB Rating: ", response.data.imdbRating)
            console.log("Rotten Tomatoes Rating: ", response.data.Ratings[1].Value)
            console.log("Produced in: ", response.data.Country)
            console.log("Language(s): ", response.data.Language)
            console.log("Actors: ", response.data.Actors)
            console.log("=============================")
        }
    )
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

        case "movie-this": getMyMovies(arg2);
            console.log("time to veg the fuck out")
            break;
    
        default: doWhatItSays();
      }
}
start(userCommand, userInput);
function doWhatItSays(){
    // read random.txt file
    fs.readFile("./random1.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var resultArray = data.split(",");
        console.log(resultArray)
        start(resultArray[0], resultArray[1]);
    });
}
   console.log(userCommand, userInput)