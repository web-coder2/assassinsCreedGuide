<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand">AssassinsCreed</a>
      
    <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Переключить навигацию">
      <span class="navbar-toggler-icon"></span>
    </button>
      
    <div class="collapse navbar-collapse" id="navbarMenu" style="flex-direction: row-reverse;">
      <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link">About</RouterLink>
          </li>
      </ul>
    </div>
  </nav>

  <div class="container-fluid mt-5">
    <RouterView />
  </div>
  
</template>