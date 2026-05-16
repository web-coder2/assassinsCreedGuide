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

    public async userAuth(login: string, password: string) {
        try {

            const isUser = await usersModel.findOne({
                login: login,
                password: password
            })

            if (isUser) {
                return isUser
            } else {
                return `юзер с такими ${login} : ${password} не найден :(`
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