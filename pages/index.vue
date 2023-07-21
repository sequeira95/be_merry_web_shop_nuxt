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
          src="/promo3-12.jpg"
          cover
        ></v-carousel-item>

        <v-carousel-item
          src="/promo3-12.jpg"
          cover
        ></v-carousel-item>

        <v-carousel-item
          src="/promo3-12.jpg"
          cover
        ></v-carousel-item>
      </v-carousel>
    </div>
    <CategoriesCarousel class="py-16"></CategoriesCarousel>
    <div class="about_me d-flex">
      <div class="about_me_img">
        <nuxt-img src="/aboutMe.png"/>
      </div>
      <div>
        <h4>
          ABOUT ME
        </h4>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab praesentium nisi aliquid veniam voluptatem in esse, inventore reprehenderit distinctio repellat illum amet expedita nihil ipsum iure recusandae et vel voluptatum!
          Accusamus, pariatur vel voluptate fuga est numquam quisquam totam officiis molestias minus ut cum, repellat modi maiores. Suscipit consectetur fugiat aliquam pariatur quae aut itaque blanditiis, a, expedita, repellendus doloribus!
        </p>
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
</style>