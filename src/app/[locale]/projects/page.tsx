'use client';
import Card from '@/components/Card';
import { motion, useScroll, useTransform } from 'framer-motion';
import someProjects from '../../lib/data';

const Projects: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="w-screen min-h-screen bg-firstParallax text-mainTextClr font-body">
      {/* Grid pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

      {/* Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative pt-28 pb-12 px-8 text-center">
        <p className="text-xs font-mono text-indigo-400 tracking-[0.3em] uppercase mb-4">
          portfolio
        </p>
        <h1 className="font-display text-5xl font-bold text-white">Projects</h1>
        <p className="text-slate-400 mt-4 text-sm">
          {someProjects.length} projects built across the stack
        </p>
      </div>

      {/* Grid */}
      <main className="relative flex flex-wrap justify-center gap-6 px-8 pb-24">
        {someProjects.map((item) => {
          const { id, name, url, gitUrl, image, description } = item;
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card
                name={name}
                url={url}
                image={image}
                description={description}
                gitUrl={gitUrl}
              />
            </motion.div>
          );
        })}
      </main>

      {/* Scroll progress bar (fixed) */}
      <footer className="fixed bottom-0 w-screen h-0.5 bg-white/5">
        <motion.div
          style={{ width: progressWidth }}
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
        />
      </footer>
    </div>
  );
};

export default Projects;
