import _yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { addNote, printNotes, removeNote } from "./notes.controller.js";
import pkg from "./package.json" assert { type: "json" };

const yargs = _yargs(hideBin(process.argv));

yargs.version(pkg.version);

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

yargs.command({
    command: "remove",
    describe: "Remove note by index",
    builder: {
        id: {
            type: "number",
            describe: "Note ID",
            demandOption: true,
        },
    },
    async handler({ id }) {
        removeNote(id);
    },
});

yargs.parse();
