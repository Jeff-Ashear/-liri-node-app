# -liri-node-app
        Developed by Jeff Ashear


Link to video of the application functioning:


1. Purpose for this app:
	-This app provides a language-based CLI to access information from the the following     API’s:
		-Moment
-Spotify
-DotEnv
-Axios will be used to access:
	-Bands In Town
			-OMBD
	-The user will be able to input one of four text commands to pull results from the API’s


2. How the app is organized:
The body of the code, in the liri.js file, will be responsible for executing:
	I. The user interface:
	    a. A switch statement will filter for certain commands 
	    b. will look for and store input from the user following the command
 	    C. will the use the command to route the input to the correct function
	II. A function for each command which will:
Concatonate the user input with other strings to generate a coherently formatted api query
Send that query
Capture and parse the results
Output the appropriate results that match the command
Append a text file to create a log of user interactoins.
      B. Addition files will be:
	I. a keys.js file to route the api keys.
	II.  a .gitignore file to limit the amount of unnecessary data uploaded to the repo
	III. a .env file to store the spotify api key and secret
	IV. a  random.txt file to store a default spotify search
	V. a log.txt file to store a list of user interactions 

3.  Instructions for using this app:
Download or clone the repo from the link in step 5
Open the file called “liri.js” in VSCode
Open the terminal.
Terminal commands are as follows:
To run the program type into the console: “node liri.js”
The program will run with defaults with no further input
To see the default song, type: “node liri.js spotify-this-song”
To see the default film type: “node liri.js movie-this”
To see data about concerts type the command: “node liri.js concert-this” followed by the name of a band.  For example: “node liri.js spotify-this-song periphery.”  The app will then retrieve concert venues with dates.
To see data about a song type the command: “node liri.js concert-this” followed by the title of a song.  For example: “node liri.js spotify-this-song closer to the heart.”  The app will then retrieve all songs with that title and show the recording artist, the album on which the song appears, and a link to allow you to hear the song on the Spotify website.
To see data about a movie type the command: “node liri.js movie-this” followed by the title of a film.  For example: “node liri.js movie-this blade runner.”  The app will then retrieve the title, release date, ratings, actors, and production country of that film.
	

4. Link to a video of the app functioning:
	https://drive.google.com/file/d/1DDcWmN4G2yuQV96XWFVSSr-76Lsmo466/view

5. Link to the deployed version of the app:
	https://github.com/Jeff-Ashear/-liri-node-app.git
 ...and a link to the repo:
	https://github.com/Jeff-Ashear/-liri-node-app.git



6. Technologies used in creating this app:
GitHub is used to store the repo
VSCode was used to write all the code
Node.js was used to manage .JSON packages to handle:
API’s
Spotify
Moment
DotEnv
Axios
OMDB
Bands In Town
		D. Screencastify to create video of the app functioning
E.  

7. I was the sole developer of this app; however I asked for assistance in getting the spotify query to work.  I wrote the CLI, the remaining queries, the documentation, and captured the demo video.
