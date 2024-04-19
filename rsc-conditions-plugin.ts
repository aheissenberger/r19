import { plugin, type BunPlugin } from "bun";
import { basename, join } from "path";
import { mkdtempSync, rmdirSync } from "fs";

const myPlugin: BunPlugin = {
  name: "rsc conditions bundler",
  async setup(build) {
    build.onLoad({ filter: /\.rsc.ts$/ }, async ({ path }) => {
      const tempDir = mkdtempSync('rsc');

      await Bun.build({
        target: "bun",
        conditions: 'react-server',
        entrypoints: [path],
        outdir: tempDir,
        sourcemap: 'inline',
      });

      const filename = join(tempDir, basename(path).replace(/\.ts$/, '.js'));
      console.log('rsc conditions bundler filename', filename);
      const contents = await Bun.file(filename).text();
      rmdirSync(tempDir, { recursive: true });

      return {
        contents,
        loader: "js",
      };
    });
  },
};

void plugin(myPlugin);