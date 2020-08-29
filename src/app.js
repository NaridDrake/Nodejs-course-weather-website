const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//express path config
const pubDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//handlebars engine and views location setup
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(pubDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Narid Drake'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Narid Drake'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        msg: 'Kia ora, welcome to the help page for this server',
        name: 'Narid Drake'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404Page', {
        title: '404: Not Found',
        msg: 'Help article not found',
        name: 'Narid Drake'
    })
})

app.get('*', (req, res) => {
    res.render('404Page', {
        title: '404: Not Found',
        msg: 'Page not found',
        name: 'Narid Drake'
    })
})

app.listen(port, () => {
    console.log('Server has started on port ' + port)
})