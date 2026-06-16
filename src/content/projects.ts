import type { StaticImageData } from 'next/image';

import weatherImage from '../../public/images/weather_simplified.png';
import gradProjectImg from '../../public/images/BilgeAdam_Students.png';
import quoteImg from '../../public/images/quote_generator.png';
import carouselImg from '../../public/images/carousel_demo.png';
import surveyFormImg from '../../public/images/netflix-survey-form.png';
import contextImg from '../../public/images/context-api-todo-list.png';
import catAdoptImg from '../../public/images/cat-adoption.png';
import reduxPlaylistImg from '../../public/images/redux-tk-playlist.png';
import notesAppImg from '../../public/images/Notes-App.png';
import activityGenImg from '../../public/images/activity-generator.png';
import robotsImg from '../../public/images/generate-robots.png';
import shoppingImg from '../../public/images/shopping-list.png';
import userSearchImg from '../../public/images/GitHub-User-Search.png';
import photosAppImg from '../../public/images/Photos-App.png';
import pokeFilterImg from '../../public/images/poke-filter.png';
import bmiCalcImg from '../../public/images/bmi-calc.png';
import googleLandingImg from '../../public/images/google-landing-page.png';
import isletmecii from '../../public/images/isletmecii.png';

export type Project = {
  id: number;
  slug: string;
  name: string;
  year: string;
  category: string;
  url: string;
  gitUrl: string;
  image: StaticImageData;
  description: string;
  stack: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 17,
    slug: 'isletmecii-idler-game',
    name: 'İşletmecii - Idler Game',
    year: '2026',
    category: 'Game UI',
    url: 'https://idler-game.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/idler-game',
    image: isletmecii,
    featured: true,
    stack: ['Next.js', 'Tailwind CSS', 'Redux Toolkit'],
    description:
      'An idler clicker game where players manage a virtual business, earn money, hire employees, and upgrade facilities.',
  },
  {
    id: 1,
    slug: 'graduation-project',
    name: 'Graduation Project',
    year: '2024',
    category: 'Platform',
    url: 'https://graduation-project-flame.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/graduation-project',
    image: gradProjectImg,
    featured: true,
    stack: ['Next.js', 'React', 'Material UI', 'TypeScript'],
    description:
      'A platform showcasing BilgeAdam front-end development bootcamp graduates with profiles and gallery views.',
  },
  {
    id: 12,
    slug: 'github-user-search',
    name: 'GitHub User Search',
    year: '2024',
    category: 'API UI',
    url: 'https://github-user-search-lilac-kappa.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/githubUserSearch',
    image: userSearchImg,
    featured: true,
    stack: ['React', 'GitHub API', 'CSS'],
    description:
      'A GitHub search interface that displays user profiles, repositories, and account statistics from the GitHub API.',
  },
  {
    id: 0,
    slug: 'weather-simplified',
    name: 'Weather Simplified',
    year: '2023',
    category: 'Utility',
    url: 'https://ogiboy.github.io/weatherSimplified/',
    gitUrl: 'https://github.com/ogiboy/weatherSimplified',
    image: weatherImage,
    stack: ['HTML', 'CSS', 'JavaScript', 'Weather API'],
    description:
      'A clean weather application that displays current weather information through a focused JavaScript interface.',
  },
  {
    id: 2,
    slug: 'ataturk-quote-generator',
    name: 'Ataturk Quote Generator',
    year: '2023',
    category: 'Content App',
    url: 'https://quote-generator-with-ataturk.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/quoteGeneratorWithAtaturk',
    image: quoteImg,
    stack: ['React', 'CSS'],
    description:
      'A responsive quote generator featuring quotes from Mustafa Kemal Atatürk with a simple interaction model.',
  },
  {
    id: 3,
    slug: 'carousel-demo',
    name: 'Carousel Demo',
    year: '2023',
    category: 'Component',
    url: 'https://carouseldemoapp.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/carouseldemoapp',
    image: carouselImg,
    stack: ['Next.js', 'CSS'],
    description:
      'A modern image carousel component with smooth transitions, responsive layout, and reusable controls.',
  },
  {
    id: 4,
    slug: 'netflix-survey-form',
    name: 'Netflix Survey Form',
    year: '2022',
    category: 'Form UI',
    url: 'https://ogiboy.github.io/netflix-survey-form',
    gitUrl: 'https://github.com/ogiboy/netflix-survey-form',
    image: surveyFormImg,
    stack: ['HTML', 'CSS'],
    description:
      'A Netflix-inspired survey form with responsive structure, styled inputs, and custom dark-theme form elements.',
  },
  {
    id: 5,
    slug: 'context-api-todo-list',
    name: 'Context API Todo List',
    year: '2023',
    category: 'Productivity',
    url: 'https://context-api-todo-list.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/ContextApiTodoList',
    image: contextImg,
    stack: ['React', 'Context API', 'SCSS'],
    description:
      'A todo list application using React Context for state management and CRUD-style task interactions.',
  },
  {
    id: 6,
    slug: 'cat-adoption-form',
    name: 'Cat Adoption Form',
    year: '2023',
    category: 'Form Flow',
    url: 'https://cat-adoption-rose.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/catAdoption',
    image: catAdoptImg,
    stack: ['React', 'SCSS'],
    description:
      'A cat adoption application flow with multi-step form structure, validation, and responsive presentation.',
  },
  {
    id: 7,
    slug: 'redux-toolkit-playlist',
    name: 'Redux Toolkit Playlist',
    year: '2023',
    category: 'State UI',
    url: 'https://redux-tk-playlist.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/reduxTkPlaylist',
    image: reduxPlaylistImg,
    stack: ['React', 'Redux Toolkit'],
    description:
      'A playlist management application for creating and editing music playlists with a modern state-management flow.',
  },
  {
    id: 8,
    slug: 'take-notes-app',
    name: 'Take Notes App',
    year: '2023',
    category: 'Productivity',
    url: 'https://interview5-modal-notes-app-a4fq.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/Interview5ModalNotesApp',
    image: notesAppImg,
    stack: ['React', 'Modal UI', 'CSS'],
    description:
      'A note-taking application with modal interactions for creating, editing, and removing notes.',
  },
  {
    id: 9,
    slug: 'activity-generator',
    name: 'Activity Generator',
    year: '2023',
    category: 'API UI',
    url: 'https://interview3-activity-generator.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/interview3ActivityGenerator',
    image: activityGenImg,
    stack: ['React', 'External API', 'CSS'],
    description:
      'A random activity generator that suggests activities based on API-provided type, participants, and price data.',
  },
  {
    id: 10,
    slug: 'generate-robots',
    name: 'Generate Robots',
    year: '2023',
    category: 'Playground',
    url: 'https://interview2-generate-robots.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/Interview2GenerateRobots',
    image: robotsImg,
    stack: ['React', 'RoboHash API', 'CSS'],
    description:
      'A playful robot avatar generator that creates unique avatars using RoboHash and a colorful interface.',
  },
  {
    id: 11,
    slug: 'shopping-list',
    name: 'Shopping List',
    year: '2023',
    category: 'Utility',
    url: 'https://shopping-list-five-weld.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/shoppingList',
    image: shoppingImg,
    stack: ['React', 'Local Storage'],
    description:
      'A shopping list interface for adding, removing, and marking items with local persistence.',
  },
  {
    id: 13,
    slug: 'random-photos-app',
    name: 'Random Photos App',
    year: '2023',
    category: 'Gallery',
    url: 'https://photos-app-mu.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/photosApp',
    image: photosAppImg,
    stack: ['React', 'Photo API', 'CSS'],
    description:
      'A random photo gallery that fetches and displays responsive image grids with search-oriented UI patterns.',
  },
  {
    id: 14,
    slug: 'search-pokemons',
    name: 'Search Pokemons',
    year: '2023',
    category: 'Search UI',
    url: 'https://search-pokemons-two.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/searchPokemons',
    image: pokeFilterImg,
    stack: ['React', 'PokeAPI', 'CSS'],
    description:
      'A Pokémon search and filter interface backed by PokeAPI with a responsive card grid.',
  },
  {
    id: 15,
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    year: '2023',
    category: 'Calculator',
    url: 'https://react-bmi-calculator-three.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/reactBmiCalculator',
    image: bmiCalcImg,
    stack: ['React', 'CSS'],
    description:
      'A BMI calculator with immediate feedback, validation, and health status indicators.',
  },
  {
    id: 16,
    slug: 'google-landing-page',
    name: 'Google Landing Page',
    year: '2022',
    category: 'Clone',
    url: 'https://ogiboy.github.io/google-landing-page/',
    gitUrl: 'https://github.com/ogiboy/google-landing-page',
    image: googleLandingImg,
    stack: ['HTML', 'CSS'],
    description:
      'A responsive clone of the Google homepage focused on layout precision and visual recreation.',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
