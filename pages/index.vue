<script setup>

  const  {data:empresa}= await useFetch("http://localhost:5000/api/v1/empresa")
  const  {data:anuncios}= await useFetch("http://localhost:5000/api/v1/anuncios",{query:{active:true}})
  async function redirect(item){
    return await navigateTo({path:`/anuncios-${item.name}/${item._id}`})
  }

</script>
<template>
  <div class="pt-16">
    <div class="px-5 d-flex justify-center">
      <v-carousel 
        class="carousel_promo"
        hide-delimiter-background
        cycle
        color="#FF8BB5"
        :show-arrows="false">
        <v-carousel-item
          v-for="item of anuncios" :key="item._id"
          :src="item.imagen.url"
          cover
          @click="redirect(item)"

        ></v-carousel-item>
      </v-carousel>
    </div>
    <CategoriesCarousel class="pa-16"></CategoriesCarousel>
    <div class="about_me d-flex">
      <div class="about_me_img">
        <nuxt-img 
          v-if="empresa && empresa.imgAboutMe"
          :src="empresa.imgAboutMe.url"   sizes="sm:100vw md:50vw lg:300px" alt="Imagen About Me"/>
      </div>
      <div>
        <h4>
          ABOUT ME
        </h4>
        <p>
          {{ empresa.history || 'ropita hecha por mua' }}
        </p>
      </div>
    </div>
    <div class="custom_orders">
      <h4>ÚLTIMOS PEDIDOS PERSONALIZADOS</h4>
      <div class="custom_orders_card">
        <CustomCard v-for=" n in 3" :key="n" ></CustomCard>
      </div>
    </div>
  </div>
</template>
<style>
  .carousel_promo{
    height: 89.875rem;
    max-width: 67.5rem;
    border-radius: 30px;
  }
  .carousel_promo img{
    cursor: pointer;
  }
  .about_me .about_me_img{
    padding: 5rem 9.31rem 5rem 3.75rem;
  }
  .about_me .about_me_img img{
    width: 30rem;
    height: 30rem;
    border: 0.5px solid #FF8BB5;
    border-radius: 30px;
  }
  .about_me h4{
    padding: 5rem 9.31rem 2rem 3.75rem;
    font-family: 'Poppins', sans-serif;
    color: #FF8BB5;
    text-align: center;
    font-size: 1.25rem;
    font-style: italic;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.625rem;
  }
  .about_me p{
    padding: 0 9.31rem 0 3.75rem;
    text-align: center;
  }
  .custom_orders h4{
    padding: 3rem 0 2.81rem 8.75rem;
    font-family: 'Poppins', sans-serif;
    color: #F97272;
    font-size: 0.875rem;
    font-style: italic;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.4375rem;
  }
  .custom_orders .custom_orders_card{
    display: flex;
    gap: 4.5rem;
    justify-content: center;
  }

</style>