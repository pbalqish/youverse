const router = require('./routes/index');
const express = require('express');
const session = require('express-session');
const multer = require('multer');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))
app.use(session({
  secret: 'Ada deeeh',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}))


const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' 
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('public'))

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})