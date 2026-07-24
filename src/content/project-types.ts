import type { StaticImageData } from 'next/image';

export type Project = {
  id: number;
  slug: string;
  name: string;
  year: string;
  category: string;
  categoryTr: string;
  url: string;
  gitUrl: string;
  image: StaticImageData;
  description: string;
  descriptionTr: string;
  stack: string[];
  featured?: boolean;
};

export type ProjectPosition = {
  current: number;
  total: number;
};
