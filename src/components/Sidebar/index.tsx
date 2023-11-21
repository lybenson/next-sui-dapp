import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()
  console.log(location)

  return (
    <div className='w-[20%] border-r-indigo-300 border-r-1 h-full'>
      <ul>
        <li>
          <Link
            to='/token'
            className={`${location.hash === 'token' ? 'bg-yellow-500' : ''}`}
          >
            token
          </Link>
        </li>
      </ul>
    </div>
  )
}
