<script setup>
  const { public:publicURL } = useRuntimeConfig()
  const baseURL = publicURL.baseURL
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
  const empresa = ref({})
  try{
    const  { data }= await useFetch(`${baseURL}/empresa`)
    empresa.value = data
  }catch (e){}
  //const  {data:empresa}= await useFetch("https://be-merry-backend-node-lzbk-dev.fl0.io/api/v1/empresa")
  const  {data:categorias}= await useFetch(`${baseURL}/category`,{
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
        <nuxt-img 
          v-else
          src="https://ik.imagekit.io/z87g9nhhp/imgPrincipal/logo_c7LbIq7DK.png?updatedAt=1690219112145"   sizes="sm:100vw md:50vw lg:300px" alt="Logo de BeMerry"/>
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
      <div class="drop_menu">
        <v-btn
          color="#F97272"
          theme="dark"
          class="nav_inf_btn"

        >
          NUEVO
        </v-btn>
        <div>
          <ul class="yellowList">
            <li v-for="(item, index) in newList" :key="index">
              <NuxtLink to="#"> {{ item.title }} </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="drop_menu">
        <v-btn
          color="#F97272"
          theme="dark"
          class="nav_inf_btn"
        >
          ROPITA
        </v-btn>
        <div>
          <ul class="yellowList">
            <li v-for="(item, index) in categorias.ropita" :key="index">
              <!--<NuxtLink :to="`/productos/${item.name === 'ver todo' ? 'ropita' : item.name}`"> {{ item.name.toUpperCase() }} </NuxtLink>-->
              <NuxtLink :to="`/productos-${item.name === 'ver todo' ? 'ropita' : item.name}`"> {{ item.name.toUpperCase() }} </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="drop_menu">
        <v-btn
          color="#FCE3A4"
          theme="dark"
          class="nav_inf_btn btn-rose"
        >
        ACCESORIOS
        </v-btn>
        <div>
          <ul class="pinkList">
            <li v-for="(item, index) in categorias.accesorios" :key="index">
              <!--<NuxtLink :to="`/productos/${item.name === 'ver todo' ? 'accesorios' : item.name}`"> {{ item.name.toUpperCase() }} </NuxtLink>-->
              <NuxtLink :to="`/productos-${item.name === 'ver todo' ? 'accesorios' : item.name}`"> {{ item.name.toUpperCase() }} </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="drop_menu">
        <v-btn
          color="#FCE3A4"
          theme="dark"
          class="nav_inf_btn btn-red"
        >
          CONTACTO
        </v-btn>
        <div>
          <ul class="redList">
            <li v-for="(item, index) in listContacto" :key="index">
              <NuxtLink :to="{name:'productos-category', params:{category:'ropita'}}">{{ item.name.toUpperCase() }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
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
  .nav_inf .drop_menu{
    position: relative;
  }
  .nav_inf .nav_inf_btn{
    font-family: 'Poppins', sans-serif;
    border-radius: 1.25rem;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.4375rem;
    padding: 0.625rem 1.4375rem;
    position: relative;
    z-index: 2;
  }
  .yellowList{
    display: none;
    position: absolute;
    overflow: auto;
    background: #FCE3A4 !important;
    width: 300px !important;
    top: 19px;
    padding-top: 20px;
    border-radius: 0rem 1.25rem 1.25rem 1.25rem;
    z-index: 1;
  }
  .yellowList li,.pinkList li, .redList li {
    padding: 0.5rem 1rem;
  }
  .yellowList a{
    background: #F97272;
    color: #FFF !important;
    font-size: 0.6875rem;
    padding: 0 10px;
    border-radius: 50px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }
  .drop_menu:hover .yellowList, .drop_menu:hover .pinkList, .drop_menu:hover .redList{
    display: block;
    animation: menu-open 0.5s normal;
  }
  .pinkList{
    display: none;
    position: absolute;
    overflow: auto;
    background: #FF8BB5 !important;
    width: 300px !important;
    top: 19px;
    padding-top: 20px;
    border-radius: 0rem 1.25rem 1.25rem 1.25rem;
    z-index: 1;
  }
  .pinkList a{
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
    display: none;
    position: absolute;
    overflow: auto;
    background: #F97272 !important;
    width: 300px !important;
    top: 19px;
    padding-top: 20px;
    border-radius: 0rem 1.25rem 1.25rem 1.25rem;
    z-index: 1;
  }
  .redList a{
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
  @keyframes menu-open {
  from {
    top: 1px;
    opacity: 0;
  }
  to {
    bottom: 1000px;
  }
}
</style>
