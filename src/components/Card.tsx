import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineLink } from 'react-icons/ai';
import { FiGithub } from 'react-icons/fi';

interface CardProps {
  name: string;
  url: string;
  gitUrl: string;
  image: StaticImageData;
  description: string;
}

const Card: React.FC<CardProps> = ({
  name,
  url,
  gitUrl,
  image,
  description,
}) => {
  return (
    <div className="group relative flex flex-col bg-zinc-900/60 border border-white/6 rounded-2xl overflow-hidden w-72 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/8 transition-all duration-300 backdrop-blur-sm">
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-zinc-800">
        <Image
          src={image}
          fill
          alt={name}
          placeholder="blur"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 via-transparent to-transparent" />

        {/* Hover links */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            href={url}
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/90 text-white text-xs font-mono hover:bg-indigo-400 transition-colors"
          >
            <AiOutlineLink className="text-sm" /> Live
          </Link>
          <Link
            href={gitUrl}
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 text-white text-xs font-mono hover:bg-white/25 transition-colors backdrop-blur-sm"
          >
            <FiGithub className="text-sm" /> Code
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4">
        <h2 className="font-display text-sm font-semibold text-white leading-snug">
          {name}
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Bottom links — always visible on mobile */}
        <div className="flex gap-3 pt-2 mt-auto">
          <Link
            href={url}
            target="_blank"
            className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-mono"
          >
            <AiOutlineLink /> Live
          </Link>
          <Link
            href={gitUrl}
            target="_blank"
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors font-mono"
          >
            <FiGithub /> GitHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
