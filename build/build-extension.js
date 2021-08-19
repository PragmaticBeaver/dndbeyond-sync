import { build } from "esbuild";
import fs from "fs";

const rootPath = "./chrome-extension/";
let every = fs.readdirSync(rootPath).filter((src) => src.endsWith(".js"));
every = every.map((dir) => {
  return rootPath + dir;
});

build({
  entryPoints: every,
  bundle: false,
  outdir: "./dist/extension",
}).catch(() => process.exit(1));
