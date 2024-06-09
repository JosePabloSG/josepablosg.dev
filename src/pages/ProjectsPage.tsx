import { useQuery } from 'react-query'
import { getRepos } from '../api/Github'
import Loader from '../components/ui/Loader'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import Nav from '../components/ui/Nav'
import Footer from '../components/ui/Footer'
import { useEffect } from 'react'

interface project {
    name: string;
    description: string;
    html_url: string;
}

export default function ProjectsPage () {
  const { data: projects, isLoading } = useQuery('projects', getRepos)

  useEffect(() => {
    document.title = 'Projects'
  }, [])

  if (isLoading) return <Loader />

  return (
    <>
      <Nav />
      <section className='flex flex-col gap-10 geist-regular text-white'>
        <h1 className='text-left text-2xl'>
          My projects on GitHub
        </h1>
        <div>
          <div className='grid md:grid-cols-[1fr_1fr] gap-5 text-[14px] '>
            {projects.map((project: project) => (
              <a key={project.name} href={project.html_url} target='_blank' rel='noreferrer'>
                <div className='flex items-center p-3 justify-between bg-[#262626] border-2 border-[#404040] rounded-md min-h-[100px] hover:scale-105 transition-transform duration-300 ease-in-out'>
                  <div className='text-left'>
                    <p>{project.name}</p>
                    <p className='text-[#A3A3A3]'>{project.description}</p>
                  </div>
                  <FaArrowUpRightFromSquare />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
