const NotefulService = {
    getAllNotes(knex) {
        return knex.select('*').from('notes')
    },
    getAllFolders(knex) {
        return knex.select('*').from('folders')

    },
    insertNote(knex, newNote) {
        return knex
            .insert(newNote)
            .into('notes')
            .returning('*')
            .then(row => {
                return row[0]
            })
    },
    insertFolder(knex, newFolder) {
        return knex
            .insert(newFolder)
            .into('folders')
            .returning('*')
            .then(row => {
                return row[0]
            })
    },
    getNoteById(knex, note_id) {
        return knex
            .from('notes')
            .select('*')
            .where('id', note_id)
            .first()
    },
    getFolderById(knex, folder_id) {
        return knex
            .from('folders')
            .select('*')
            .where('id', folder_id)
            .first()
    },
    deleteNote(knex, note_id) {
        return knex('notes')
            .where({ note_id })
            .delete()
    },
    deleteFolder(knex, folder_id) {
        console.log(folder_id)
        return knex('folders')
            .where({ id: folder_id })
            .delete()
    },
    updateNote(knex, note_id, newNoteFields) {
        return knex('notes')
            .where({ note_id })
            .update(newNoteFields)
    },
    updateFolder(knex, folder_id, newFolderFields) {
        return knex('folders')
            .where({ folder_id })
            .update(newFolderFields)
    }
}

module.exports = NotefulService