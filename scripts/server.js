const { TextHandler } = require('./text-handler');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 8080);
// GET
app.get('/', (req, res) => res.send('Zendesk Coding Challenge!'));
// POST
app.post('/decode/text', (req, res) => {
  res.charset = 'utf-8';
  try {
    let body = req.body;
    if (!('key' in body)) {
      throw new Error('Key is required.');
    }
    if (!('text' in body)) {
      throw new Error('Text is required.');
    }
    let textHandler = new TextHandler();
    let decodedMessage = textHandler.decode(body.key, body.text);
    res.status(200).json({
      code: 200,
      details: {
        decoded_message: decodedMessage
      }
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error.message
    });
  }
});

app.listen(app.get('port'), () =>
  console.log(`Server running on port ${app.get('port')}!`)
);
