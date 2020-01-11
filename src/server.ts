import * as express from 'express';
import * as cors from 'cors';
import { createServer } from 'http';
import { Server } from 'net';
const bodyParser = require('body-parser');
const PORT = process.env.MAIN_PORT || 8080;

const app = express();
app.set("port", PORT);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(app.use(bodyParser.json()));




const server = createServer(app);

export function startServer(): Server {
    return server.listen(PORT, () => {
        console.log('server listen to port', PORT);
    });
}