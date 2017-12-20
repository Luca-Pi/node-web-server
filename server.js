const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
let app = express();

const PORT = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log(err);
    }
  });
  next();
});
// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Page',
//     pageContent: 'Sorry, we will be back soon :)'
//   });
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('index.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello! This is Home Page!'
  });
});

app.get('/about',(req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    pageContent: 'a page about da app!'
  });
});
app.get('/project',(req, res) => {
  res.render('project.hbs', {
    pageTitle: 'Project Page'
  });
});


app.get('/bad', (req, res) => {
  res.status(404).send('<h1>Error: 404</h1>' + '<h2>Page Not Found</h2>')
});

app.listen(PORT, () => {
  console.log(`App server is up on port: ${PORT}`);
});

