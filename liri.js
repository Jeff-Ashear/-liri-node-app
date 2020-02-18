require("dotenv").config();

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
    console.log("time to BandsInTown")
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
