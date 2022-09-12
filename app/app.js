const express = require('express');
const app = express(),
      bodyParser = require("body-parser"),
      fs = require('fs'),
      port = 9000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');      

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(require('./routes/routes'));



app.get('/', (req,res) => {
  res.send(`<h1>API Running on port ${port}</h1>`);
});

app.listen(port, () => {
    console.log(`Server listening on the port::::::${port}`);
});
