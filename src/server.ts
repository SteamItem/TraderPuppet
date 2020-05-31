import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');
const PORT = process.env.PORT || 3000;

// create express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

require('./routes/index')(app);

// listen for requests
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
