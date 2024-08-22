'use strict';

var jsxRuntime = require('react/jsx-runtime');
var Stream$1 = require('node:stream');
var node = require('@remix-run/node');
var react = require('@remix-run/react');
var isbot = require('isbot');
var server = require('react-dom/server');

const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot.isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = server.renderToPipeableStream(
      /* @__PURE__ */ jsxRuntime.jsx(
        react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new Stream$1.PassThrough();
          const stream = node.createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = server.renderToPipeableStream(
      /* @__PURE__ */ jsxRuntime.jsx(
        react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new Stream$1.PassThrough();
          const stream = node.createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function Layout({ children }) {
  return /* @__PURE__ */ jsxRuntime.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntime.jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsxRuntime.jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsxRuntime.jsx(react.Meta, {}),
      /* @__PURE__ */ jsxRuntime.jsx(react.Links, {})
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntime.jsx(react.ScrollRestoration, {}),
      /* @__PURE__ */ jsxRuntime.jsx(react.Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsxRuntime.jsx(react.Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" }
  ];
};
function Index() {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "font-sans p-4", children: [
    /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "text-3xl", children: "Welcome to Remix" }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "list-disc mt-4 pl-6 space-y-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(
        "a",
        {
          className: "text-blue-700 underline visited:text-purple-900",
          target: "_blank",
          href: "https://remix.run/start/quickstart",
          rel: "noreferrer",
          children: "5m Quick Start"
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(
        "a",
        {
          className: "text-blue-700 underline visited:text-purple-900",
          target: "_blank",
          href: "https://remix.run/start/tutorial",
          rel: "noreferrer",
          children: "30m Tutorial"
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(
        "a",
        {
          className: "text-blue-700 underline visited:text-purple-900",
          target: "_blank",
          href: "https://remix.run/docs",
          rel: "noreferrer",
          children: "Remix Docs"
        }
      ) })
    ] })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-r1Xct39H.js", "imports": ["/assets/jsx-runtime-B00hTWZQ.js", "/assets/components-BQiOoOQc.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-B0whbAln.js", "imports": ["/assets/jsx-runtime-B00hTWZQ.js", "/assets/components-BQiOoOQc.js"], "css": ["/assets/root-BFUH26ow.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-CMiuWlAm.js", "imports": ["/assets/jsx-runtime-B00hTWZQ.js"], "css": [] } }, "url": "/assets/manifest-5d349370.js", "version": "5d349370" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "unstable_singleFetch": false, "unstable_lazyRouteDiscovery": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};

exports.assets = serverManifest;
exports.assetsBuildDirectory = assetsBuildDirectory;
exports.basename = basename;
exports.entry = entry;
exports.future = future;
exports.isSpaMode = isSpaMode;
exports.mode = mode;
exports.publicPath = publicPath;
exports.routes = routes;
