const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(require('./routes/routes'));

var server = app.listen( 9000,  () => {
  console.log("Listening on port %s", server.address().port);

});

