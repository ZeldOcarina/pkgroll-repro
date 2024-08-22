'use strict';

var express = require('@remix-run/express');
var compression = require('compression');
var express$1 = require('express');
var morgan = require('morgan');

async function main() {
  const viteDevServer = process.env.NODE_ENV === "production" ? void 0 : await Promise.resolve().then(function () { return require('./index-Bqh2AaI-.cjs'); }).then(function (n) { return n.index; }).then(
    (vite) => vite.createServer({
      server: { middlewareMode: true }
    })
  );
  const remixHandler = express.createRequestHandler({
    // @ts-expect-error - known bug with Remix
    build: viteDevServer ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build") : await Promise.resolve().then(function () { return require('./index-BbwZw_uX.cjs'); })
  });
  const app = express$1();
  app.use(compression());
  app.disable("x-powered-by");
  if (viteDevServer) {
    app.use(viteDevServer.middlewares);
  } else {
    app.use(
      "/assets",
      express$1.static("build/client/assets", { immutable: true, maxAge: "1y" })
    );
  }
  app.use(express$1.static("build/client", { maxAge: "1h" }));
  app.use(morgan("tiny"));
  app.all("*", remixHandler);
  const port = process.env.PORT || 3e3;
  app.listen(
    port,
    () => console.log(`Express server listening at http://localhost:${port}`)
  );
}
main();
