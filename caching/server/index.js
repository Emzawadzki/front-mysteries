const http = require("http");
const fs = require("fs");
const path = require("path");

const serverName = "Caching"
const hostname = "localhost";
const port = 3001;

const error404 = (res) => {
  res.writeHead(404);
  res.end();
};

const server = http.createServer((req, res) => {
  let url = req.url;
  switch (req.method) {
    case "GET":
      switch (req.url) {
        case "/":
          url = "index.html";
        default: {
          const filePath = path.resolve(`caching/client/${url}`);
          if (!fs.existsSync(filePath)) return error404(res);
          fs.readFile(filePath, (err, data) => {
            if (err) return error404(res);
            res.writeHead(200, {
              "Content-Type": "text/html",
            });
            res.write(data);
            res.end();
          });
        }
      }
  }
});

server.listen(port, hostname, () => {
  console.log(`[${serverName}] Server running at http://${hostname}:${port}/`);
});
