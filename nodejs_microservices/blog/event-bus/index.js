const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const eventStore = [];

app.post('/events', async (req, res) => {
    const event = req.body;
    console.log(event.type);
    eventStore.push(event);
    await axios.post('http://localhost:4000/events', event);
    await axios.post('http://localhost:4001/events', event);
    await axios.post('http://localhost:4002/events', event);
    await axios.post('http://localhost:4003/events', event);

    res.send({ status: 'OK'});
});

app.get('/events', (req, res) => {
    res.send(eventStore);
});

app.listen(4005, () => {
    console.log('Listening on 4005');
});