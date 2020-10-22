const router = require("express").Router();
const store = require("../db/store");

// GET "/api/notes"-- all notes from the database
router.get("/notes", (req, res) => {
    store
    .getNotes()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});

router.post("/notes", (req, res) => {
    store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

// DELETE "/api/notes" deletes the note 
router.delete("/notes/:id", (req, res) => {
    store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;