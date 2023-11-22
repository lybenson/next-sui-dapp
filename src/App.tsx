import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import routes from './routes'
import { Card } from '@nextui-org/react'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <main className='flex flex-col h-screen'>
      <div className='shrink-0'>
        <Header />
      </div>
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

      <Toaster
        position='top-center'
        reverseOrder={false}
        gutter={8}
      />
    </main>
  )
}

export default App
