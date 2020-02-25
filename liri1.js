require("dotenv").config();
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const chalk = require("chalk");

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var userCommand = process.argv[2];
var userInput = process.argv.slice(3);


function getMyBands() {
    // console.log("inside bands function")
    var bandQuery = "https://rest.bandsintown.com/artists/" + userInput.join('') + "/events?app_id=codingbootcamp"
    // console.log(bandQuery)
    axios.get(bandQuery)
    .then(response => {
        // console.log(response.data)
            if (response.data.length === 0) {
                var noBandResponse = "Sorry, " + userInput.join(" ") + " currently does not have any upcoming performances."
                console.log(chalk.bgRed(noBandResponse));
                fs.appendFile('./log.txt', noBandResponse + "\n\r" , function(err) {
                    if (err) throw err;
                })
            } else {
                
                var bandConfirm = userInput.join(" ") + " will be playing at the following venues:"
                console.log(chalk.red.bgGreen(bandConfirm));
                fs.appendFile('./log.txt', bandConfirm + '\n\r', function(err) {
                    if (err) throw err;
                })
                for (i = 0; i < response.data.length; i++) {
                    //parses and stores the response
                    var venueName = response.data[i].venue.name;
                    var cityName = response.data[i].venue.city + ", " + response.data[i].venue.country;
                    var concertTime = moment(response.data[i].datetime).format('MM/DD/YYYY');

                    //displays the parsed response
                    console.log(chalk.yellow.bold("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
                    console.log(chalk.redBright(venueName));
                    console.log(chalk.blue(cityName));
                    console.log(chalk.blue(concertTime));
                    console.log(chalk.yellow.bold("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));

                    //logs the parsed response
                    fs.appendFile('./log.txt', "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n" + venueName + "\n" + cityName + "\n" + concertTime + "\n" + "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\r", function(err) {
                        if (err) throw err;
                    })
                }
            }
        });
}

function getMeSpotify () {
    console.log("inside spotify function")
    if (userCommand === "spotify-this-song" && userInput.length === 0) {
        console.log(chalk.green('The instructions insist that I set the default spotify query to "The Sign" by Ace of Base.  I have tremendous difficulties imagining why, but I did it anyway.  When you are done with that drek and you find yourself ready to hear some music with a significantly more developed level facility and craft, try querying "Shofukan" by Snarky Puppy, "CAFO" by Animals as Leaders, or "Garden in the Bones" by Periphery.  Your brain and ears deserve it.'));
        userInput = "the sign"

        fs.appendFile('./log.txt', 'The default Spotify query was tiggered.', function(err) {
            if (err) throw err;
        });
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
                    //parses and stores the response
                    var artistName = "Artist: " + songs.artists[0].name;
                    var trackTitle = "Track Title: " + songs.name;
                    var listenLink = "Check it out: " + songs.external_urls.spotify;
                    var album = "From the album: " + songs.album.name;

                    //displays the parsed respone
                    console.log(chalk.red.bold("----------------------------"));
                    console.log(chalk.yellow.bold.underline(artistName));
                    console.log(chalk.green.underline(trackTitle));
                    console.log(chalk.cyan(listenLink));
                    console.log(chalk.cyan(album));
                    console.log(chalk.red.bold("----------------------------"));

                    //logs the parsed response
                    fs.appendFile('./log.txt',  "\n----------------------------\n" + artistName + "\n" + trackTitle + "\n" + listenLink + "\n" + album + "\n" + "----------------------------\n", function(err){
                        if (err) throw err;
                    })


            }
        });
    }

function getMyMovies() {
    // console.log("Movie function is moving.")
    if (userCommand === "movie-this" && userInput.length === 0) {
        console.log(chalk.yellow("nothing to see hear..."));
        userInput = "Mr. Nobody"
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function(response){
            console.log(chalk.redBright("============================="));
            // console.log(response.data)
            console.log(chalk.yellow.bold.underline("Title: ", response.data.Title));
            console.log(chalk.cyan("Released: ", response.data.Year));
            console.log(chalk.cyan("IMDB Rating: ", response.data.imdbRating));
            console.log(chalk.cyan("Rotten Tomatoes Rating: ", response.data.Ratings[1].Value));
            console.log(chalk.cyan("Produced in: ", response.data.Country));
            console.log(chalk.cyan("Language(s): ", response.data.Language));
            console.log(chalk.cyan("Actors: ", response.data.Actors));
            console.log(chalk.redBright("============================="));
        }
    )
}

//console log diagnostic set:
// console.log(userInput)
// console.log(spotify)
// console.log(keys.id)
// console.log(keys.secret)
//concert-this system:

function start(ar1, arg2){
    switch(ar1) {
        case "concert-this": getMyBands(arg2);
          break;
        case "spotify-this-song": getMeSpotify(arg2);
             break;
        case "movie-this": getMyMovies(arg2);
            break;
        default: suggestions();
      }
}
start(userCommand, userInput);
function suggestions(){
    // read random.txt file

        fs.readFile("./random1.txt", "utf8", function(error, data) {
            if (error) {
                return console.log(error);
            }
            var resultArray = data.split(",");
            console.log(resultArray)
            userCommand = resultArray[0];
            userInput = resultArray[1];
            start(resultArray[0], resultArray[1]);
        });
   
}
