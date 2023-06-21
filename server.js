const http = require("https");
const app = require("./app");
const port = process.env.PORT || 3002;
const server = http = http.createServer(app);

server.listen(port);