import { resolve } from "path"
import { decodeReply, decodeReplyFromBusboy, renderToPipeableStream } from "react-server-dom-esm/server.node"
import busboy from "busboy"
import Stream from 'node:stream';

const moduleBaseURL = "/build/"

export async function rscGET(req) {
  const url = new URL(req.url)
  const path = url.pathname === "/" ? "" : url.pathname;

  const props = Object.fromEntries(url.searchParams.entries()) // We will use the query as props for the page
  let mod
  try {
    mod = (await import(resolve("build/app", `.${path}/page.js`))).default(props)
  } catch {
    mod = "Not Found"
  }
  return renderToPipeableStream(mod, moduleBaseURL)
}

export async function rscPOST(req) {
  const actionReference = String(req.headers.get("rsa-reference"))
  const actionOrigin = String(req.headers.get("rsa-origin"))
  const url = new URL(req.url)
  // Resolve the action
  const [filepath, name] = actionReference.split("#")
  const action = (await import(`.${resolve(filepath)}`))[name]

  let args // Decode the arguments
  if (req.headers.get('content-type').startsWith("multipart/form-data")) {
    const rs = webToNodeStream( req.body)
    //const rs=Stream.Readable.fromWeb(req.body) // not working!!
    // Use busboy to streamingly parse the reply from form-data.
    const bb = busboy({ headers: Object.fromEntries(req.headers.entries()) })
    const reply = decodeReplyFromBusboy(bb, resolve("build/") + "/")
    rs.pipe(bb)
    args = await reply
  } else {
    args = await decodeReply(await req.text(), moduleBaseURL)
  }

  const returnValue = await action.apply(null, args) // Call the action

  const props = Object.fromEntries(url.searchParams.entries()) // We will use the query as props for the page
  const root = (await import(resolve("build/app", `.${actionOrigin}/page.js`))).default(props)
  return renderToPipeableStream({ returnValue, root }, moduleBaseURL) // Render the app with the RSC, action result and the new root
}

function webToNodeStream(webStream: ReadableStream): Stream.Readable {
  const reader = webStream.getReader();
  return new Stream.Readable({
      async read() {
          const { done, value } = await reader.read();
          if (done) {
              this.push(null);
          } else {
              this.push(value);
          }
      }
  });
}
