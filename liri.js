require("dotenv").config();

var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

//commands that liri can take in
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says
var userCommand = process.argv[2]
var userInput = process.argv.slice(3);

console.log(userInput)
// console.log(spotify)

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
