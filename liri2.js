require("dotenv").config();
const axios = require("axios")
const moment = require("moment")

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

function Spotify (id, secret) {
    this.id = id;
    this.secret = secret;
    console.log("constructor id: ", id)
    console.log("constructor secret: ", secret)
}

//commands that liri can take in
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says
var userCommand = process.argv[2]
var userInput = process.argv.slice(3);

console.log(userInput)
console.log(spotify)
console.log(keys)

if (userCommand == "concert-this") {
    console.log(userCommand)
    var userConcertURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
    console.log("time to BandsInTown")
    console.log("gotta query: ", userConcertURL)

    //query bands in town via axios
    axios.get(userConcertURL)
        .then(response =>  {
        console.log(response.data)
        console.log(userInput, "will be playing the following venues:")
        // for (i = 0; i < offers.length; i++) {
            console.log(response.data.venue.name)      
    })
    .catch(function(error) {
        console.log(error);
    })
}

if (userCommand == "spotify-this-song") {
    console.log(userCommand)
    console.log("time to spotify")
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
