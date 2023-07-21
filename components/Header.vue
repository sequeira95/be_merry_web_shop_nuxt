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
      <NuxtLink to="#">
        <nuxt-img src="/logo.png"   sizes="sm:100vw md:50vw lg:300px"/>
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
        color="#FCE3A4"
        theme="dark"
        class="nav_inf_btn btn-rose"
      >
        ACCESORIOS

        <v-menu activator="parent" class="pt-5">
          <v-list class="pinkList">
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
        color="#FCE3A4"
        theme="dark"
        class="nav_inf_btn btn-red"
      >
        CONTACTO

        <v-menu activator="parent" class="pt-5">
          <v-list class="redList">
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
    </div>
  </nav>
</template>
<script setup>
import { onMounted } from "vue"

    let newList = ref([])
  onMounted(()=>{
    newList = [
      {title:"VER TODO"},
      {title:"ROPITA"},
      {title:"ACCESORIOS"}
    ]
  })
</script>

<style>
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
    font-size: 12px;
    padding: 0 10px;
    border-radius: 50px;
  }
  .pinkList{
    background: #FF8BB5 !important;
    width: 300px !important;
  }
  .pinkList span{
    background: #FCE3A4;
    color: #FF8BB5 !important;
    font-size: 12px;
    padding: 0 10px;
    border-radius: 50px;
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
    font-size: 12px;
    padding: 0 10px;
    border-radius: 50px;
  }
  .btn-red .v-btn__content{
    color: #F97272 !important;
  }
</style>
