const express = require("express");
const app = express();
const axios = require("axios");
const filmsRouter = require("./routes/navbar/films");
const registerRouter = require("./routes/navbar/create-account");
const listRouter = require("./routes/navbar/lists");
const membersRouter = require("./routes/navbar/members");
const journalRouter = require("./routes/navbar/journal");
const signinRouter = require("./routes/navbar/sign-in");

app.use("/public", express.static("public"));
app.set("view engine", "ejs");
app.use("/films", filmsRouter);
app.use("/lists", listRouter);
app.use("/create-account", registerRouter);
app.use("/members", membersRouter);
app.use("/journal", journalRouter);
app.use("/sign-in", signinRouter);

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=<your_api_key>"
    );
    const movieData = response.data;

    const nowPlayingResponse = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=<your_api_key>&language=en-US"
    );
    const nowPlayingData = nowPlayingResponse.data;

    const upcomingResponse = await axios.get(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=<your_api_key>&language=en-US"
    );
    const upcomingData = upcomingResponse.data;

    console.log(nowPlayingData);
    res.render("homepage/index", {
      movieData, nowPlayingData,upcomingData
    });
  } catch (err) {
    console.error(err);
    res.render("homepage/index");
  }
});

app.get("/film/:title", async (req, res) => {
  try {
    const movieTitle = req.params.title.replace(/-/g, " ");
    const searchResponse = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=<your_api_key>&query=${movieTitle}`
    );
    const movieId = searchResponse.data.results[0].id;
    const movieResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=<your_api_key>`
    );
    const movieData = movieResponse.data;
    const movieCredits = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=<your_api_key>`
    );
    const directors = movieCredits.data.crew.filter(
      (member) => member.job === "Director"
    );
    const directorNames = directors.map((director) => director.name).join(", ");

    res.render("film/film", { movieData, directorNames });
  } catch (err) {
    console.error(err);
    res.render("homepage/film");
  }
});

app.listen(3500);
