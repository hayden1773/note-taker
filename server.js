const express = require('express');
const path = require('path');
// const api = require('./public/assets/js/index.js');
const PORT = process.env.port || 3001;
const app = express();
const fs = require ('fs');





// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

// GET Route for homepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes',  (req, res) => {
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
     res.json(JSON.parse(data)); 
    }
  });
}
)

app.post('/api/notes', (req,res)=> {
  fs.readFile('./db/db.json', 'utf8', (err,data) =>{
    if (err) {
      console.log(err)
    } else {
      let newNote = req.body
      let offNotes = JSON.parse(data)
      console.log(newNote);
      console.log(offNotes);
      offNotes.push(newNote)
      fs.writeFile('./db/db.json', JSON.stringify(offNotes),(err,data)=> {
        if (err) {
          console.error(err);
        } else {
         res.json(newNote); 
        }
      });
    }
  })
})


app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
