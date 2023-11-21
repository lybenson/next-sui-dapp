import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Token from './components/Token'

function App() {
  return (
    <main className='flex flex-col h-screen'>
      <Header />
      <div className='flex h-full flex-1'>
        <Sidebar />

        <div className='flex-1'>
          <Routes>
            <Route
              path='/token'
              element={<Token />}
            />
          </Routes>
        </div>
      </div>
    </main>
  )
}

export default App
