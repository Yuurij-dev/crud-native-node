import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function CreateUser() {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')

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
        await axios.post("http://localhost:3333/users", {
            name: userName,
            email: userEmail
        })
        .then(res => {
            console.log("Criado com sucesso")
            setUserEmail('')
            setUserName('')
        })
        .catch(err => {
            console.error("Erro: ", err)
        })

        navigate("/users")
    }

    const toAllUsers =() =>{
        navigate('/users')
    }
    return (
        <div className="text-center flex flex-col gap-5">
            <h1>Criar Usuario</h1>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 ">
                <input onChange={handleUsername} className="border" type="text" placeholder="Nome" required/>
                <input onChange={handleEmail} className="border" type="email" placeholder="Email" required/>

                <button className="cursor-pointer bg-white text-black" type="submit">Enviar</button>
                <button onClick={toAllUsers} className="cursor-pointer bg-white text-black" type="submit">Mostrar todos</button>
            </form>
        </div>
    )
}

export default CreateUser