import express from 'express';
import { getWeather } from './services/api.service.js';
const port = 4000;

const app = express();


app.get('/weather', async (req, res) => {
  try {
    const response = await getWeather(req.query.city ?? 'moscow');
    res.json(response)
  } catch (error) {
    res.status(401).send(error.message)
  }
})

app.use((err, req, res, next) => {
  res.status(500).send(err.message)
})


app.listen(port, () => {
  console.log('SERVER STARTED');
})