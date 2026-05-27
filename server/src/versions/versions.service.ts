import axios from 'axios'
import dayjs from 'dayjs'
import versionsModel from './versions.model'

class VersionsService {

    public async createNewVersion(data: any) {
        try {

            if (data.versionProde.length === 0) {
                data.versionProde = null
            }

            const newVersion = new versionsModel(data)
            const result = await newVersion.save()

            return result
        } catch (e: any) {
            console.log(e.message)
            return null
        }
    }

    public async getAllVersions() {
         try {
            const versionsList = await versionsModel.find()
            return versionsList
        } catch (e: any) {
            console.log(e.message)
            return null
        }
    }

}

const versionsService = new VersionsService()

export default versionsService