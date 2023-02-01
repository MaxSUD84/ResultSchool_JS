import express from "express";
import chalk from "chalk";
import { addNote, getNotes, removeNote, editNote } from "./notes.controller.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/*************************************************/
// const basePath = path.join(__dirname, "pages");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/pages"));

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
    });
    // res.sendFile(path.join(basePath, "index.html"));
});

app.post("/", async (req, res) => {
    await addNote(req.body.title);
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: true,
    });
    // res.sendFile(path.join(basePath, "index.html"));
});

app.delete("/:id", async (req, res) => {
    await removeNote(req.params.id);
    console.log(req.params.id);
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
    });
});

app.put("/:id", async (req, res) => {
    // console.log(req.params.id, req.body.title);

    await editNote(req.params.id, req.body);

    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
    });
});

app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port} ...`));
});
