const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials/")

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Gaurav"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Gaurav"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Gaurav",
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Help",
        name: "Gaurav",
        errorMessage: "Help not found"
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "No search query provided"
        })
    }
    geoCode(req.query.address, (error, {latitude, logitude, location}={})=>{
        if(error)
            return res.send(error);
        forecast(latitude, logitude, (error, forecastData) => {
            if(error)
                return res.send(error)
           
            res.send({
                location: req.query.address,
                forecast: forecastData
            })
        })
    })
    
})

app.get('/*', (req, res) => {
    res.render('404', {
        errorMessage: "Page not found",
        title: "404",
        name: "Gaurav"
    })
})
app.listen(3000, () => {
    console.log('Server is up!')
})