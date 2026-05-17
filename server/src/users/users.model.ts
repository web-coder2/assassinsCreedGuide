import { Schema, model } from 'mongoose'
import dayjs from 'dayjs'

const UsersSchema = new Schema({

    userName: {
        type: String,
        required: true,
        unique: true
    },

    login: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    createdAt: {
        type: String,
        default: () => dayjs(new Date()).format('YYYY-MM-DD')
    },

    userRank: {
        type: String,
        enum: ['user', 'admin', 'dev']
    }

})

// TODO поставить индексы уникльности на связку login password
UsersSchema.index({ login: 1, password: 1 }, { unique: true })

export default model('Users', UsersSchema)