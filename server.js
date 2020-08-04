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
let mongooseURL = "mongodb://localhost:27017/local"

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
            console.log('added your items to meowDB')
        }
    })
}

function deleteLastFeed() {
    //deletes the last feed in teh array
       Feed.deleteOne({}, (err) => {
           if (err) {
               console.log(err)
           } else {
               console.log("deleted newest one")
           }
       })
}


function deleteNewestFeed() {

    Feed.find((err, logs) => {
        var idArr = []
        logs.forEach((logs, i) => {
            idArr.unshift(logs._id)
        })
        Feed.deleteOne({_id: idArr[0]}, (err) => {if (err != true){console.log("deleted newest feed")}})
    })
}


//gets and posts
app.get('/', (req, res) => {

    Feed.find((err, logs) => {
        if (err) {
            console.log(err)
        } else {

        let data = {
            todaysDate: dates.today(),
            logs: logs.reverse()
        }
        
        res.render('log', data)
        }
    })
    
})

app.post('/', (req, res) => {
    
    if (req.body.fedButton == "+") {
        saveFeeds()
        
       Feed.find((err, logs) => {
            var countArr = []
            logs.forEach(logs => countArr.push(logs.log))
            if (countArr.length >= 11) {
                deleteLastFeed()
            }

        })


        res.redirect('/')
        

    }  else if (req.body.removeLastFeed == "-") {
        deleteNewestFeed()
        res.redirect('/')
    }

        
})

app.listen(port, console.log('server started on port 80'))