const util = require("util");
const fs = require("fs");
// This package will be used to generate our unique ids. https://www.npmjs.com/package/uuid
const uuidv1 = require("uuid/v1");
const { errorMonitor } = require("stream");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
class Store {
    read() {
        return readFileAsync("db/db.json", "utf8");
    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }
    getNotes() {
        // read notes in database
        this.read().then((notes) => {
            let parseNotes;
            try {
                parseNotes = [].concat(JSON.parse(notes))
            }
            catch (error) {
                parseNotes = []
            }
            return parseNotes;
        })
    }
    // add note were given to array
    addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error("Enter proper text")
        }
        // add new note from user to notes we send back to database
        const newNote = { title, text, id: uuidv1() };
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            // write completed array in db.json
            .then((updatedNotes) => {
                this.write(updatedNotes)
            })
            // returning the new note
            .then(() => newNote)
    }
    // Remove note
    removeNote(removeId) {
        return this.getNotes().then((notes) => notes.filter((note) => note.id !== removeId))
            .then((filteredNotes) => this.write(filteredNotes))
    }


}
module.exports = new Store();
