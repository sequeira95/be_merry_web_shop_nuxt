<script setup>
  definePageMeta({
    layout:"administration",
  })
  const { public:publicURL } = useRuntimeConfig()
  const baseURL = publicURL.baseURL
  const openForm = ref(false)
  const loader = ref(false)
  const isEdit = ref(false)
  const openDelete = ref(false)
  const initialValueCode = {
    name:'',
    code:'',
  }
  const codigo = reactive({...initialValueCode})
  const  {data:codigos}= await useFetch(`${baseURL}/codes`)
  console.log(codigos)
  async function guardarCodigo(){
    if(!codigo.name || !codigo.code){
      return alert("Todos los campos son obligatorios")
    }
    loader.value = true
    try{
      const {data:res} = await useFetch(`${baseURL}/codes`,{
        method:'POST',
        credentials: "include",
        body: JSON.stringify(codigo)
      });
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
    codigo._id = item._id
    codigo.name = item.name
    codigo.code = item.code
  }
  async function editarCodigo(){
    try{
      loader.value = true
      const formData = new FormData()
      const {data:res} = await useFetch(`${baseURL}/codes`,{
        method:'PUT',
        credentials: "include",
        body: JSON.stringify(codigo)
      });
    }catch(e){
      alert(`Ha ocurrido un error inesperado, por favor intente mas tarde ${e}`)
    }finally{
      loader.value = false
      openForm.value = false
    }
  }
  function openAlertDelete(item){
    openDelete.value = true
    codigo._id = item._id
  }
  async function eliminarCodigo(){
    try{
      loader.value = true
      await useFetch(`${baseURL}/codes`,{
        method:'DELETE',
        credentials: "include",
        body:JSON.stringify(codigo)
      });
    }catch(e){
      alert(`Ha ocurrido un error inesperado, por favor intente mas tarde ${e}`)
    }finally{
      loader.value = false
      openDelete.value = false
    }
  }
  watch(openForm, value =>{
    if(!value){
      codigo._id = ''
      codigo.name = ''
      codigo.code = ''
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
        Agregar Código
      </v-btn>
    </div>
    <div class="d-flex justify-center pa-16">
      <v-table>
        <thead>
          <tr>
            <th>
              Nombre
            </th>
            <th>
              Código
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in codigos"
            :key="item._id"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.code }}</td>
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
            v-model="codigo.name"
            label="Nombre"
            clearable
          ></v-text-field>
          <v-text-field
            v-model="codigo.code"
            label="Nombre"
            clearable
          ></v-text-field>
          <v-btn
            v-if="!isEdit"
            class="me-4 btn_add"
            @click="guardarCodigo"
            :disabled="!(codigo.name && codigo.code)"
            :loading="loader"
          >
            Guardar
          </v-btn>
          <v-btn
            v-else
            class="me-4 btn_add"
            @click="editarCodigo"
            :disabled="!(codigo.name && codigo.code)"
            :loading="loader"
          >
            Editar
          </v-btn>

        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="openDelete" width="800px">
      <v-card>
        <v-card-text class="pa-5 text-center">¿Está seguro(a) que desea eliminar este código?</v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            class="btn_add"
            @click="eliminarCodigo"
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
    width: 80%;
  }
  th{
    background-color: #FF8BB5;
    color: #FFF !important;
  }
</style>