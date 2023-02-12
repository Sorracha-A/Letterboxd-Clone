const express = require('express');
const app = express();
const axios = require("axios");
const filmsRouter = require('./routes/navbar/films');
const registerRouter = require('./routes/navbar/create-account');
const listRouter = require('./routes/navbar/lists');
const membersRouter = require('./routes/navbar/members');
const journalRouter = require('./routes/navbar/journal');
const signinRouter = require('./routes/navbar/sign-in');

app.use('/public', express.static('public'));
app.set('view engine','ejs')
app.use('/films',filmsRouter);
app.use('/lists',listRouter);
app.use('/create-account',registerRouter);
app.use('/members',membersRouter);
app.use('/journal',journalRouter);
app.use('/sign-in',signinRouter);

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=5042d23af1cc65852a1dea00714c63fd"
    );
    const movieData = response.data;
    console.log(movieData);
    res.render("homepage/index", { movieData });
  } catch (err) {
    console.error(err);
    res.render("homepage/index");
  }
});

app.listen(3500)
