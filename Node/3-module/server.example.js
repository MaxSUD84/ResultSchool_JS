import http from "http";
import fs from "fs/promises";

import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { addNote } from "./notes.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/*************************************************/

const port = 3000;

const basePath = path.join(__dirname, "pages");

const server = http.createServer(async (req, res) => {
    // console.log("Sever");
    if (req.method === "GET") {
        const content = await fs.readFile(path.join(basePath, "index.html"));
        res.writeHead(200, {
            "Content-Type": "text/html",
        });

        res.end(content);
    } else if (req.method === "POST") {
        const body = [];

        res.writeHead(200, {
            "Content-Type": "text/plaint; chartset=utf-8",
        });

        req.on("data", (data) => {
            body.push(Buffer.from(data));
        });

        req.on("end", () => {
            const title = body.toString().split("=")[1].replaceAll("+", " ");
            addNote(title);

            res.end(`Title = ${title}`);
        });
    }
});

server.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port} ...`));
});
