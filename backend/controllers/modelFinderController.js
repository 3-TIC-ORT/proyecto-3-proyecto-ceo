import chalk from 'chalk';
import { Op, where, json } from 'sequelize'
import { Intercambio } from '../model/intercambio.js';

async function findModel(id, model) {
    try {
        const retrievedInstance = await model.findOne({
            where: {
                id
            }
        });

        if (retrievedInstance) {
            console.log('[controller] Model:', model.name, 'RETRIEVED.');
            return retrievedInstance;
        } else {
            console.log('[controller] Instance not found for model:', model.name);
            return null;
        }
    } catch (error) {
        console.log('[controller] ERROR, Failed to RETRIEVE the model:', model.name, 'Error was:', error);
        throw error;
    }
}

export { findModel }


