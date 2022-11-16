const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()
const port = process.env.PORT || 3000

// define paths for Express config
const staticFile = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(staticFile))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Root title',
        name: 'Alex',
        year: 2022
    })
})




app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'No address term provided'
        })
    }

    geocode(address, (error, { latitude, longitude} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error }) // shorthand for 'error: error'
            }

            res.send({
                forecast: forecastData,
                longitude: longitude,
                latitude: latitude,
                address: req.query.address
            })
        })
    })
})







app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "No search term provided"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About title',
        name: 'Alex',
        year: 2022
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help title',
        email: 'support@gmail.com',
        name: 'Alex',
        year: 2022
    })
})

app.get('/support', (req, res) => {
    res.send('Support is not here')
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help page not found',
        title: 'Error page',
        name: 'Alex',
        year: 2022
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        title: '404',
        name: 'Alex',
        year: 2022
    })
})



app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})