//Variables 
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

//Variables para campos 
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        

eventListeners();
function eventListeners(){
    //cuando la app arranca 
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del formulario 
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //reinicia el formulario 
    btnReset.addEventListener('click', reseteaForm);

    //enviar email  
    formulario.addEventListener('submit', enviarEmail);



}

//Funciones 
function iniciarApp(){
    btnEnviar.disabled= true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// valida el formulario 
function validarFormulario (e){
    e.preventDefault();
   

    if(e.target.value.length > 0){
        //elimina los errores 

        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
        
    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError('Todos los Campos son Obligatorios');
    }

    if(e.target.type === 'email'){
        //Validacion regular
        
        if(er.test(e.target.value)){
            const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }


            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        }else{
            
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email No válido');
        }
    }
    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled= false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500','background-red-100', 'text-red-500' , 'p-3', 'mt-5', 'text-center' , 'error');

    //
    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }

    

}

//envia el email 
function enviarEmail(e){
    e.preventDefault();
    
    // Mostrar el spinner 
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Despued de 3s ocultar el spinner y mostrar el mensaje 
    /*
    
    
    setInterval(()=>{
        console.log('esta funcion se ejecuta cada de 3s ')
    } , 3000);
    */

    setTimeout(()=>{
        spinner.style.display = 'none';

        // mensaje que dice que se envio correctamente 

        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envio correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-3' ,'bg-green-500' , 'text-white','font-bold','uppercase');
        //inserta el parrafo antes del spinner 
        formulario.insertBefore(parrafo , spinner);

        setTimeout(() =>{
            parrafo.remove(); // elimina el mensaje de  éxito
            reseteaForm();
        } ,5000);
    } , 3000);    
    
}


// funcion que resetea el formulario 

function reseteaForm(){
    formulario.reset();
    iniciarApp();
}