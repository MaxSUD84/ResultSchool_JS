import chalk from "chalk";
import fs from "fs/promises";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/*************************************************/

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
    const notes = await getNotes();
    const note = {
        title,
        id: Date.now().toString(),
    };
    notes.push(note);

    await fs.writeFile(notesPath, JSON.stringify(notes));
    // console.log(chalk.green("Note was added!"));
}

async function getNotes() {
    // const buffer = await fs.readFile(notesPath);
    // const notes = Buffer.from(buffer).toString('utf-8'); // или
    const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function removeNote(id) {
    const notes = await getNotes();
    const _notes = notes.filter((n) => n.id !== `${id}`);
    // console.log(_notes);
    await fs.writeFile(notesPath, JSON.stringify(_notes));
    console.log(chalk.greenBright(`Note ID: ${id} was removed!`));
}

async function editNote(id, note) {
    const notes = await getNotes();
    const _notes = notes.map((n) => (n.id !== `${id}` ? n : note));
    // console.log(_notes);
    await fs.writeFile(notesPath, JSON.stringify(_notes));
    console.log(chalk.yellowBright(`Note ID: ${id} was edited!`));
}

async function printNotes() {
    const notes = await getNotes();

    console.log(chalk.bgBlue("List notes:"));
    notes.forEach((note) => {
        console.log(chalk.cyanBright(note.id), chalk.green(note.title));
    });
}

export { getNotes, printNotes, addNote, removeNote, editNote };
