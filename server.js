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
    console.log(upcomingData);
    res.render("homepage/index", {
      movieData,
      nowPlayingData,
      upcomingData,
    });
  } catch (err) {
    console.error(err);
    res.render("homepage/index");
  }
});

app.get("/film/:title-:year", async (req, res) => {
  try {
    const url = req.params.title + "-" + req.params.year;
    const parts = url.match(/(.*)-(\d{4})/);
    const movieTitle = parts[1].replace(/-/g, " ");
    const movieYear = parts[2];

    const searchResponse = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=<your_api_key>&query=${movieTitle}&year=${movieYear}`
    );

    const movieData = searchResponse.data.results.find((result) =>
      result.release_date.startsWith(movieYear)
    );
    if (!movieData) {
      console.log("No movie found");
    } else {
      const movieId = movieData.id;
      const movieCredits = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=<your_api_key>`
      );
      const directors = movieCredits.data.crew.filter(
        (member) => member.job === "Director"
      );
      const directorNames = directors
        .map((director) => director.name)
        .join(", ");

      res.render("film/film", { movieData, directorNames });
    }
  } catch (err) {
    console.error(err);
    console.log("No movie found");
  }
});

// app.get("/film/:title/:year", async (req, res) => {
//   try {
//     const movieTitle = req.params.title.replace(/-/g, " ");
//     const movieYear = req.params.year;
//     const searchResponse = await axios.get(
//       `https://api.themoviedb.org/3/search/movie?api_key=5042d23af1cc65852a1dea00714c63fd&query=${movieTitle}&year=${movieYear}`
//     );

//     const movieData = searchResponse.data.results.find((result) => result.release_date.startsWith(movieYear));
//     if (!movieData) {
//       console.log("No movie found");
//     }

//     const movieId = movieData.id;
//     const movieCredits = await axios.get(
//       `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=5042d23af1cc65852a1dea00714c63fd`
//     );
//     const directors = movieCredits.data.crew.filter(
//       (member) => member.job === "Director"
//     );
//     const directorNames = directors.map((director) => director.name).join(", ");

//     res.render("film/film", { movieData, directorNames });
//   } catch (err) {
//     console.error(err);
//     console.log("No movie found");
//   }
// });

app.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=5042d23af1cc65852a1dea00714c63fd&query=${searchQuery}`
    );
    const movieData = response.data;
    console.log(movieData);
    res.render("search/results", { movieData });
  } catch (err) {
    console.error(err);
    res.render("homepage/index");
  }
});

app.use((req, res, next) => {
  res.status(404).render("error/404");
});

app.listen(3500);
