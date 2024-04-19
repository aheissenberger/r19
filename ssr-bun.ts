import serveStatic from "serve-static-bun";
import { resolve } from "path"
import { createElement, use } from "react"
import { renderToReadableStream } from "react-dom/server"
import { createFromNodeStream } from "react-server-dom-esm/client.node"
import { rscGET, rscPOST } from "./rsc-bun.rsc"
import Stream from 'node:stream';
import { log } from "./utils"

const moduleBaseURL = "/build/"
const port = 3000

log(`Listening on http://localhost:${port}`)

Bun.serve({
  development: true,
  async fetch(req) {
    const url = new URL(req.url);
    log(`${req.method} ${url.pathname} `,`(${url.searchParams.get('__RSA') === "true"? "RSC": "SSR"})`.dim)

    if (req.method === "POST" && url.searchParams.get('__RSA') === "true") {
      const rscStream = await rscPOST(req)
      const readable = new Stream.PassThrough();
      rscStream.pipe(readable);
      return new Response(nodeToWebStream(readable))
    }
    if (url.pathname.startsWith("/build") || url.pathname.startsWith("/node_modules")) return serveStatic("")(req);
    if (url.pathname.match(/\.(?!js).+$/)) return serveStatic("")(req);
    if (url.searchParams.length === 0) {
      const page = (url.pathname === "/" ? "index" : url.pathname.slice(1)) + ".html"
      log("Defaulting to static page:", `"${page}"`)
      try {
        return new Response(await Bun.file(resolve("build/static/", "./" + page)).text(), {
          headers: {
            "Content-Type": "text/html"
          }

        })
      } catch {
        log("File not found, falling back to SSR")
      }
    }



    if (url.searchParams.get('__RSA') === "true") {
      const rscStream = await rscGET(req)
      const readable = new Stream.PassThrough();
      rscStream.pipe(readable);
      return new Response(nodeToWebStream(readable))
    }

    log("SSR", url.toString())
    const rscStream = await rscGET(req)
    const readable = new Stream.PassThrough();
    const response = createFromNodeStream(readable, resolve("build/") + "/", moduleBaseURL)
    rscStream.pipe(readable);

    const Root = () => use(response) // Create a root component from the RSC result

    const Layout = (await import(resolve("build/_layout"))).default // Load a HTML shell layout
    return new Response(await renderToReadableStream(createElement(Layout, { children: createElement(Root) }), {
      bootstrapModules: ["/build/_client.js"],
      //@ts-ignore
      importMap: {
        imports: {
          "react/jsx-dev-runtime": "https://esm.sh/react@canary/jsx-dev-runtime.js",
          react: "https://esm.sh/react@canary",
          "react-dom": "https://esm.sh/react-dom@canary",
          "react-dom/": "https://esm.sh/react-dom@canary/",
          "react-server-dom-esm/client":
            "/node_modules/react-server-dom-esm/esm/react-server-dom-esm-client.browser.development.js"
        }
      } as any // Ignore TypeScript error
    }))

  },
  port
});

function nodeToWebStream(nodeStream: { pipe: Function, on: Function }): ReadableStream {
  return new ReadableStream({
    start(controller) {
      nodeStream.on('data', (chunk: any) => {
        controller.enqueue(chunk);
      });
      nodeStream.on('end', () => {
        controller.close();
      });
      nodeStream.on('error', (err: any) => {
        controller.error(err);
      });
    },
  });
}