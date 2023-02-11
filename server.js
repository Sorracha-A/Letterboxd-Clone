const express = require('express');
const app = express();
const filmsRouter = require('./routes/films');
const registerRouter = require('./routes/create-account');
const listRouter = require('./routes/lists');
const membersRouter = require('./routes/members');
const journalRouter = require('./routes/journal');
const signinRouter = require('./routes/sign-in');

// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use('/public', express.static('public'));
app.set('view engine','ejs')
app.use('/films',filmsRouter);
app.use('/lists',listRouter);
app.use('/create-account',registerRouter);
app.use('/members',membersRouter);
app.use('/journal',journalRouter);
app.use('/sign-in',signinRouter);
app.get('/', (req, res) => {
  res.render('homepage/index');
});

app.listen(3500)