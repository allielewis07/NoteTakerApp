const store = require("../db/store");
const router = require("express").Router();

// send response with data
router.post("/notes", function (req, res) {
    store
        .addNote(req.body)
    res.json(notes);
    if (err) throw err;
});

// take new note and add it to db.json using fs module
router.get("/notes", function (req, res) {
    console.log(store.getNotes)
    store.getNotes()
        .then((notes) => {
            res.json(notes);
        })
})
// DELETE "/api/notes" deletes the note with an id equal to req.params.id
router.delete("/notes/:id", (req, res) => {
    store
        .removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;
