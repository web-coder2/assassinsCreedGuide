<template>
    <h3 class="text-light">Админка</h3>

    <div class="container-fluid mt-5">
        <h3 class="text-warning">Все юзеры на форуме</h3>
        <div v-if="alert.visible" class="alert mt-5" :class="alert.type" role="alert">{{ alert.message }}</div>
        <div class="table-responsive mt-5">
            <table class="table table-bordered">
                <thead class="text-light">
                    <tr>
                        <th>Ник</th>
                        <th>Логин</th>
                        <th>Пароль</th>
                        <th>зарегался</th>
                        <th>ранк</th>
                        <th>квесты</th>
                        <th>Изменить роль</th>
                    </tr>
                </thead>
                <tbody class="text-warning">
                    <tr v-for="(user, idx) in usersList">
                        <td>{{ user.userName }}</td>
                        <td>{{ user.login }}</td>
                        <td>{{ user.password }}</td>
                        <td>{{ user.createdAt }}</td>
                        <td>{{ user.userRank }}</td>
                        <td>{{ user.lovingQuests.length }}</td>
                        <td>
                            <select v-model="user.userRank" class="form-control bg-dark text-warning">
                                <option v-for="rank in ranks" :value="rank" >{{ rank }}</option>
                            </select>
                            <button @click="saveNewUserRank(user)" class="btn btn-outline-warning btn-block mt-3">Сохранить</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="container-fluid mt-5">
        <h5 class="text-warning">Добавить новую версию форума</h5>
        <div class="form-group col-sm-4 mt-5">
            <input class="form-control bg-dark text-light" v-model="newVersionObject.versionName" placeholder="название версии">
            <input class="form-control bg-dark text-light mt-3" v-model="newVersionObject.versionDescription" placeholder="что сделано">
            <input class="form-control bg-dark text-light mt-3" v-model="newVersionObject.versionDate" type="date" placeholder="Дата сделаной версии">
            <input class="form-control bg-dark text-light mt-3" v-model="newVersionObject.versionProde" placeholder="эпическая версия ?">
            <button class="btn btn-outline-danger mt-3 btn-block" @click="addNewVersion">Добавить</button>
        </div>
    </div>

</template>

<script>

    import dayjs from 'dayjs'

    export default {
        data() {
            return {
                usersList: [],
                ranks: ['user', 'dev', 'admin'],
                alert: {
                    visible: false,
                    message: '',
                    type: null
                },
                newVersionObject: {
                    versionName: '',
                    versionDate: dayjs(new Date).format('YYYY-MM-DD'),
                    versionDescription: '',
                    versionProde: ''
                }
            }
        },
        methods: {
            async fetchUsersList() {
                try {
                    const response = await this.$store.dispatch('getDataList', {
                        col: 'users',
                        params: {}
                    })
                    this.usersList = response.result
                } catch (e) {
                    console.log(e.message)
                }
            },
            async addNewVersion() {
                try {
                    const response = await this.$store.dispatch('createDataList', {
                        col: 'versions/create',
                        data: {
                            data: this.newVersionObject
                        }
                    })

                    this.newVersionObject = {
                        versionName: '',
                        versionDate: dayjs(new Date).format('YYYY-MM-DD'),
                        versionDescription: '',
                        versionProde: ''
                    }

                    alert('версия добавлена успешно')
                } catch (e) {
                    console.log(e.message)
                }
            },
            async saveNewUserRank(user) {
                try {
                    const response = await this.$store.dispatch('createDataList', {
                        col: 'users/setRank',
                        data: {
                            userId: user._id,
                            newRank: user.userRank
                        }
                    })
                    this.alert = {
                        visible: true,
                        type: 'alert-warning',
                        message: `юзеру ${user.userName} успешно поставили новую роль ${user.userRank}`
                    }
                    await this.fetchUsersList()
                } catch (e) {
                    console.log(e.message)
                    this.alert = {
                        visible: true,
                        type: 'alert-danger',
                        message: `ошбка при обнолвение ранка юзера ${e.message}`
                    }
                }
                setTimeout(() => {
                    this.alert.visible = false
                }, 2000)
            }
        },
        async beforeMount() {
            this.fetchUsersList()
        }
    }

</script>