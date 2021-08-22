import { build } from "esbuild";
import fs from "fs";

const rootPath = "./chrome-extension/";
const distDir = "./dist";
const outDir = distDir + "/extension";

function getFiles(dir) {
  return fs.readdirSync(dir).filter((src) => src.endsWith(".js"));
}

function appendRootDir(files) {
  return files.map((file) => {
    return rootPath + file;
  });
}

// create dist directories
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

// copy manifest
fs.copyFileSync(rootPath + "manifest.json", outDir + "/manifest.json");

// build background
let backgroundFiles = ["background.js"]; // todo use getFiles in future
backgroundFiles = appendRootDir(backgroundFiles);
build({
  entryPoints: backgroundFiles,
  bundle: true,
  outdir: outDir,
}).catch(() => process.exit(1));

// build dndbeyond content
let beyondContentFiles = ["dndbeyond-content.js"]; // todo use getFiles in future
beyondContentFiles = appendRootDir(beyondContentFiles);
build({
  entryPoints: beyondContentFiles,
  bundle: true,
  outdir: outDir,
}).catch(() => process.exit(1));

// build dndbeyond injection
let beyondInjectionFiles = ["dndbeyond-injection.js"]; // todo use getFiles in future
beyondInjectionFiles = appendRootDir(beyondInjectionFiles);
build({
  entryPoints: beyondInjectionFiles,
  bundle: true,
  outdir: outDir,
}).catch(() => process.exit(1));

// build foundry content
let foundryContentFiles = ["foundry-content.js"]; // todo use getFiles in future
foundryContentFiles = appendRootDir(foundryContentFiles);
build({
  entryPoints: foundryContentFiles,
  bundle: true,
  outdir: outDir,
}).catch(() => process.exit(1));

// build foundry injection
let foundryInjectionFiles = ["foundry-injection.js"]; // todo use getFiles in future
foundryInjectionFiles = appendRootDir(foundryInjectionFiles);
build({
  entryPoints: foundryInjectionFiles,
  bundle: true,
  outdir: outDir,
}).catch(() => process.exit(1));
