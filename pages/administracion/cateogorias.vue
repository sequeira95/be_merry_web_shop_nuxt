<script setup>
  definePageMeta({
    layout:"administration",
  })
  const  {data:categorias}= await useFetch("http://localhost:5000/api/v1/category")
  const openForm = ref(false)
  const openDelete = ref(false)
  const loader = ref(false)
  const initialValueCategory = {
    name:'',
    type:'',
    imagen:{},
  }
  const category = reactive({...initialValueCategory})
  const typeCategory = ref([
    {
      title:"Ropita",
      value:"ropa"
    },
    {
      title:"Accesorios",
      value:"accesorios"
    }
  ])
  const isValidForm = ref(false)
  const isEdit = ref(false)
  const rulesForm = computed(()=>{
    let rules = {
      required:[
        v=> !!v || "Campo requerido"
      ]
    }
    return rules
  }) 
  async function guardarCategoria(){
    if(!category.name || !category.type){
      return alert("Todos los campos son obligatorios")
    }
    loader.value = true
    try{
      const formData = new FormData()
      for(let [key, value] of Object.entries(category)){
        formData.append(key, value)
      }
      formData.append('imagen', category.imagen[0])
      const {data:res} = await useFetch("http://localhost:5000/api/v1/category",{
        method:'POST',
        credentials: "include",
        body:formData //: JSON.stringify({...this.product, imgP:this.imgPrincipal})
      });
    }catch(e){
      alert(`Ha ocurrido un error inesperado, por favor intente mas tarde ${e}`)
    }finally{
      loader.value = false
      openForm.value = true
    }
  }
  function openEditar(item){
    openForm.value = true
    isEdit.value = (true)
    category._id = item._id
    category.name = item.name
    category.type = item.type
    category.activo = item.active
    category.imagen = item.imagen
  }
  async function editarCategoria(){
    try{
      loader.value = true
      const formData = new FormData()
      for(let [key, value] of Object.entries(category)){
        formData.append(key, value)
      }
      if(category.imagen[0]) formData.append('imagen', category.imagen[0])
      const {data:res} = await useFetch("http://localhost:5000/api/v1/category",{
        method:'PUT',
        credentials: "include",
        body:formData //: JSON.stringify({...this.product, imgP:this.imgPrincipal})
      });
    }catch(e){
      alert(`Ha ocurrido un error inesperado, por favor intente mas tarde ${e}`)
    }finally{
      loader.value = false
      openForm.value = true
    }
    
    loader.value = true
    openForm.value = false
  }
  function openAlertDelete(item){
    openDelete.value = true
    category._id = item._id
  }
  async function eliminarCategoria(){
    try{
      loader.value = true
      await useFetch("http://localhost:5000/api/v1/category",{
        method:'DELETE',
        credentials: "include",
        body:JSON.stringify({...category})
      });
    }catch(e){
      alert(`Ha ocurrido un error inesperado, por favor intente mas tarde ${e}`)
    }finally{
      loader.value = true
      openDelete.value = false
    }
  }
  watch(openForm, value =>{
    if(!value){
      category._id = ''
      category.name = ''
      category.type = ''
      category.activo = ''
      category.imagen = {}
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
        Agregar Categoria
      </v-btn>
    </div>
    <div class="d-flex justify-center pa-16">
      <v-table class="category_table">
        <thead>
          <tr>
            <th>
              Nombre
            </th>
            <th>
              Tipo
            </th>
            <th>
              Activo
            </th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in categorias"
            :key="item._id"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.type }}</td>
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
        <v-form class="pa-5" :model-value="isValidForm">
          <v-text-field
            v-model="category.name"
            label="Categoria"
            clearable
            :rules="rulesForm.required"
          ></v-text-field>
          <v-select
            :items="typeCategory"
            label="Tipo"
            v-model="category.type"
            clearable
            :rules="rulesForm.required"
          ></v-select>
          <v-file-input
            v-model='category.imagen'
            accept="image/*"
            label="Imagen"
            clearable
            :rules="rulesForm.required"
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
            v-model="category.activo"
            label="Activo"
            v-if="isEdit"
            ></v-switch>
            <v-btn
              v-if="!isEdit"
              class="me-4 btn_add"
              @click="guardarCategoria"
              :disabled="!(category.name && category.type)"
              :loading="loader"
            >
              Guardar
            </v-btn>
            <v-btn
              v-else
              class="me-4 btn_add"
              @click="editarCategoria"
              :disabled="!(category.name && category.type)"
              :loading="loader"
            >
              Editar
            </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="openDelete" width="800px">
      <v-card>
        <v-card-text class="pa-5 text-center">¿Está seguro(a) que desea eliminar esta categoria?</v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            class="btn_add"
            @click="eliminarCategoria"
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
  .v-table{
    width: 100%;
  }
  th{
    background-color: #FF8BB5;
    color: #FFF !important;
  }
  .v-input__prepend{
    margin: 0 !important;
  }
  .mdi-paperclip{
    display: none;
  }
</style>