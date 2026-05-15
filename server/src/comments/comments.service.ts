import axios from "axios"
import dayjs from "dayjs"

import commentsModel from "./comments.model"

class CommentsService {

    public async createComment(data: any) {
        try {
            const result = new commentsModel(data)
            await result.save()
            return result
        } catch (e: any) {
            console.log(e.message)
            return null
        }
    }

    public async getCommentsByQuest(questId: string) {
        try {
            const comments = await commentsModel.find({
                questId: questId
            })
            return comments
        } catch (e: any) {
            console.log(e.message)
            return null
        }
    }

    public async setNewCommentLike(commentId: string) {
        try {
            const commentObject = await commentsModel.findOne({
                _id: commentId
            })


            if (commentObject) {
                const countLikesComment = commentObject.countLikes ?? 0

                const result = await commentsModel.findOneAndUpdate(
                    { _id: commentId },
                    { 
                        $set: {
                            countLikes: countLikesComment + 1 
                        }
                    },
                    { upsert: true }
                )
                return `лайк поставлен ${countLikesComment + 1 } :)`
            } else {
                return `коментарий с таким id ${commentId} не найден :(`
            }
        } catch (e: any) {
            console.log(e.message)
            return null
        }
    }

}

const newCommentsService = new CommentsService()

export default newCommentsService