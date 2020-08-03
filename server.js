//jshint esversion:6, asi: true

//libraries and modules
let express = require('express')
let bodyParser = require('body-parser')
let ejs = require('ejs')
let mongoose = require('mongoose')
let app = express()

let dates = require(__dirname + '/dates.js')

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

let port = 80
let mongooseURL = "mongodb://localhost:27017/meowDB"

mongoose.connect(mongooseURL, {useNewUrlParser: true, useUnifiedTopology: true})

//mongoose stuff
let logSchema = {
    log: String
}

let Feed = mongoose.model("Feed", logSchema)

function saveFeeds() {
    let newFeedLog = new Feed({
        log: dates.now()
    })
    let array = [newFeedLog]

    Feed.insertMany(array, function(err) {
        if (err) { console.log(err)} else {
            console.log('added your items to MeowDB')
        }
    })
}

function deleteLastFeed() {
   //find out how to make this cat work
    // Feed.deleteOne()
}

function retrieveFeedLog() {
    Feed.find(Feed.log, function(err) {
        if (err) { console.log(err)} else {
            console.log('added your items to MeowDB')
        }
    })
}

function deleteNewestFeed() {
    "ok"
}


//gets and posts
app.get('/', (req, res) => {
    let data = {
        feeds: retrieveFeedLog(),
        todaysDate: dates.today()
    }
    res.render('log', data)
})

app.post('/', (req, res) => {
    
    if (req.body.fedButton == "+") {
        saveFeeds()
        
        //if statement to keep length under ten
        if (feeds.length == 11) {
            deleteLastFeed()
        }


        res.redirect('/')
        

    }  else if (req.body.removeLastFeed == "-") {
        deleteNewestFeed()
        res.redirect('/')
    }

        
})

app.listen(port, console.log('server started on port 80'))