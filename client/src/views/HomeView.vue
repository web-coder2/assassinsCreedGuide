<template>
  <div class="container-fluid">
    <h1 class="text-light">Домашняя вкладка юзера</h1>

    <div v-if="alert.visible" class="alert" :class="alert.type" role="alert">{{ alert.message }}</div>

    <div class="mt-5 d-flex justify-content-between">

      <div class="card text-light col-sm-3" style="height: 250px; background-color: rgb(17, 17, 17);">
        <div class="card-header">
          <h3 class="text-warning">Профиль юзера</h3>
        </div>
        <div class="card-body">
          <h4>Ник: <span class="text-primary">{{ userName }}</span></h4>
          <h4>Ранг: <span class="text-primary">{{ userRank }}</span></h4>
        </div>
        <div class="card-footer">
          <button class="btn btn-success btn-block" @click="showModal = true">Редактировать юзера</button>
        </div>
      </div>

      <div class="p-3 text-light col-sm-4" style="background-color: black;">
        <h4 class="text-center">Любимые квесты</h4>
        <hr class="bg-primary">
        <div class="p-3">
          <div class="card m-3 p-3" style="background-color: rgb(17, 17, 17);" v-for="(quest, index) in lovingQuests">
              <h5 class="text-center">{{ quest.title }}</h5>
              <hr class="bg-danger">
              <p class="text-success">{{ quest._id }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" :class="{ show: showModal }"  :style="{ display: showModal ? 'block' : 'none' }"  tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header">
            <h5 class="modal-title">Редактирование профиля юзера</h5>
            <button type="button" class="close text-white" @click="showModal = false" aria-label="Закрыть">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input class="form-control bg-dark text-light" v-model="editedUser.userName" placeholder="Ник">
            <input class="form-control bg-dark text-light mt-3" v-model="editedUser.login" placeholder="Новый логин">
            <input class="form-control bg-dark text-light mt-3" v-model="editedUser.password" placeholder="Новый пароль">
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="showModal = false">Закрыть</button>
            <button class="btn btn-primary" @click="saveEditUser">Сохранить</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    data() {
      return {
        userObject: null,
        userId: null,
        userName: null,
        userRank: null,
        lovingQuests: [],
        alert: {
          visible: false,
          type: null,
          message: ''
        },
        showModal: false,
        editedUser: {
          userName: '',
          login: '',
          password: ''
        }
      }
    },
    methods: {
      async getLovingQuests() {
        try {
          const response = await this.$store.dispatch('getDataList', {
            col: 'users/getLoveQuests',
            params: {
              userId: this.userId
            }
          })
          this.lovingQuests = response.data
        } catch (e) {
          console.log(e.message)
        }
      },
      async saveEditUser() {
        try {
          const response = await this.$store.dispatch('createDataList', {
            col: 'users/edit',
            data: {
              userId: this.userId,
              newUser: this.editedUser
            }
          })

          this.showModal = false

          const newUserData = {
            userId: this.userId,
            userName: this.editedUser.userName,
            userRank: this.userRank,
          }

          this.$store.commit('setUserObject', newUserData)

          this.alert = {
            visible: true,
            message: 'профиль успешно редактирован',
            type: 'alert-primary'
          }
        } catch (e) {
          console.log(e.message)

          this.alert = {
            visible: true,
            message: `ошибка при изенении профиля ${e.message}`,
            type: 'alert-danger'
          }
        }
        setTimeout(() => {
          this.alert.visible = false
        }, 2000)
      }
    },
    async beforeMount() {
      this.userObject = this.$store.getters['getUserObject']
      this.userId = this.$store.getters['getUserId']
      this.userName = this.$store.getters['getUserName']
      this.userRank = this.$store.getters['getUserRank']

      this.editedUser.userName = this.userName

      await this.getLovingQuests()
    }
  }

</script>