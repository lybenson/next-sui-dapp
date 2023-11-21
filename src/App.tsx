import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import routes from './routes'
import { Card } from '@nextui-org/react'

function App() {
  return (
    <main className='flex flex-col h-screen'>
      <Header />
      <div className='flex h-full flex-1'>
        <Sidebar />

        <Card className='flex-1 m-10 p-10'>
          <Routes>
            {routes.map((route) => {
              return (
                <Route
                  path={route.pathname}
                  element={route.element}
                />
              )
            })}
          </Routes>
        </Card>
      </div>
    </main>
  )
}

export default App
