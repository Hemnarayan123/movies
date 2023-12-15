import { useEffect, useState } from 'react'
import Header from './components/Header';
import Cart from './components/Cart';
import { Route, Routes } from 'react-router-dom';
import AddMovie from './components/AddMovie';
import Detail from './components/Detail';
import { createContext} from 'react';
import Login from './components/Login';
import Signup from './components/Signup'


const Appstate = createContext();

function App() {

  const [count, setCount] = useState(0);
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect

  return (
  <Appstate.Provider value={{login, userName, setUserName, setLogin}}>
   <>
   <div className='App'>
    <Header/>
    <Routes>
      <Route path='/' element={<Cart/>}/>
      <Route path='/addmovie' element={<AddMovie/>}/>
      <Route path='/detail/:id' element={<Detail />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
   </div>
   </>
   </Appstate.Provider>
  )
}

export default App;
export {Appstate}
