<template>
  <div class="container-fluid">
    <h1 class="text-light">Домашняя вкладка юзера</h1>

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
          <button class="btn btn-success btn-block">Редактировать юзера</button>
        </div>
      </div>

      <div class="p-3 text-light col-sm-4" style="background-color: black;">
        <h4 class="text-center">Любимые квесты</h4>
        <hr class="bg-primary">
        <div class="p-3">
          <div class="card m-3 p-3" style="background-color: rgb(17, 17, 17);" v-for="(quest, index) in mockQuests">
              <h5 class="text-center">{{ quest.title }}</h5>
              <hr class="bg-danger">
              <p class="text-success">{{ quest.description }}</p>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

  // TODO потом сделать для модели юзера масив с любимыми квестами логику

  export default {
    data() {
      return {
        userObject: null,
        userId: null,
        userName: null,
        userRank: null,
        mockQuests: [
          { title: 'Найти предателя масиава', description: 'нуэно было найти предателя в масиафе который предал братство' },
          { title: 'Убить Джубаира', description: 'придти в дамаск найти торговца оружием изза него и продолжаются войны' },
          { title: 'Убить Робера', description: 'главный враг ассассинов Робер он основал орден тамплиеров на святой земле' },
        ]
      }
    },
    beforeMount() {
      this.userObject = this.$store.getters['getUserObject']
      this.userId = this.$store.getters['getUserId']
      this.userName = this.$store.getters['getUserName']
      this.userRank = this.$store.getters['getUserRank']
    }
  }

</script>