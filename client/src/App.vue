<template>

  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="showNavbar">
    <RouterLink to="/" class="navbar-brand">AssassinsCreed</RouterLink>
      
    <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Переключить навигацию">
      <span class="navbar-toggler-icon"></span>
    </button>
      
    <div class="collapse navbar-collapse" id="navbarMenu" style="flex-direction: row-reverse;">
      <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-for="(item, index) in arrayLinks">
            <RouterLink :to="item.to" class="nav-link"><i :class="item.icon" class="mr-1"></i>{{ item.name }}</RouterLink>
          </li>
      </ul>
    </div>
  </nav>

  <div class="container-fluid mt-5">
    <RouterView />
  </div>
  
</template>


<script>

  import { RouterLink, RouterView } from 'vue-router'

  export default {
    data() {
      return {
        arrayLinks: [
          { to: '/', name: 'Профиль', icon: 'fas fa-home' },
          { to: '/quests', name: 'Квесты', icon: 'fas fa-map-marker-alt' },
          { to: '/admin', name: 'Админка', icon: 'fas fa-star' },
          { to: '/editer', name: 'Редактор', icon: 'fas fa-map' },
          { to: '/login', name: 'Выйти', icon: 'fas fa-sign-in-alt' },

        ],
        showNavbar: null
      }
    },
    watch: {
      '$route'(to, from) {
        this.showNavbar = to.path !== '/login'
      }
    },
    mounted() {
      this.showNavbar = this.$route.path !== '/login'
    }
  }

</script>