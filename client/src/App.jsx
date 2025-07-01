

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Users from './pages/users'
import CreateUser from './pages/createUser'
import EditUser from './pages/editUser'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CreateUser/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/edit/:id/:name' element={<EditUser/>}/>
      </Routes>
    </Router>
  )
}

export default App