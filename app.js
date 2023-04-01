const express = require('express');
const bodyParser = require('body-parser');
const donatorsRouter = require('./routes/api');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Use the donatorsRouter for all requests starting with '/donators'
app.use('/api', donatorsRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
