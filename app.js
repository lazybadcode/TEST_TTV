const express = require('express');
const app = express();
const port = process.env.PORT


app.use(express.json());
app.use(require('./routes/routes'));

var server = app.listen( 9000,  () => {
  console.log("Listening on port %s", server.address().port);

});

