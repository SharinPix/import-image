const path = require('path')
const PORT = process.env.PORT || 3000

let sharinpix = require('sharinpix')

const express = require("express"),
  app = express(),
  upload = require("express-fileupload"),
  csvtojson = require("csvtojson");

  fs = require('fs');
  
app.use(upload())
app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/fileupload', function (req, res, next) {
    csvData = req.files['filetoupload'].data.toString('utf8');
    return csvtojson().fromString(csvData).then(json => {
      json.forEach((item)=>{
        sharinpix.import(item.url, item.album_id, {uuid: item.uuid}).then( function(imp){
          console.log(imp.id)
        })
      })
      res.send('processed')
      })
    })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))