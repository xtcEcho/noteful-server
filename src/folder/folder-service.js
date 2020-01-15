const FolderService = {
    getAllFolders(knex) {
        return knex.select('*').from('noteful_folders')
    },
    insertFolder(knex, newFolder){
        return knex
            .insert(newFolder)
            .into('noteful_folders')
            .returning('*')
            .then(rows => {
                return row [0]
            })
    },
    getById(knex, id){
        return knex
            .select('*')
            .from('noteful_folders')
            .where('id', id)
            .first()
    },
    deleteFolder(knex, id){
        return knex('noteful_folders')
            .where({id})
            .delete()
    },

}

module.exports = FolderService