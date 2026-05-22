import axios from "axios"
import dayjs from "dayjs"
import questsModel from "./quests.model"


class QuestService {

    public async getAll() {
        return await questsModel.find()
    }

    public async getByTitle(title: any) {
        return await questsModel.findOne({
            title: title
        })
    }

    public async createQuest(data: any) {
        const newQuest = new questsModel(data)
        return newQuest.save()
    }

    public async editQuest(newData: any, questId: string) {
        return await questsModel.findOneAndUpdate(
            { _id: questId },
            { $set: newData },
            { upsert: true }
        )
    }

}

const newQuestService = new QuestService()

export default newQuestService