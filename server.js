const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { GoogleSpreadsheet } = require('google-spreadsheet');

require('dotenv').config({ path: 'variables.env' });

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/chart', async function (req, res) {
  // spreadsheet key is the long id in the sheets URL
  const doc = new GoogleSpreadsheet('144OGDrwK4-v-a2uEcTaU5FK-ftkPj5SwSh9-MueAmvg');
  
  // use service account creds
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  });
  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);
  const sheet = doc.sheetsByIndex[0]
  const rows = await sheet.getRows(); // can pass in { limit, offset }

  // read/write row values
  console.log(rows)
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log(`Hello world app listening!`));