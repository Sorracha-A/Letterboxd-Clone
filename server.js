const express = require("express");
const session = require("express-session");
const nocache = require("nocache");
require("dotenv").config();

const app = express();
const axios = require("axios");
const filmsRouter = require("./routes/navbar/films");
const listRouter = require("./routes/navbar/lists");
const membersRouter = require("./routes/navbar/members");
const journalRouter = require("./routes/navbar/journal");
const collection = require("./mongodb");
const { render } = require("ejs");
const API_KEY = process.env.TMDB_API_KEY;
const PORT = process.env.PORT || 3500;

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/public", express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.use("/members", membersRouter);
app.use("/journal", journalRouter);

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    const movieData = response.data;

    const nowPlayingResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US`
    );
    const nowPlayingData = nowPlayingResponse.data;

    const upcomingResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US`
    );
    const upcomingData = upcomingResponse.data;

    // console.log(nowPlayingData);
    // console.log(upcomingData);

    if (req.session.isLoggedIn) {
      const user = req.session.user;
      res.render("homepage/logged-in", {
        movieData,
        nowPlayingData,
        upcomingData,
        user,
      });
    } else {
      res.render("homepage/index", {
        movieData,
        nowPlayingData,
        upcomingData,
      });
    }
  } catch (err) {
    console.error(err);
    res.render("homepage/login");
  }
});

app.get("/sign-in", (req, res) => {
  res.render("sign-in/login");
});

app.get("/create-account", (req, res) => {
  res.render("registration/registration");
});

app.post("/signup", async (req, res) => {
  const data = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };
  console.log(data);
  await collection.insertMany([data]);

  res.redirect("/");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await collection.findOne({ email: email, password: password });
  if (user) {
    req.session.email = email;
    req.session.isLoggedIn = true;
    req.session.user = await collection.findOne({ email: email });
    res.redirect("/");
  } else {
    res.render("sign-in/login", { error: "Invalid email or password" });
    
  }
});

app.get("/lists", async (req, res) => {
  try {
    const popularResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    const topRatedResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
    );

    const movieData = popularResponse.data;
    const topRatedMovieData = topRatedResponse.data;
    if (req.session.isLoggedIn) {
      const user = req.session.user;
      res.render("lists/lists-member", { movieData, topRatedMovieData, user });
    } else {
      res.render("lists/lists", { movieData, topRatedMovieData });
    }
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
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieTitle}&year=${movieYear}`
    );

    const movieData = searchResponse.data.results.find((result) =>
      result.release_date.startsWith(movieYear)
    );
    if (!movieData) {
      console.log("No movie found");
    } else {
      const movieId = movieData.id;
      const movieReviews = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
      );
      const movieCredits = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
      );
      const directors = movieCredits.data.crew.filter(
        (member) => member.job === "Director"
      );
      const cast = movieCredits.data.cast;

      const directorNames = directors
        .map((director) => director.name)
        .join(", ");

      res.render("film/film", { movieData, directorNames, movieReviews, cast });
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
//       `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieTitle}&year=${movieYear}`
//     );

//     const movieData = searchResponse.data.results.find((result) => result.release_date.startsWith(movieYear));
//     if (!movieData) {
//       console.log("No movie found");
//     }

//     const movieId = movieData.id;
//     const movieCredits = await axios.get(
//       `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
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

app.get("/list/new", async (req, res) => {
  try {
    const popularResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    const topRatedResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
    );

    const movieData = popularResponse.data;
    const topRatedMovieData = topRatedResponse.data;

    if (req.session.isLoggedIn) {
      const user = req.session.user;
      res.render("lists/list-new", { movieData, topRatedMovieData, user });
    } else {
      res.render("lists/lists", { movieData, topRatedMovieData });
    }
  } catch (err) {
    console.error(err);
    res.render("homepage/index");
  }
});

app.get("/films", async (req, res) => {
  try {
    const popularResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    const topRatedResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
    );

    const movieData = popularResponse.data;
    const topRatedMovieData = topRatedResponse.data;

    res.render("films/films", { movieData, topRatedMovieData });
  } catch (err) {
    console.error(err);
    res.render("homepage/index");
  }
});

app.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
    );
    const movieData = response.data;

    res.render("search/results", { movieData });
  } catch (err) {
    console.error(err);
    res.render("homepage/index");
  }
});

app.get("/s/autocompletefilm", async (req, res) => {
  const query = req.query.term;
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
  );
  const titles = response.data.results.map((result) => ({
    id: result.id,
    label: `${result.title} (${
      result.release_date ? new Date(result.release_date).getFullYear() : "N/A"
    })`,
  }));
  res.send(titles);
});

app.post("/s/getmoviedetails", async (req, res) => {
  const movieId = req.body.movieId;
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
  );
  const movieDetails = {
    title: response.data.title,
    release_date: response.data.release_date,
    poster_path: response.data.poster_path,
    // add more movie details here if needed
  };
  res.send(movieDetails);
});

app.post("/add-to-list", async (req, res) => {
  const { user, listName, films } = req.body;
  console.log("listname: ", listName);
  try {
    const currentUser = await collection.findById(user);
    const list = currentUser.lists.find((list) => list.name === listName);

    if (list) {
      list.films.push(...films);
    } else {
      const newList = {
        name: listName,
        films: films,
      };
      currentUser.lists.push(newList);
    }

    await currentUser.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error });
  }
});



app.get("/:username/lists", nocache(), async (req, res) => {
  // rest of the code to handle the route
  try {
    if (req.session.isLoggedIn) {
      const user = await collection.findOne({ email: req.session.user.email });
      console.log(user);
      console.log(user.lists[0].films[0].title);
      res.render("lists/movie-lists", { user });
    } else {
      res.render("sign-in/login");
    }
  } catch (err) {
    console.error(err);
    res.render("homepage/index");
  }
});


app.get("/:username/list/:listname", nocache(), async (req, res) => {
  const listname = req.params.listname;
  console.log(listname);
  try {
    if (req.session.isLoggedIn) {
      const user = await collection.findOne({ email: req.session.user.email });
      const list = user.lists.find(lists => lists.name === listname)
      // console.log(user);
      // console.log(user.lists[0].name);
      console.log(list);
      res.render("lists/list-detail", { user,list });
    } else {
      res.render("sign-in/login");
    }
  } catch (err) {
    console.error(err);
    res.render("homepage/index");
  }
});

app.use((req, res, next) => {
  res.status(404).render("error/404");
});

app.listen(PORT);
