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


function deleteNewestFeed() {
    "ok"
}

function getFeedLog() {
    Feed.find( (err, logs) => {
        if (err) {
            console.log(err)
            jango = []
        } else {
            var feedLogArr = []
            logs.forEach(logs => feedLogArr.unshift(logs.log))
            return feedLogArr
        }
    })
}

//gets and posts
app.get('/', (req, res) => {
        
    let data = {
        todaysDate: dates.today()
    }

    Feed.find( (err, logs) => {
            if (err) {
                console.log(err)
            } else {
                var feedLogArr = []
                logs.forEach(logs => feedLogArr.unshift(logs.log))
                res.render('log', {feeds: feedLogArr, todaysDate: dates.today()})
            }
    })
})

app.post('/', (req, res) => {
    
    if (req.body.fedButton == "+") {
        saveFeeds()
        
        // if (feedLogArray.length >= 11) {

        // }


        res.redirect('/')
        

    }  else if (req.body.removeLastFeed == "-") {
        deleteNewestFeed()
        res.redirect('/')
    }

        
})

app.listen(port, console.log('server started on port 80'))