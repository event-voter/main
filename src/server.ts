import * as express from 'express';
import * as cors from 'cors';
import { createServer } from 'http';
import { Server } from 'net';
import * as main1 from './main1';

const main = require('./main');
const bodyParser = require('body-parser');
const PORT = process.env.MAIN_PORT || 8080;

const app = express();
app.set("port", PORT);
app.use(cors());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// post new event
app.post('/event/new', main.createNewEvent);
app.post('/event/vote/new', main1.createNewVote);
app.get('/event/:id', main.getEvent);
app.post('/tes', (req, res) => res.send({body: req.body}));
app.all("*", (req, res) => res.status(404).send({msg: 'not found'}));

const server = createServer(app);

export function startServer(): Server {
    return server.listen(PORT, () => {
        console.log('server listen to port', PORT);
    });
}