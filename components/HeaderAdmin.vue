<script setup>
  const { data:empresaData } = await useFetch("http://localhost:5000/api/v1/empresa")
  const links = ref([
    {
      title:"Sobre Mi",
      link:"/administracion/aboutMe"
    },
    {
      title:"Productos",
      link:"/administracion/productos"
    }
  ])
</script>

<template>
  <div class="sidebar">
    <main>
    <div class="logo">
      <NuxtLink to="/">
        <nuxt-img v-if="
            empresaData &&
            empresaData.aboutMe && 
            empresaData.aboutMe.logo" :src="empresaData.aboutMe.logo.url"/>
      </NuxtLink>
    </div>
    <ul v-for="link of links">
      <li><NuxtLink :to="link.link">{{ link.title }}</NuxtLink></li>
    </ul>
  </main>
  </div>

</template>
<style>
  .sidebar {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 200px;
    height: 100vh;
    background-color: #FF8BB5;
  }

  .sidebar ul {
    list-style-type: none;
    margin: 0;
    padding: 1rem 0.8rem 0 0.8rem;
  }

  .sidebar li {
    margin: 0 10px;
  }

  .sidebar li a {
    display: block;
    font-size: 14px;
    color: #000;
    text-decoration: none;
  }
  .logo{
    display: flex;
    justify-content: center;
    background: #fff;
    border: 5px solid #FF8BB5;
  }
  .logo img{
    width: 70px;
    height: 70px;
  }
</style>