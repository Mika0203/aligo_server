const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./config');
const fs = require('fs');
const aligoapi = require('aligoapi');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

const AuthData = {
    key: config.aligoAPI,
    user_id: config.aligoUserId,
}

const options = {
    key : fs.readFileSync('./keys/private.pem'),
    cert : fs.readFileSync('./keys/public.pem'),
    ca : fs.readFileSync('./keys/chain.pem'),
    rejectUnauthorized: false,
}

app.get('/', (req, res) => {
    res.send("hello aligo server!");
});

app.post('/', async (req, res) => {
    const reso = await send(req);
    res.send(reso);
})

const send = async (req) => {
    const res = await aligoapi.send(req, AuthData);
    return res;
}

const server = require('http').createServer(options, app);
server.listen(config.port, async (z) => {
    console.log(`App listening at ${config.serverURL}:${config.port}`);
});

