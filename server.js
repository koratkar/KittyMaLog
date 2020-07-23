let express = require('express')
let bodyParser = require('body-parser')
let ejs = require('ejs')
const { currentTime } = require('./dates')
let dates = require(__dirname + '/dates.js')
let app = express()
let port = 80
var feeds = []

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    let data = {
        feeds: feeds,
        todaysDate: dates.today()
    }
    res.render('log', data)
})

app.post('/', (req, res) => {
    
    if (req.body.fedButton == "+") {
        let timeFed = dates.now()
        feeds.unshift(timeFed)
        if (feeds.length == 11) {
            feeds.pop()
        }


        res.redirect('/')
        

    }  else if (req.body.removeLastFeed == "-") {
        feeds.shift()
        res.redirect('/')
    }

        
})

app.listen(port, console.log('server started on port 80'))