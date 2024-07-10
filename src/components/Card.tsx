import type { StaticImageData } from 'next/image'

import Image from 'next/image'
import Link from 'next/link'

import { AiOutlineLink } from 'react-icons/ai'
import { FiGithub } from 'react-icons/fi'

interface CardProps {
  name: string
  url: string
  gitUrl: string
  image: StaticImageData
  description: string
}

const Card: React.FC<CardProps> = ({
  name,
  url,
  gitUrl,
  image,
  description,
}) => {
  const linkClasses =
    'border rounded-md p-1 mb-2 shadow-lg shadow-slate-400 hover:shadow-slate-500 dark:shadow-slate-800 dark:hover:shadow-slate-500'

  return (
    <div className="border rounded-lg dark:border-slate-300 border-slate-700 flex flex-col flex-nowrap items-center justify-center min-w-72 max-w-80 min-h-[500px] max-h-[1000px] m-5">
      <h2>{name}</h2>
      <Image
        src={image}
        height={200}
        width={350}
        alt={name}
        placeholder="blur"
        className="grow"
      />
      <p>{description}</p>
      <div className="w-full h-fit flex justify-center items-center m-2 p-1 scale-150 space-x-5">
        <Link
          href={url}
          target="_blank"
          className={linkClasses}
          title="Go to project website"
        >
          <AiOutlineLink />
        </Link>
        <Link
          href={gitUrl}
          target="_blank"
          className={linkClasses}
          title="Go to project repository"
        >
          <FiGithub />
        </Link>
      </div>
    </div>
  )
}
export default Card
