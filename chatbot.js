const express = require("express");
const bodyParser =require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
const readline = require('readline');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
  apiKey: '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',
});



app.post('/openai', async (req, res) => {
  const { inputvalue } = req.body;
  try {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: inputvalue }],
    });
    res.json({ response: response.data.choices[0].message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


app.listen(3009, ()=> {console.log("server is up") })
