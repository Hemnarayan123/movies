import { useState } from 'react'
import Header from './components/Header';
import Cart from './components/Cart';
import { Route, Routes } from 'react-router-dom';
import AddMovie from './components/AddMovie';
import Detail from './components/Detail';



function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <div className='App'>
    <Header/>
    <Routes>
      <Route path='/' element={<Cart/>}/>
      <Route path='/addmovie' element={<AddMovie/>}/>
      <Route path='/detail/:id' element={<Detail />} />
    </Routes>
   </div>
   </>
  )
}

export default App;
