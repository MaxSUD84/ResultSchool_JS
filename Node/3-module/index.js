// const yargs = require("yargs");
// const pkg = require("./package.json");
// const { addNote, printNotes } = require("./notes.controller");

import yargs from "yargs";
import { addNote, printNotes } from "./notes.controller.js";

import pkg from "./package.json" assert { type: "json" };

// const yargs = _yargs();

// yargs.version(pkg.version);

yargs.command({
    command: "add",
    describe: "Add new note to list",
    builder: {
        title: {
            type: "string",
            describe: "Note title",
            demandOption: true,
        },
    },
    handler({ title }) {
        addNote(title);
    },
});

yargs.command({
    command: "list",
    describe: "Print all notes",
    async handler() {
        printNotes();
    },
});

yargs.parse();
