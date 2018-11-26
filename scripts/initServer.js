require('./initEnv');
const childProcess = require("child_process");
const path = require('path');
childProcess.fork('node_modules/@salzoff/contentexpress/dist/index');