<script setup>
  const { public:publicURL } = useRuntimeConfig()
  const baseURL = publicURL.baseURL
  const { data:empresaData } = await useFetch(`${baseURL}/empresa`)
  const links = ref([
    {
      title:"Sobre Mi",
      link:"/administracion/aboutMe"
    },
    {
      title:"Productos",
      link:"/administracion/productos"
    },
    {
      title:"Categoria",
      link:"/administracion/cateogorias"
    },
    {
      title:"Anuncios",
      link:"/administracion/anuncios"
    },
    {
      title:"Códigos de próductos",
      link:"/administracion/codeProductos"
    }
  ])
</script>

<template>
  <v-navigation-drawer>
    <div class="sidebar">
      <div class="logo">
        <NuxtLink to="/">
          <nuxt-img 
          v-if="empresaData && empresaData.logo"
          :src="empresaData.logo.url" alt="Logo de BeMerry"/>
        </NuxtLink>
      </div>
      <ul v-for="link of links">
        <li><NuxtLink :to="link.link">{{ link.title }}</NuxtLink></li>
      </ul>
    </div>
  </v-navigation-drawer>

</template>
<style>
  .sidebar {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
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