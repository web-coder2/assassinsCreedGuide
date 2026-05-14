import { Schema, model } from "mongoose"
import dayjs from "dayjs"

const QuestsSchema = new Schema({

    // название мисии
    title: {
        type: String,
        required: true
    },

    // описание мисии
    description: {
        type: String,
        required: true
    },

    // город мисии
    questArea: {
        type: String,
        required: true
    },

    // дополнительные мисии
    additionalQuests: {
        type: [{
            title: String,
            description: String,
            prize: String
        }]
    },

    // враги
    enimies: String

})

export default model('Quests', QuestsSchema)