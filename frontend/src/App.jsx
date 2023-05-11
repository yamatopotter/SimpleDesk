import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './routes/Login'
import { Home } from './pages/Home'
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App
