import serveStatic from "serve-static-bun";
import { resolve } from "path"
import { createElement, use } from "react"
import { renderToReadableStream } from "react-dom/server"
import { createFromNodeStream } from "react-server-dom-esm/client.node"
import { rscGET, rscPOST } from "./rsc-bun.rsc"
import Stream from 'node:stream';
import { log, createReference } from "./utils"
import { readdir } from "fs/promises"
import { watch } from "fs/promises";
import configureHotReload from "bun-hot-reload";



const moduleBaseURL = "/build/"
const port = 3000


log("Cleaning build artifacts")
log("Successful clean?".dim, (await Bun.$`rm -rf ./build/`).exitCode === 0)

log("reading files...")
const entries = (await readdir(resolve("src"), { recursive: true })).reduce(
  (acc, file) => {
    const ext = file.match(/\..+$/)
    if (!ext) return acc
    const path = resolve("src", file)
    if (file.endsWith("page.tsx")) acc["pages"].push(path)
    else if (ext[0].match(/\.tsx?$/)) acc["components"].push(path)
    else acc["assets"].push(path)
    return acc
  },
  { pages: [], components: [], assets: [] } as Record<string, string[]>
)
log("done: ", entries)

log("Building the pages")
const server_output = await Bun.build({
  target: "bun",
  entrypoints: entries["pages"],
  external: ["react", "react-dom"],
  //root: resolve("src"),
  outdir: resolve("build", "app"),
  plugins: [
    {
      name: "rsc-register",
      setup(build) {
        build.onLoad({ filter: /\.tsx?$/ }, async args => {
          const content = await Bun.file(args.path).text()

          const directives = content.match(/(?:^|\n|;)"use (client|server)";?/)
          if (!directives) return { contents: content } // If there are no directives, we let it be bundled

          const { exports } = new Bun.Transpiler({ loader: "tsx" }).scan(content)
          if (exports.length === 0) return { contents: content } // If there are no exports, we also let it be bundled

          return {
            contents: exports.map(e => createReference(e, args.path, directives[1])).join("\n")
          }
        })
      }
    }
  ]
})
log("Successful build?".dim, server_output.success)



log("Building the components")
const client_output = await Bun.build({
  target: "bun",
  external: ["react", "react-dom", "react-server-dom-esm"],
  entrypoints: entries["components"],
  root: resolve("src"),
  outdir: resolve("build")
})
log("Successful build?".dim)


log(`Listening on http://localhost:${port}`)

Bun.serve(configureHotReload({
  development: true,
  async fetch(req) {
    const url = new URL(req.url);
    log(`${req.method} ${url.pathname} `, `(${url.searchParams.get('__RSA') === "true" ? "RSC" : "SSR"})`.dim)

    if (req.method === "POST" && url.searchParams.get('__RSA') === "true") {
      const rscStream = await rscPOST(req)
      const readable = new Stream.PassThrough();
      rscStream.pipe(readable);
      return new Response(nodeToWebStream(readable))
    }
    if (url.pathname.startsWith("/build") || url.pathname.startsWith("/node_modules")) return serveStatic("")(req)
    //    {
    //   const searchpath = url.pathname.replace("/build/", "./")
    //   log("searchpath", searchpath)
    //   if (bundle_registry?.[searchpath] === undefined) {
    //     return serveStatic("")(req)
    //   } else {
    //     log("serving bundle", searchpath)
    //     return new Response(bundle_registry[searchpath]?.stream(), {
    //       headers: {
    //         "Content-Type": "text/javascript"
    //       }
    //     })
    //   }
    // }
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
    const body = await renderToReadableStream(createElement(Layout, { children: createElement(Root) }), {
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
    })
    return new Response(await Bun.readableStreamToText(body), {
      headers: {
        "Content-Type": "text/html"
      }
    })
    // returning stream is broken on first call of homepage with suspense boundry
    return new Response(body)
  },
  port
},
{
  buildConfig: {
    target: "bun",
    entrypoints: entries["pages"],
    external: ["react", "react-dom"],
    //root: resolve("src"),
    outdir: resolve("build", "app"),
    plugins: [
      {
        name: "rsc-register",
        setup(build) {
          build.onLoad({ filter: /\.tsx?$/ }, async args => {
            const content = await Bun.file(args.path).text()
  
            const directives = content.match(/(?:^|\n|;)"use (client|server)";?/)
            if (!directives) return { contents: content } // If there are no directives, we let it be bundled
  
            const { exports } = new Bun.Transpiler({ loader: "tsx" }).scan(content)
            if (exports.length === 0) return { contents: content } // If there are no exports, we also let it be bundled
  
            return {
              contents: exports.map(e => createReference(e, args.path, directives[1])).join("\n")
            }
          })
        }
      }
    ]
  },
}
));

// const watcher = watch(resolve("src"), { recursive: true });
// for await (const event of watcher) {
//   console.log(`Detected ${event.eventType} in ${event.filename}`);
//   const path = resolve("src", event.filename)
//   const assetType = entries['components'].includes(path) ? "components" : entries['pages'].includes(path) ? "pages" : "assets"
//   if (assetType === "assets") continue
//   log("rebuilding ", assetType, path)
//   const output = await Bun.build(assetType === "pages" ? {
//     target: "bun",
//     entrypoints: [path],
//     external: ["react", "react-dom"],
//     //root: resolve("src"),
//     outdir: resolve("build", "app"),
//     plugins: [
//       {
//         name: "rsc-register",
//         setup(build) {
//           build.onLoad({ filter: /\.tsx?$/ }, async args => {
//             const content = await Bun.file(args.path).text()

//             const directives = content.match(/(?:^|\n|;)"use (client|server)";?/)
//             if (!directives) return { contents: content } // If there are no directives, we let it be bundled

//             const { exports } = new Bun.Transpiler({ loader: "tsx" }).scan(content)
//             if (exports.length === 0) return { contents: content } // If there are no exports, we also let it be bundled

//             return {
//               contents: exports.map(e => createReference(e, args.path, directives[1])).join("\n")
//             }
//           })
//         }
//       }
//     ]
//   } : {
//     target: "bun",
//     external: ["react", "react-dom", "react-server-dom-esm"],
//     entrypoints: [path],
//     root: resolve("src"),
//     outdir: resolve("build")
//   })
// }

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

async function streamToString(stream) {
  const reader = stream.getReader();
  let result = '';

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      break;
    }

    result += new TextDecoder('utf-8').decode(value);
  }

  return result;
}