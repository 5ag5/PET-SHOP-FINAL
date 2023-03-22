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
            Swal.fire({
                title: '¿Estás seguro(a) de enviar esta info?',
                text: "Usaremos esta información para contactarnos con usted",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '##0000ff',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Sí, envíala!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Enviado!',
                    'Pronto nos comunicaremos con usted.',
                    'success'
                  )
                }
              })
        },
        name(){
            const namef = document.getElementById('name')
            if(this.contacto.nombre.trim() === ''){
                this.mostrarAlerta('El campo nombre es obligatorio', namef);
                return;
            }
            this.limpiarAlerta(namef);
        },
        lname(){
            const lnamef = document.getElementById('lname')
            if(this.contacto.apellido.trim() === ''){
                this.mostrarAlerta('El campo apellido es obligatorio', lnamef);
                return;
            }
            this.limpiarAlerta(lnamef);
        },
        tel(){
            const telf = document.getElementById('tel')
            if(this.contacto.telefono.trim() === ''){
                this.mostrarAlerta('El campo teléfono es obligatorio', telf);
                return;
            }
            this.limpiarAlerta(telf);
        },
        message(){
            const messagef = document.getElementById('message')
            if(this.contacto.mensaje.trim() === ''){
                this.mostrarAlerta('El campo mensaje es obligatorio', messagef);
                return;
            }
            this.limpiarAlerta(messagef);
        },
        pets(){
            const petsf = document.getElementById('pets')
            if(this.contacto.mascotas.length === 0){
                this.mostrarAlerta('Tienes que seleccionar mínimo una máscota', petsf);
                return;
            }
            this.limpiarAlerta(petsf);
        },

        //Error
        mostrarAlerta(mensaje,referencia){
            const alerta = referencia.querySelector('.bg-light');
            if(alerta){
                alerta.remove();
            }

            const error = document.createElement('H5')
            error.textContent = mensaje;
            error.classList.add('bg-light','text-center','mt-2')

            referencia.appendChild(error)
        },

        limpiarAlerta(referencia){
            const alerta = referencia.querySelector('.bg-light');
            if(alerta){
                alerta.remove();
            }
        }
    }
})
.mount('#app');