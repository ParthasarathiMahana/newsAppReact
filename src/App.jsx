import LoginSignUp from './pages/LoginSignUp';
import Home from './pages/Home.jsx';
import DetailedArticle from './pages/DetailedArticle.jsx';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginSignUp/>}/>
        <Route path='/home/:userID' element={<Home/>}/>
        <Route path='/details' element={<DetailedArticle/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
