const path = require('path');   //core node module
const express  = require('express');    //npm express module
const hbs = require('hbs');

const geocoding = require('./geocoding.js');
const weather = require('./weather.js');

const app = express();  //calling express() to init the server
const port = process.env.PORT || 3000;


const publicDirPath = path.join(__dirname,'../public'); //__dirname is a node variable to hold the directory name 
// path.join helps us to get the path of the public folder
const viewsPath = path.join(__dirname,'../templates/views');    //path of hbs views
const partialsPath = path.join(__dirname,'../templates/partials');


app.set('view engine', 'hbs');  // to make html pages dynamic we used npm package hbs
// note: the above line must be verbatim
app.set('views' , viewsPath);   //changed the path for views as views are not in root
hbs.registerPartials(partialsPath);


app.use(express.static(publicDirPath)); // it is used to load the static assets to the server root

//if we use static html then as index.html is a special name so it will automatically set as the html structure of the home page

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name:'Trinanjan Nandi'
    });
})

app.get('/help', (req,res) => {  //the callback fn is called routing handler fn
    res.render('help', {
        title: 'Help',
        name: 'Trinanjan Nandi'
    });
});

app.get('/about' ,(req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Trinanjan Nandi',
        helpText: 'some useful helps'
    });
});

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({error: 'Must provide a location'});
    }
    userInputLocation = req.query.address;
    geocoding.geocoding(userInputLocation,(error, data) => {

        if(error){
            return res.send({error});
        } else{
            weather.forcast(data.latitude,data.longitude, (error,dataForecast) => {
                if(error){ return res.send({error}); }
                else{
                    res.send({
                        location: data.location,
                        forecast: dataForecast
                    });
                }
            });
        }
        
    });

});


app.get('*', (req, res) => {    // setting a 404 page. Note: we have to use * at the end of every relevant app.get call
    res.render('404' , {
        title: 'ERROR: 404',
    });
})

app.listen(port, ()=>{  // portName : 3000 localhost
    console.log(`successful on port ${port}`);
});