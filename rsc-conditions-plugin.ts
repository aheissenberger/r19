import { plugin, type BunPlugin } from "bun";

const myPlugin: BunPlugin = {
  name: "rsc conditions bundler",
  async setup(build) {
    build.onLoad({ filter: /\.rsc.ts$/ }, async ({ path }) => {
      const output=await Bun.build({
        target: "bun",
        conditions: 'react-server',
        entrypoints: [path],
      });
      return {
        contents:await output.outputs[0].text(),
        loader: "js",
      };
    });
  },
};

void plugin(myPlugin);