 const form = document.getElementById('form')
 const nombre = document.getElementById('nombre')
 const apellido = document.getElementById('apellido')
 const cedula = document.getElementById('cedula')
 const direccion = document.getElementById('direccion')
 const detalles = document.getElementById('detalles')
 
 
 form.addEventListener('submit',function(e){
  
   let valid =  false
   console.log(nombre , apellido , cedula , direccion , detalles )
  if( nombre.value !== '' && apellido.value !== '' && cedula.value !== '' && direccion.value !== '' && detalles.value !== '') {
    valid = true
  } 

  if(!valid) {
    alert('llena todos los campos requeridos')
    e.preventDefault()
  }
})