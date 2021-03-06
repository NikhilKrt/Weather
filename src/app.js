const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3000;

//Define paths for Express Config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath =  path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectory));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Nikhil Krt'
    });
});

app.get('/help' , (req, res) => {
    res.render('help', {
        helpText: 'This here for help',
        title: 'Help ',
        name: 'Nikhil Krt'
       
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Ablout ',
        name: 'Nikhil Krt'
    });
});

app.get('/weather', (req, res) => {
   if(!req.query.address) {
       return res.send({
           error: 'Address is required'
       });
   }

  const address =   req.query.address;
  geocode(address, (error, {latitude, longitude, location} = {}) => {
      if(error) {
          return res.send({error});
      }
      forecast(latitude, longitude, (error, forecastData) => {
          if(error) res.send({error});

          res.send({
              forecast: forecastData,
              location,
              address
          })
      })
  });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Serach required'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404' , {
        title: '404',
        name:'Nikhil Krt',
        errorMessage: 'Help artical not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 ERROR',
        name: 'Nikhil Krt',
        errorMessage: 'Page not found'
    });
});

app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
});