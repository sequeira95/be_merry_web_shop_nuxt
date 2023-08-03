<script setup>
  definePageMeta({
    layout:"administration",
  })
  const openForm = ref(false)
  const loader = ref(false)
  const isEdit = ref(false)
  const openDelete = ref(false)
  const initialValueAnuncios = {
    name:'',
    type:'',
    category:'',
    descripcion:'',
    imagen:{}
  }
  const anuncio = reactive({...initialValueAnuncios})
  const typeAnuncios = ref([
    {
      title:"En linea",
      value:"linea"
    },
    {
      title:"Slider",
      value:"slider"
    },
    {
      title:"Mixto",
      value:"mixto"
    },
  ])
  const categoryAnuncios = ref([
    {
      title:"Promoción",
      value:"promocion"
    },
    {
      title:"Descuento",
      value:"descuento"
    },
    {
      title:"Otro",
      value:"otro"
    },
  ])
  const  {data:anuncios, refresh}= await useFetch("http://localhost:5000/api/v1/anuncios")
  async function guardarAnuncio(){
    if(!anuncio.name || !anuncio.type || !anuncio.category){
      return alert("Todos los campos son obligatorios")
    }
    loader.value = true
    try{
      const formData = new FormData()
      for(let [key, value] of Object.entries(anuncio)){
        formData.append(key, value)
      }
      formData.append('imagen', anuncio.imagen[0])
      const {data:res} = await useFetch("http://localhost:5000/api/v1/anuncios",{
        method:'POST',
        credentials: "include",
        body:formData //: JSON.stringify({...this.product, imgP:this.imgPrincipal})
      });
      refresh()
    }catch(e){
      alert(`Ha ocurrido un error inesperado, por favor intente mas tarde ${e}`)
    }finally{
      loader.value = false
      openForm.value = false
    }
  }
  function openEditar(item){
    openForm.value = true
    isEdit.value = (true)
    anuncio._id = item._id
    anuncio.name = item.name
    anuncio.type = item.type
    anuncio.category = item.category
    anuncio.descripcion = item.descripcion
    anuncio.activo = item.active
    anuncio.imagen = item.imagen
  }
  async function editarAnuncio(){
    try{
      loader.value = true
      const formData = new FormData()
      for(let [key, value] of Object.entries(anuncio)){
        formData.append(key, value)
      }
      if(anuncio.imagen[0]) formData.append('imagen', anuncio.imagen[0])
      const {data:res} = await useFetch("http://localhost:5000/api/v1/anuncios",{
        method:'PUT',
        credentials: "include",
        body:formData //: JSON.stringify({...this.product, imgP:this.imgPrincipal})
      });
      refresh()
    }catch(e){
      alert(`Ha ocurrido un error inesperado, por favor intente mas tarde ${e}`)
    }finally{
      loader.value = false
      openForm.value = false
    }
  }
  function openAlertDelete(item){
    openDelete.value = true
    anuncio._id = item._id
  }
  async function eliminarAnuncio(){
    try{
      loader.value = true
      await useFetch("http://localhost:5000/api/v1/anuncios",{
        method:'DELETE',
        credentials: "include",
        body:JSON.stringify({...anuncio})
      });
      refresh()
    }catch(e){
      alert(`Ha ocurrido un error inesperado, por favor intente mas tarde ${e}`)
    }finally{
      loader.value = false
      openDelete.value = false
    }
  }
  watch(openForm, value =>{
    if(!value){
      anuncio._id = ''
      anuncio.name = ''
      anuncio.type = ''
      anuncio.category = ''
      anuncio.activo = ''
      anuncio.imagen = {}
    }
  },)
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
    <div class="d-flex justify-center pa-16">
      <v-table class="anuncios_table">
        <thead>
          <tr>
            <th>
              Titulo
            </th>
            <th>
              Tipo
            </th>
            <th>
              Categoria
            </th>
            <th>Activo</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in anuncios"
            :key="item._id"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.active ? "Si" : "No" }}</td>
            <td>
              <v-btn
                v-if="item && item.imagen"
                icon="mdi-image"
                color="#FF8BB5"
                variant="text"
                :href="item.imagen.url"
                target="blank"
              >
              </v-btn>
            </td>
            <td class="d-flex">
              <v-btn
                icon="mdi-pencil"
                variant="text"
                color="#808080"
                @click="openEditar(item)"
              >
              </v-btn>
              <v-btn
                icon="mdi-delete"
                variant="text"
                color="#808080"
                @click="openAlertDelete(item)"
              >
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <v-dialog v-model="openForm" width="600px">
      <v-card>
        <v-form class="pa-5">
          <v-text-field
            v-model="anuncio.name"
            label="Titulo"
            clearable
          ></v-text-field>
          <v-select
            :items="typeAnuncios"
            label="Tipo"
            v-model="anuncio.type"
            clearable
          ></v-select>
          <v-select
            :items="categoryAnuncios"
            label="Categoria"
            v-model="anuncio.category"
            clearable
          ></v-select>
          <v-textarea
            v-model="anuncio.descripcion"
            label="Descripción"
            clearable=""
          ></v-textarea>
          <v-file-input
            v-model='anuncio.imagen'
            accept="image/*"
            label="Imagen"
            clearable
          >
            <template v-slot:append-inner v-if="isEdit">
              <v-tooltip location="top">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" icon="mdi-alert-circle-outline"></v-icon>
                </template>
                Si agrega una imagen se reemplazará la anterior
              </v-tooltip>
            </template>
          </v-file-input>
          <v-switch 
            v-model="anuncio.activo"
            label="Activo"
            v-if="isEdit"
            ></v-switch>
          <v-btn
            v-if="!isEdit"
            class="me-4 btn_add"
            @click="guardarAnuncio"
            :disabled="!(anuncio.name && anuncio.type && anuncio.category)"
            :loading="loader"
          >
            Guardar
          </v-btn>
          <v-btn
            v-else
            class="me-4 btn_add"
            @click="editarAnuncio"
            :disabled="!(anuncio.name && anuncio.type && anuncio.category)"
            :loading="loader"
          >
            Editar
          </v-btn>

        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="openDelete" width="800px">
      <v-card>
        <v-card-text class="pa-5 text-center">¿Está seguro(a) que desea eliminar este anuncio?</v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            class="btn_add"
            @click="eliminarAnuncio"
            :loading="loader"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
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
  .v-table{
    width: 100%;
  }
  th{
    background-color: #FF8BB5;
    color: #FFF !important;
  }
</style>