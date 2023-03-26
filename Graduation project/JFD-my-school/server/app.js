import express from "express";
import chalk from "chalk";
import cors from "cors";
import mongoose from "mongoose";
import config from "config";
import path from "path";

import initDatabase from "./startUp/initDatabase.js";
import routes from "./routes/index.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/************************************************************/

const PORT = config.get("port") ?? 8080;
const app = express();

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client")));

    const indexPath = path.join(__dirname, "client", "index.html");
    app.get("/", (req, res) => {
        res.sendFile(indexPath);
    });
}

app.use(express.static(path.resolve(__dirname, "stitic")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/api", routes);

mongoose.set("strictQuery", true);

async function start() {
    try {
        // При первом старте запускаем function
        mongoose.connection.once("open", async () => {
            await initDatabase();
        });
        await mongoose.connect(config.get("mongoUri"));

        console.log(chalk.bgGreenBright("My-school-DB connected"));
        app.listen(PORT, () => console.log(chalk.green(`Server has been started on port ${PORT}...`)));
    } catch (error) {
        console.log(chalk.red(error.message));
        process.exit(1);
    }
}

start();
