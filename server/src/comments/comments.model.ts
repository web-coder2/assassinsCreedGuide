import { Schema, model } from 'mongoose'
import dayjs from 'dayjs'

const CommentSchema = new Schema({

    username: {
        type: String,
        default: 'quest'
    },

    datedAt: {
        type: String,
        default: () => dayjs(new Date()).format('YYYY-MM-DD')
    },

    questId: {
        type: Schema.Types.ObjectId,
        ref: 'Quests'
    },

    comment: {
        type: String,
        required: true
    },

    countLikes: {
        type: Number
    }

})


export default model('Comments', CommentSchema)