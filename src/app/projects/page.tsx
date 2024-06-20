'use client'
import Card from '@/components/Card'

import { animated, useScroll, useSpring } from '@react-spring/web'
import { useEffect } from 'react'

import someProjects from '../lib/data'

const Projects: React.FC = () => {
  const { scrollYProgress } = useScroll()

  const [springs, api] = useSpring(() => ({
    width: '25%',
    height: 25,
    borderRadius: 2,
  }))

  useEffect(() => {
    api.start({
      width: scrollYProgress.to((progress) => `${progress * 100}%`),
    })

    return () => {
      api.stop()
    }
  }, [api, scrollYProgress])

  return (
    <div className="w-screen h-full text-center text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 overflow-hidden">
      <h1 className="text-lg p-2">Projects</h1>
      <main className="flex flex-wrap items-center justify-evenly w-screen h-full">
        {someProjects.map((item) => {
          const { id, name, url, gitUrl, image, description } = item
          return (
            <Card
              key={id}
              name={name}
              url={url}
              image={image}
              description={description}
              gitUrl={gitUrl}
            />
          )
        })}
      </main>
      <footer className="fixed bottom-0 w-screen h-3 bg-slate-700 dark:bg-slate-200">
        <animated.div
          style={{
            ...springs,
          }}
          className="bg-slate-200 dark:bg-slate-700"
        />
      </footer>
    </div>
  )
}
export default Projects
