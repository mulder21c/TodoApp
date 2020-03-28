const jsonServer = require(`json-server`);
const path = require(`path`);
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, `db.json`));
const port = 8881;
const config = {
  noCors: false,
  noGzip: false,
  host: `localhost`,
  port
};
const middleware = jsonServer.defaults(config);

server.use(middleware);
server.use(jsonServer.bodyParser);

server.use(
  jsonServer.rewriter({
    "/todo": "/list?_sort=id&_order=desc",
    "/todo/:id": "/list/:id",
    "/todo/*": "/list/$1",
    "/todo?*": "/list?$1"
  })
);

server.use(router);
server.listen(port, () => {
  const { host } = config;
  console.log(`JSON Server is running at http://${host}:${port}`);
});
