// call all the required packages
const express = require('express')
const bodyParser= require('body-parser')
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3001

//CREATE EXPRESS APP
app.use(bodyParser.urlencoded({extended: true}))
 

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
var upload = multer({ storage: storage })

//ROUTES WILL GO HERE
app.get('/', function(req, res) {
    res.json({ message: 'WELCOME' });   
});

app.post('/upload', upload.single('file'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    res.send(file)
})

app.listen(PORT, () => console.log('Server started on port', PORT));
