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

}

const newQuestService = new QuestService()

export default newQuestService