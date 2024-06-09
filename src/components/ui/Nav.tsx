import { Link } from 'react-router-dom'

export default function Nav () {
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Projects', path: '/projects' }
  ]
  return (
    <aside className='-ml-[8px] mb-16 tracking-tight'>
      <div className='lg:sticky lg:top-20'>
        <nav
          className='flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative'
          id='nav'
        >
          <div className='flex text-white geist-regular gap-5 mb-16'>
            {Object.entries(navLinks).map(([key, value]) => {
              return (
                <Link
                  key={key}
                  to={value.path}
                  className='transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 text-2xl'
                >
                  {value.title}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}
