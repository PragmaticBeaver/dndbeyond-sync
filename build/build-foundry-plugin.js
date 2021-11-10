import { build } from "esbuild";
import fs from "fs";
import path from "path";

const rootPath = "./src/foundryvtt-plugin/";
const distDir = "./dist";
const foundryDir = distDir + "/foundry-plugin";
const outDir = foundryDir + "/dndbeyond-sync";
const outDirStyles = outDir + "/styles";
const outDirScripts = outDir + "/scripts";

// create dist directories
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}
if (!fs.existsSync(foundryDir)) {
  fs.mkdirSync(foundryDir);
}
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}
// create module structure for dist
if (!fs.existsSync(outDirStyles)) {
  fs.mkdirSync(outDirStyles);
}
if (!fs.existsSync(outDirScripts)) {
  fs.mkdirSync(outDirScripts);
}

// copy css
fs.copyFileSync(rootPath + "styles/main.css", outDir + "/styles/main.css");

// copy module.json
fs.copyFileSync(rootPath + "module.json", outDir + "/module.json");

// build
const entry = path.join(rootPath, "scripts", "main.js");
build({
  entryPoints: [entry],
  bundle: true,
  outdir: outDir + "/scripts",
}).catch(() => process.exit(1));
