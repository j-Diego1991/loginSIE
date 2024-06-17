import Header from './header'
import React, { useState } from 'react'
import Modal from './Modal'

function App() {
  const[usuario, setUsuario] = useState({nombre: "", passwd: ""})  //Manejear el usario como un objeto JSON vacio
  const[isModalOpen, setModalOpen] = useState(false)              //Estado del modal, por defecto no está activo
  
  //Controlan los mesnajes de error del modal
  const [errorMessage, setErrorMessage] = useState("")            
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")

  //Funciones para cambiar el contenido de los inputs  
  function cambiarInputUsuario(event) {
    setUsuario(u => ({...usuario, nombre: event.target.value}))
  }

  function cambiarInputPasswd(event) {
    setUsuario(u => ({...usuario, passwd: event.target.value}))
  }

  //Validación de usuario
  function validarUsuario(){
    if(usuario.nombre === "" || usuario.passwd === ""){
      setErrorMessage("Los campos usuario o contaseña no deben estar vacíos.")
      setTitle("Acceso denegado")
      setMessage("")
      setModalOpen(true)
    }else if (usuario.nombre !== "admin" || usuario.passwd !== "password") {
      setErrorMessage("Verifica la cuenta de usuario o contraseña")
      setTitle("Acceso denegado")
      setMessage("")      
      setModalOpen(true);
    }else if (usuario.nombre === "admin" && usuario.passwd === "password") {
      setTitle("Acceso autorizado")
      setMessage("Bienvenido a nuestro Sistema de Información Empresarial")
      setErrorMessage("")
      setModalOpen(true)
    }
  }

  return (
    <>
    <Header />
    <div className="m-9 flex flex-col flex-auto p-4 border border-gray-100 rounded">
        <h2 className="font-bold text-2xl">Iniciar sesión</h2>
        <p className="text-base mb-3 text-gray-500">
          Ingresa tus credenciales para acceder al sistema.
        </p>
        <label
          htmlFor="usuario"
          className="text-md font-medium text-blackx font-sans my-1"
        >
          Usuario
        </label>
        <br />
        <input
          className="border border-gray-300 rounded-md pl-1 py-1"
          type="text"
          name="usuario"
          id="usuario"
          placeholder="Ingresa tu usuario"
          value={usuario.nombre}
          onChange={cambiarInputUsuario}
        />
        <br />
        <label
          htmlFor="passwd"
          className="text-md font-medium text-black font-sans mt-1"
        >
          Contraseña
        </label>
        <br />
        <input
          className="my-2 border border-gray-300 font-sans rounded-md pl-1 py-1"
          type="password"
          name="passwd"
          id="passwd"
          placeholder="Ingresa tu contraseña"
          value={usuario.passwd}
          onChange={cambiarInputPasswd}
        />
        <br />
        <button
          className="text-white bg-[#18171c] rounded-md font-sans mt-6 px-12 py-1"
          onClick={() => validarUsuario()}
        >
          Iniciar sesión
        </button>
    </div>

    <Modal title={title} message={message} errorMessage={errorMessage} isOpen={isModalOpen} onClose={() => setModalOpen(false)}/>
    </>
  )
}

export default App
