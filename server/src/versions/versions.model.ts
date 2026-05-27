import { Schema, model } from 'mongoose'
import dayjs from 'dayjs'

const versionsSchema = new Schema({
    versionName: String,
    versionDate: String,
    versionDescription: String,
    versionProde: String
})

export default model('versionsSchema', versionsSchema)