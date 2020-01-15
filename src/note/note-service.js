const NoteService = {
    getAllNotes(knex){
        return knex.select('*').from('noteful_notes')
    },
    insertNote(knex, newNotes){
        return knex
            .insert(newNotes)
            .into('noteful_notes')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getNoteById(knex, id){
        return knex
            .select('*')
            .from('noteful_notes')
            .where('id', id)
            .first()
    },
    deleteNote(knex, id){
        return knex('noteful_notes')
            .where({id})
            .delete()
    },
    updateNote(knex, id, newNotesField){
        return knex('noteful_notes')
            .where({id})
            .update(newNotesField)
    }
}

module.exports = NoteService