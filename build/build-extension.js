import { build } from "esbuild";
import fs from "fs";
import path from "path";

const rootPath = "./chrome-extension/";
const distDir = "./dist";
const outDir = distDir + "/extension";

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
const backgroundFiles = [path.join(rootPath, "background.js")];
build({
  entryPoints: backgroundFiles,
  bundle: true,
  outdir: outDir,
}).catch(() => process.exit(1));

// build dndbeyond content
const beyondContentFiles = [
  path.join(rootPath, "dndbeyond", "dndbeyond-content.js"),
];
build({
  entryPoints: beyondContentFiles,
  bundle: true,
  outdir: outDir,
}).catch(() => process.exit(1));

// build dndbeyond injection
const beyondInjectionFiles = [
  path.join(rootPath, "dndbeyond", "dndbeyond-injection.js"),
];
build({
  entryPoints: beyondInjectionFiles,
  bundle: true,
  outdir: outDir,
}).catch(() => process.exit(1));

// build foundry content
const foundryContentFiles = [
  path.join(rootPath, "foundry", "foundry-content.js"),
];
build({
  entryPoints: foundryContentFiles,
  bundle: true,
  outdir: outDir,
}).catch(() => process.exit(1));

// build foundry injection
const foundryInjectionFiles = [
  path.join(rootPath, "foundry", "foundry-injection.js"),
];
build({
  entryPoints: foundryInjectionFiles,
  bundle: true,
  outdir: outDir,
}).catch(() => process.exit(1));
