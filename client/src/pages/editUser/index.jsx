import axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function EditUser() {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const {name, id} = useParams()

    const navigate = useNavigate()
    
    const handleUsername = (e) => {
        const value = e.target.value

        setUserName(value)
    }

    const handleEmail = (e) => {
        const value = e.target.value

        setUserEmail(value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        await axios.put(`http://localhost:3333/users/${id}`, {
            name: userName,
            email: userEmail
        })
        .then(res => {
            console.log("Editado com sucesso")
            setUserEmail('')
            setUserName('')
        })
        .catch(err => {
            console.error("Erro: ", err)
        })

        navigate("/users")
    }

    const handleCancel = () => {
        navigate('/users')
    }

    return (
        <div className="text-center flex flex-col gap-5">
            <h1>Editar Usuario</h1>

            <p>{name}</p>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 ">
                <input onChange={handleUsername} className="border" type="text" placeholder="Nome" required/>
                <input onChange={handleEmail} className="border" type="email" placeholder="Email" required/>

                <button className="cursor-pointer bg-white text-black" type="submit">Enviar</button>
                <button onClick={handleCancel} className="cursor-pointer bg-white text-black" >Cancelar</button>
            </form>
        </div>
    )
}

export default EditUser