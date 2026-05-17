<template>
    
    <div class="container my-5 d-flex justify-content-center">
        <div class="card w-50 bg-dark text-light p-3">

            <div v-if="alert.visible" class="alert" :class="alert.type" role="alert">{{ alert.message }}</div>

            <h3 class="text-center">Вход/регаться в форум AC1</h3>

            <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs" id="authTab" role="tablist">
                    <li class="nav-item bg-dark text-light">
                        <a class="nav-link active" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="true">Регистрация</a>
                    </li>
                    <li class="nav-item bg-dark text-light">
                        <a class="nav-link" id="login-tab" data-toggle="tab" href="#login" role="tab" aria-controls="login" aria-selected="false">Авторизация</a>
                    </li>
                </ul>
            </div>

            <div class="card-body bg-dark">
                <div class="tab-content" id="authTabContent">

                    <div class="tab-pane fade show active" id="register">
                        <div class="form-group">
                            <input class="form-control bg-dark text-light" v-model="newUser.userName" placeholder="userName" />
                        </div>
                        <div class="form-group">
                            <input class="form-control bg-dark text-light" v-model="newUser.login" placeholder="login" />
                        </div>
                        <div class="form-group">
                            <input class="form-control bg-dark text-light" v-model="newUser.password" placeholder="password" />
                        </div>
                        <button @click="createUser()" class="btn btn-success btn-block">зарегаться</button>
                    </div>
          
                    <div class="tab-pane fade" id="login">
                        <div class="form-group">
                            <input class="form-control bg-dark text-light" v-model="login" placeholder="login" />
                        </div>
                        <div class="form-group">
                            <input class="form-control bg-dark text-light" v-model="password" placeholder="password" />
                        </div>
                        <button @click="userAuth()" class="btn btn-danger btn-block">Войти</button>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<style>

.nav-tabs .nav-link.active {
    background-color:rgb(43, 41, 41);
    color: #fff;
    border-color: #343a40;
}

</style>

<script>

    import dayjs from 'dayjs'

    export default {
        data() {
            return {
                login: null,
                password: null,
                newUser: {
                    userName: '',
                    login: '',
                    password: '',
                    createdAt: dayjs(new Date).format('YYYY-MM-DD'),
                    userRank: 'user'
                },
                alert: {
                    visible: false,
                    message: '',
                    type: null
                }
            }
        },
        methods: {
            async createUser() {
                try {
                    const response = await this.$store.dispatch('createDataList', {
                        col: 'users/create',
                        data: {
                            data: this.newUser
                        }
                    })
                    this.newUser.userName = ''
                    this.newUser.login = ''
                    this.newUser.password = ''

                    this.alert.visible = true
                    this.alert.message = 'Юзер успешно зарегался'
                    this.alert.type = 'alert-success'
                } catch (e) {
                    this.alert.visible = true
                    this.alert.message = `ошибка при регистрации юзера ${e.message}`
                    this.alert.type = 'alert-danger'
                }
                setTimeout(() => {
                    this.alert.visible = false
                }, 2000)
            },
            async userAuth() {
                try {
                    const response = await this.$store.dispatch('createDataList', {
                        col: 'users/auth',
                        data: {
                            login: this.login,
                            password: this.password
                        }
                    })

                    if (response.message === 'юзер не найден') {
                        this.alert.visible = true
                        this.alert.message = `юзер с ${this.login}:${this.password} не найден`
                        this.alert.type = 'alert-warning'
                    } else {
                        let userInfo = response.result

                        const userData = {
                            userId: userInfo._id,
                            userName: userInfo.userName,
                            userRank: userInfo.userRank,
                        }

                        this.$store.commit('setUserObject', userData)
                        this.$router.push({ name: 'home' }).then(() => {
                            window.location.reload()
                        })
                    }
                    
                    this.login = null
                    this.password = null

                } catch (e) {
                    this.alert.visible = true
                    this.alert.message = `ошибка при авторизации ${e.message}`
                    this.alert.type = 'alert-danger'
                }
                setTimeout(() => {
                    this.alert.visible = false
                }, 2000)
            }
        },
        beforeMount() {
            // когда юзер попаает в login page вкладку сразу стирается его vuex даные
            this.$store.commit('clearUserObject')
        }
    }

</script>