<script setup>
  definePageMeta({
    layout:"administration",
  })
  const openForm = ref(false)
  const initialValueAnuncios = {
    name:'',
    type:'',
    imagen:{}
  }
  const anuncions = reactive({...initialValueCategory})
</script>
<template>
  <div>
    <div class="d-flex justify-end pa-16">
      <v-btn 
        class="btn_add"
        @click="openForm = true">
        <v-icon>mdi-plus</v-icon>
        Agregar Anuncio
      </v-btn>
    </div>
    <v-dialog v-model="openForm" width="600px">
      <v-card>
        <v-form class="pa-5">
          <v-text-field
            v-model="category.name"
            label="Categoria"
            clearable
          ></v-text-field>
          <v-select
            :items="typeCategory"
            label="Tipo"
            v-model="category.type"
            clearable
          ></v-select>
          <v-file-input
            v-model='category.imagen'
            accept="image/*"
            label="Imagen"
            clearable
          ></v-file-input>
          <v-btn
            class="me-4 btn_add"
            @click=""
          >
            Guardar
          </v-btn>

        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<style>
  .btn_add{
    background: #FF8BB5;
    color: #fff;
    box-shadow: none;
    font-family: 'Poppins', sans-serif;
  }
  .v-input__prepend{
    margin: 0 !important;
  }
  .mdi-paperclip{
    display: none;
  }
</style>