const express = require("express")
const path = require("path")
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express();


// set the view engine to ejs
app.set('view engine', 'ejs')
// set root folder for views
app.set('views', path.join(__dirname, 'views'))

// Statics
app.use(express.static(path.join(__dirname, 'static')))

// Encode body
app.use(bodyParser.urlencoded({ extended: false}));

app.use(cors())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const accountRouter = require('./routes/account')
const roomRouter = require('./routes/room')
const reviewRouter = require('./routes/review')

app.use(accountRouter.router)
app.use(roomRouter.router)
app.use(reviewRouter.router)

app.listen(3001, () => {
  console.log(`Example app listening at http://localhost:3001`)
})