import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";

loadEnv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// The platform sets PORT (you already export 8080 in boltic.yaml)
const PORT = Number(process.env.PORT || 3000);
const HOST = "0.0.0.0";

// If your feedback.html is at the repo root, keep staticRoot = __dirname.
// If it's inside /public, change to: path.join(__dirname, "public")
const staticRoot = __dirname;

app.use(express.static(staticRoot));

app.get("/_healthz", (_req, res) => res.status(200).send("ok"));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "feedback.html"));
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});