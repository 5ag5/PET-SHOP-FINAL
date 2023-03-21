const {createApp} = Vue
createApp({
    data(){
        return{
        contacto:{
        nombre : '',
        apellido : '',
        telefono : '',
        mensaje : '',
        mascotas: []
    }
        }
    },
    created(){
    },
    methods:{
        procesar(){
            alert(this.contacto.mascotas);
        },
        name(){
            if(this.contacto.nombre === ''){
                this.mostrarAlerta();
            }
            else{
                console.log(this.contacto.nombre.trim());
            }
        },
        lname(){console.log(this.contacto.apellido);},
        tel(){console.log(this.contacto.telefono);},
        message(){console.log(this.contacto.mensaje);},
        pets(){console.log(this.contacto.mascotas);},

        //Error
        mostrarAlerta(){
            const form = document.getElementById('form')
            const error = document.createElement('H5')
            error.textContent = 'Hubo un error...';
            error.classList.add('bg-light', 'p-1','text-center')

            form.appendChild(error)
        },
    }
})
.mount('#app');