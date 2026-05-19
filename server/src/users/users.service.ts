import axios from "axios"
import dayjs from "dayjs"
import usersModel from "./users.model"

class UsersService {

    public async createUser(data: any) {
        try {
            const newUser = new usersModel(data)
            const result = newUser.save()
            return result
        } catch (e: any) {
            console.log(e.message)
            return null
        }
    }

    public async getLovingQuests(userId: any) {
        try {
            const user = await usersModel.findOne({
                _id: userId
            })

            const data = user ? user.lovingQuests : []
            return data
        } catch (e: any) {
            console.log(e.message)
            return null
        }
    }

    public async addLovingQuest(userId: string, quest: any) {
        try {

            const userInfo = await usersModel.findOne({
                _id: userId
            })

            if (userInfo) {
                const userLovingQuests = userInfo.lovingQuests
                userLovingQuests.push(quest)

                const result = usersModel.findOneAndUpdate(
                    { _id: userId },
                    { 
                        $set: {
                            lovingQuests: userLovingQuests
                        } 
                    },
                    { upsert: true }
                )

                return result
            } else {
                return `юзера с таким id ${userId} нет`
            }

        } catch (e: any) {
            console.log(e.message)
            return null
        }
    }

    public async userAuth(login: string, password: string) {
        try {

            const isUser = await usersModel.findOne({
                login: login,
                password: password
            })

            if (isUser) {
                return isUser
            } else {
                return false
            }

        } catch (e: any) {
            console.log(e.message)
            return null
        }
    }

    public async setNewUserRank(userId: string, newRank: string) {
        try {

            const fetchedUser = await usersModel.findOne({
                _id: userId
            })

            if (fetchedUser) {
                const result = await usersModel.findOneAndUpdate(
                    { _id: userId },
                    {
                        $set: {
                            userRank: newRank
                        }
                    },
                    { upsert: true }
                )
                return result
            } else {
                return `юзера с таким ${userId}  нет`
            }

        }  catch (e: any) {
            console.log(e.message)
            return null
        }
    }

    public async getAll() {
        try {
            const usersList = await usersModel.find()
            return usersList
        } catch (e: any) {
            console.log(e.message)
            return null
        }
    }

    public async editUser(userId: string, newUser: any) {
        try {
            const result = await usersModel.findOneAndUpdate(
                { _id: userId },
                { $set: newUser },
                { upsert: true }
            )
            return result
        } catch (e: any) {
            console.log(e.message)
            return null
        }
    }

}

const newUsersService = new UsersService()

export default newUsersService