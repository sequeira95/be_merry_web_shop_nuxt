<script setup>
  let newList = ref([
    {title:"VER TODO"},
    {title:"ROPITA"},
    {title:"ACCESORIOS"}
  ])
  let listContacto = ref([
    {name:"sobre mi"},
    {name:"whatsapp"},
    {name:"instagram"}
  ])
  const  {data:empresa}= await useFetch("http://localhost:5000/api/v1/empresa")
  const  {data:categorias}= await useFetch("http://localhost:5000/api/v1/category",{
    query:{active:true},
    transform:(categorias) =>{
      let ropita = categorias.filter( e => e.type === "ropa")
      let accesorios = categorias.filter( e => e.type === "accesorios")
      ropita.unshift({name:"ver todo"})
      accesorios.unshift({name:"ver todo"})
      return {ropita, accesorios}
    }
  })
  
</script>
<template>
  <nav>
    <div class='nav_sup'>
      <div class="search">
        <v-text-field
          rounded
          variant="solo"
          elevation='0'
          bg-color='#FF8BB5'
          hide-details
          density="compact"
        >
              <template v-slot:prepend>
                    <v-icon color='#FF8BB5' icon="mdi-magnify"></v-icon>
              </template>
        </v-text-field>
      </div>
      <NuxtLink to="/">
        <nuxt-img 
          v-if="empresa && empresa.logo"
          :src="empresa.logo.url"   sizes="sm:100vw md:50vw lg:300px" alt="Logo de BeMerry"/>
      </NuxtLink>
      <div class="icons">
        <div class="icon_menu">
          <v-icon icon="mdi-heart-circle-outline"></v-icon>
          <v-icon icon="mdi-shopping-outline"></v-icon>
        </div>
        <v-icon icon="mdi-instagram"></v-icon>
        <v-icon icon="mdi-whatsapp"></v-icon>
        <v-icon icon="mdi-help"></v-icon>
      </div>
    </div>
    <div class="nav_inf">
      <v-btn
        color="#F97272"
        theme="dark"
        class="nav_inf_btn"

      >
        NUEVO

        <v-menu activator="parent" class="pt-5">
          <v-list class="yellowList">
            <v-list-item
              v-for="(item, index) in newList"
              :key="index"
              :value="index"
              :ripple="false"
            >
              <v-list-item-title><span>{{ item.title }}</span></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
      <v-btn
        color="#F97272"
        theme="dark"
        class="nav_inf_btn"
      >
        ROPITA

        <v-menu activator="parent" class="pt-5">
          <v-list class="yellowList">
            <v-list-item
              v-for="(item, index) of categorias.ropita"
              :key="index"
              :value="index"
              :ripple="false"
            >
              <v-list-item-title>
                <NuxtLink :to="`/productos/${item.name === 'ver todo' ? 'ropita' : item.name}`">
                  <span>{{ item.name.toUpperCase() }}</span>
                </NuxtLink>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
      <v-btn
        color="#FCE3A4"
        theme="dark"
        class="nav_inf_btn btn-rose"
      >
        ACCESORIOS

        <v-menu activator="parent" class="pt-5">
          <v-list class="pinkList">
            <v-list-item
              v-for="(item, index) of categorias.accesorios"
              :key="index"
              :value="index"
              :ripple="false"
            >
              <v-list-item-title>
                <NuxtLink :to="`/productos/${item.name === 'ver todo' ? 'accesorios' : item.name}`">
                  <span>{{ item.name.toUpperCase() }}</span>
                </NuxtLink>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
      <v-btn
        color="#FCE3A4"
        theme="dark"
        class="nav_inf_btn btn-red"
      >
        CONTACTO

        <v-menu activator="parent" class="pt-5">
          <v-list class="redList">
            <v-list-item
              v-for="(item, index) of listContacto"
              :key="index"
              :value="index"
              :ripple="false"
              
            >
              <v-list-item-title><NuxtLink to="/productos/ropita"><span>{{ item.name.toUpperCase() }}</span></NuxtLink></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </div>
  </nav>
</template>

<style>
  a{
    text-decoration: none;
  }
  .nav_sup {
    display: flex;
    background-color: #fff;
    height: 100%;
    align-items: center;
    width: 100%;
    justify-content: space-around;
  }
  .nav_sup a {
    color: #000;
    font-size: 16px;
    font-weight: bold;
  }
  .nav_sup .logo {
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
  }
  .nav_sup .search {
    width: 16rem;
  }
  .nav_sup .icons {
    display: flex;
    color: #FF8BB5;
  }
  .nav_sup .icons  i {
    margin-right: 1rem;
    height: 2.2rem;
    width: 2.2rem;
  }
  .icon_menu{
    display: flex;
    background: #FCE3A4;
    border-radius: 50px;
    justify-content: center;
  }
  .nav_inf{
    display: flex;
    gap: 2rem;
    justify-content: space-around;
  }
  .nav_inf .nav_inf_btn{
    font-family: 'Poppins', sans-serif;
    border-radius: 1.25rem;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.4375rem;
    padding: 0.625rem 1.4375rem;
    position: relative;
    z-index: 1;
  }
  .yellowList{
    background: #FCE3A4 !important;
    width: 300px !important;
  }
  .yellowList span{
    background: #F97272;
    color: #FFF !important;
    font-size: 0.6875rem;
    padding: 0 10px;
    border-radius: 50px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }
  .pinkList{
    background: #FF8BB5 !important;
    width: 300px !important;
  }
  .pinkList span{
    background: #FCE3A4;
    color: #FF8BB5 !important;
    font-size: 0.6875rem;
    padding: 0 10px;
    border-radius: 50px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }
  .btn-rose .v-btn__content{
    color: #FF8BB5 !important;
  }
  .redList{
    background: #F97272 !important;
    width: 300px !important;
  }
  .redList span{
    background: #FCE3A4;
    color: #FF8BB5 !important;
    font-size: 0.6875rem;
    padding: 0 10px;
    border-radius: 50px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }
  .btn-red .v-btn__content{
    color: #F97272 !important;
  }
</style>
