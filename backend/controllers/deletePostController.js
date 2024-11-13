import { Op, where, json } from 'sequelize'

async function deletePost(id, model) {
    try {
        model.destroy({
            where: {
                id
            }
        }).then(() => {
            console.log('[controller] Model:', model, '  was deleted succesfully.')
        })
    } catch (error) {
        console.log('[controller] ERROR, Failed to delete the model:', model, '  Error was:', error)
    }
}

export { deletePost }