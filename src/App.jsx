import { useState } from 'react'
import Header from './components/Header';
import Cart from './components/Cart';
import { Route, Routes } from 'react-router-dom';
import AddMovie from './components/AddMovie';



function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <div className='App'>
    <Header/>
    <Routes>
      <Route path='/' element={<Cart/>}/>
      <Route path='/addmovie' element={<AddMovie/>}/>
    </Routes>
   </div>
   </>
  )
}

export default App;
