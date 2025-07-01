import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Users() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)

  useEffect(() => {
    axios.get("http://localhost:3333/users")
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
      .catch(err => {
        setErr("Erro ao buscar usuarios")
        setLoading(false)
      })
  }, [])

  const navigate = useNavigate()
  const handleRemove = (id) => {

    axios.delete(`http://localhost:3333/users/${id}`)
      .then(res => {
        console.log("Usuario deletado com sucesso")
        setData(prev => prev.filter(user=> user.id !== id))
      })
      .catch(err => {
        console.error(err)
      })
  }

  const goToEditUser = (id) => {
    navigate(`/edit/${id}`)
  }

  const toCreateUser = () => {
    navigate('/')
  }

  const [user, setUser] = useState('')
  const [resultUserSearch, setResultUserSearch] = useState(null)

  const handleSearchUser = (e) => {
    const user = e.target.value

    setUser(user)
  }

  const searchUser = (e) => {
    e.preventDefault()

    axios.get(`http://localhost:3333/users?search=${user}`)
      .then(res => {
        setResultUserSearch(res.data)
        setLoading(false)
      })
      .catch(err => {
        setErr("Erro ao buscar usuarios")
        setLoading(false)
      })
  }

  if(loading) <p>Carregando...</p>
  if(err) <p>{err}</p>
  return (
    <div className='flex flex-col gap-5'>
      <h1 className='font-bold text-3xl'>Usuarios</h1>

      <form onSubmit={searchUser} className='flex justify-between'>
        <input onChange={handleSearchUser} type="text" placeholder='Buscar usuario'/>
        <button className='bg-white text-black cursor-pointer' type='submit'>Buscar usuario</button>
      </form>
      
      <ul className='flex flex-col gap-5'>
        {
          !resultUserSearch && data.map(user => (
            <li key={user.id} className='flex  gap-5'>
              <p>Nome: {user.name} - Email: {user.email}</p>
              <button onClick={() => handleRemove(user.id)} className='bg-white text-black cursor-pointer'>Remove</button>
              <button onClick={() => goToEditUser(user.id)} className='bg-white text-black cursor-pointer'>Editar</button>
            </li>
          ))
        }
      </ul>

      <ul className='flex flex-col gap-5'>
        {
          resultUserSearch && resultUserSearch.map(user => (
            <li key={user.id} className='flex  gap-5'>
              <p>Nome: {user.name} - Email: {user.email}</p>
              <button onClick={() => handleRemove(user.id)} className='bg-white text-black cursor-pointer'>Remove</button>
              <button onClick={() => goToEditUser(user.id)} className='bg-white text-black cursor-pointer'>Editar</button>
            </li>
          ))
        }
      </ul>

      <button onClick={toCreateUser} className='bg-white text-black cursor-pointer'>Criar um usuario</button>
    </div>
  )
}

export default Users