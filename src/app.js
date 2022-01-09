
const path = require('path');
const express = require('express');
const hbs = require('hbs');// this is just for creating partials
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

//Define path to express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname , '../templates/partials');

//Setup handlebars and views location
app.set('view engine', 'hbs');
app.set ('views' , viewsPath);
hbs.registerPartials(partialsPath);


//Setup static directorey to serve
app.use(express.static(publicDirectoryPath));

app.get('/about' , (req , res) =>{
  res.render('about', {
    title : 'About me',
    name : 'Hameedreza Gucci'
  });
})

app.get('' , (req , res)=>{
  res.render('index', {
    title : 'Weather',
    name : 'Hameedreza Gucci'
  });
})

app.get('/help' , (req , res) =>{
  res.render('help', {
    title : 'Help',
    time : '20 minutes',
    name : 'Hameedreza Gucci',
    university: 'Beheshti'
  });
})

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));


// get function -> first argument is the route : partial url , second argument is the callback function
// app.get('' , (req , res) =>{
//   res.send('<h1>Hello Express!</h1>');
// })



// app.get('/help' , (req , res) =>{
//   res.send();
// })


// app.get('/about' , (req , res) =>{
//   res.send();
// })

app.get('/weather' , (req , res)=>{
  if(!req.query.address){
    return res.send({
      error : 'You must provide an address!'
    })
  }
  geocode(req.query.address , (error , {latitude , longitude , location} = {}) =>{
    if(error){
      return res.send({error});
    }
    forecast(latitude , longitude , (error , forecastData) =>{
      if(error){
        return res.send(error);
      }
      res.send({
        location,
        forecast : forecastData,
        address : req.query.address
      });
    });
    })
  })


app.get('/products' , (req, res)=>{
  if(!req.query.search){
    return res.send({
      error : 'You must provide a search term!'
    })
  }
  console.log(req.query);
  res.send({
    products : []
  })
})


app.get('/help/*',(req , res)=>{
  res.render('404' , {
    title : '404',
    name: 'Hameedreza',
    errorMessage : 'Help article not found!'
  })
});


app.get('*' , (req , res) =>{
  res.render('404', {
    title : '404',
    name : 'Hameedreza Gucci',
    errorMessage : 'Page not found!'
  })
})


app.listen(3000 , () =>{
  console.log('Server is up on port 3000');
});