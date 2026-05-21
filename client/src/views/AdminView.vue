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