import { build } from "esbuild";
import fs from "fs";

// construct valid filepaths
const rootPath = "./chrome-extension/";
let every = fs.readdirSync(rootPath).filter((src) => src.endsWith(".js"));
every = every.map((dir) => {
  return rootPath + dir;
});

// build all
const outDir = "./dist/extension";
build({
  entryPoints: every,
  bundle: false,
  outdir: outDir,
}).catch(() => process.exit(1));

// copy manifest
fs.copyFileSync(rootPath + "manifest.json", outDir + "/manifest.json");
