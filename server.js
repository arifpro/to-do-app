let express = require('express')
let mongodb = require('mongodb')
let sanitizeHTML = require('sanitize-html')
require('dotenv').config()

let app = express()
let db

let port = process.env.PORT
if (port == null  ||  port == '') {
  post = 4000
}

app.use(express.static('public'))
let connectionString = process.env.DB_PATH
let secondParameter = {useNewUrlParser: true, useUnifiedTopology: true}
mongodb.connect(connectionString, secondParameter, function(err, client) {
  db = client.db()
  // app.listen(4000)
  // const port = process.env.PORT || 4000
  app.listen(port, () => console.log(`Listening to port ${port}`))
})

app.use(express.json())
app.use(express.urlencoded({extended: false}))

function passwordProtected(req, res, next) {
  res.set('WWW-Authenticate', 'Basic realm="Simple Todo App"')
  // console.log(req.headers.authorization)
  if (req.headers.authorization == "Basic amF2YXNjcmlwdDpqcw==") {
    next()
  } else {
    res.status(401).send("Authentication required")
  }
}

app.use(passwordProtected)

app.get('/',  function(req, res) {
  db.collection('items').find().toArray(function(err, items) {
    res.send(`<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Simple To-Do App</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    </head>
    <body>
      <div class="container">
        <h1 class="display-4 text-center py-1">To-Do App</h1>
        
        <div class="jumbotron p-3 shadow-sm">
          <form id="create-form" action="/create-item" method="POST">
            <div class="d-flex align-items-center">
              <input id="create-field" name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
              <button class="btn btn-primary">Add New Item</button>
            </div>
          </form>
        </div>
        
        <ul id="item-list" class="list-group pb-5">
        </ul>

      </div>

      <script>
        let items = ${JSON.stringify(items)}
      </script>
      
      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
      <script src="/browser.js"></script>
    </body>
    </html>`)
  })
})

app.post('/create-item',  function(req, res) {
  let safeText = sanitizeHTML(req.body.text, {
    allowedTags: [], 
    allowedAttributes: {}
  })
  db.collection('items').insertOne({text: safeText}, function(err, info) {
    res.json(info.ops[0])
  })
})

app.post('/update-item', function(req, res) {
  let safeText = sanitizeHTML(req.body.text, {
    allowedTags: [], 
    allowedAttributes: {}
  })
  db.collection('items').findOneAndUpdate(
    {_id: new mongodb.ObjectID(req.body.id)},
    {$set: {text: safeText}}, 
    function() {
      res.send("Success")
    }
  )
})

app.post('/delete-item', function(req, res) {
  db.collection('items').deleteOne({_id: new mongodb.ObjectID(req.body.id)}, function() {
    res.send("Success")
  })
})