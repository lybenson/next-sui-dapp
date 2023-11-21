import { Link, useLocation } from 'react-router-dom'
import routes from '../../routes'

export default function Sidebar() {
  const location = useLocation()

  return (
    <div className='w-[20%]  border-r-1 h-full px-10 py-2'>
      <ul>
        {routes.map((path) => (
          <li className='my-2  w-full h-10'>
            <Link
              to={path.pathname}
              className={`${
                location.pathname === '/' + path.pathname
                  ? 'bg-zinc-300 text-amber-500 font-bold'
                  : ''
              } w-full inline-block rounded-md h-10 leading-10`}
            >
              {path.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
