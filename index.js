import { serverListen } from './src/server.js';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers'
import mongoose from "mongoose";
import config from './src/config.js';
import cluster from "cluster";
import os from 'os';

await mongoose.connect(config.mongodb.connectionString, config.mongodb.options)

const argv = yargs(hideBin(process.argv)).argv;

const yargsPort = argv.port
const mode = argv.mode
const PORT = yargsPort || 8080

if (mode === 'cluster') {
    const cpus = os.cpus().length;
    if (cluster.isPrimary) {
        console.log(`Servidor primario ${process.pid} online`)

        for (let i = 0; i < cpus; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
        });
    } else {
        serverListen(PORT);
    }
} else {
    serverListen(PORT);
}