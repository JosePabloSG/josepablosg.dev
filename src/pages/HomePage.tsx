import { useEffect } from 'react'
import Footer from '../components/ui/Footer'
import Nav from '../components/ui/Nav'

export default function HomePage () {
  useEffect(() => {
    document.title = 'Home'
  }, [])

  return (
    <>
      <Nav />
      <section className='flex flex-col gap-10 geist-regular text-white'>
        <h1 className='text-left text-2xl'>Hi, I'm José Pablo 👋</h1>
        <p className='text-left text-[#d0d5d3]'>
          I am an aspiring full-stack developer, optimist, and community builder. Currently, I study to become a full-stack developer, learning new technologies and helping teach my friends along the way. Besides web development, I love photography as a hobby.
        </p>
        <article className='flex flex-col gap-5'>
          <div className='flex w-[100%] justify-between gap-5'>
            <img
              src='/Me.webp'
              alt='Me'
              className='w-[35%] rounded-md'
            />
            <img
              src='/DJI.webp'
              alt='DJI'
              className='w-[65%] rounded-md'
            />
          </div>
        </article>
        <p className='text-left text-[#d0d5d3]'>
          I am currently studying Systems Engineering at the National University of Costa Rica, where
          I learn technologies such as React, NestJS, TypeScript, and JavaScript.
        </p>
        <div className='flex w-[100%] justify-between gap-5'>
          <img
            src='/React.webp'
            alt='React'
            className='w-[65%] rounded-md'
          />
          <img
            src='/Tailwind.webp'
            alt='TailwindCSS'
            className='w-[35%] rounded-md'
          />
        </div>
      </section>
      <Footer />
    </>
  )
}
