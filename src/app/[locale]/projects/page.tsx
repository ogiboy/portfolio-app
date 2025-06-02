'use client'
import Card from '@/components/Card'
import { motion, useScroll } from 'framer-motion'

import someProjects from '../../lib/data'

const Projects: React.FC = () => {
  const { scrollYProgress } = useScroll()

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
        <motion.div
          style={{
            width: scrollYProgress,
            height: '100%',
          }}
          className="bg-slate-200 dark:bg-slate-700"
        />
      </footer>
    </div>
  )
}
export default Projects
