import type { StaticImageData } from 'next/image'

import weatherImage from '/public/images/weather_simplified.png'
import gradProjectImg from '/public/images/BilgeAdam_Students.png'
import quoteImg from '/public/images/quote_generator.png'
import carouselImg from '/public/images/carousel_demo.png'
import surveyFormImg from '/public/images/netflix-survey-form.png'
import contextImg from '/public/images/context-api-todo-list.png'
import catAdoptImg from '/public/images/cat-adoption.png'
import reduxPlaylistImg from '/public/images/redux-tk-playlist.png'
import notesAppImg from '/public/images/Notes-App.png'
import activityGenImg from '/public/images/activity-generator.png'
import robotsImg from '/public/images/generate-robots.png'
import shoppingImg from '/public/images/shopping-list.png'
import userSearchImg from '/public/images/GitHub-User-Search.png'
import photosAppImg from '/public/images/Photos-App.png'
import pokeFilterImg from '/public/images/poke-filter.png'
import bmiCalcImg from '/public/images/bmi-calc.png'
import googleLandingImg from '/public/images/google-landing-page.png'
import isletmecii from '/public/images/isletmecii.png'

interface Project {
  id: number
  name: string
  url: string
  gitUrl: string
  image: StaticImageData
  description: string
}

const someProjects: Project[] = [
  {
    id: 17,
    name: 'İşletmecii - Idler Game',
    url: 'https://idler-game.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/idler-game',
    image: isletmecii,
    description:
      'An idler clicker style game built with Next.js, TailwindCSS and Redux Toolkit. Players can manage a virtual business, earn money, hire employees and upgrade facilities.',
  },
  {
    id: 0,
    name: 'Weather Simplified',
    url: 'https://ogiboy.github.io/weatherSimplified/',
    gitUrl: 'https://github.com/ogiboy/weatherSimplified',
    image: weatherImage,
    description:
      'A weather application built with HTML, CSS, and JavaScript that provides current weather information. Features a clean interface and uses a weather API to display real-time weather data.',
  },
  {
    id: 1,
    name: 'Graduation Project',
    url: 'https://graduation-project-flame.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/graduation-project',
    image: gradProjectImg,
    description:
      'A platform showcasing BilgeAdam front-end development bootcamp graduates. Built with Next.js, React, Material UI, and TypeScript, featuring a gallery of students with their profiles.',
  },
  {
    id: 2,
    name: 'Ataturk Quote Generator',
    url: 'https://quote-generator-with-ataturk.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/quoteGeneratorWithAtaturk',
    image: quoteImg,
    description:
      'A quote generator application built with React featuring quotes from Mustafa Kemal Atatürk. Users can generate random quotes with a clean and responsive interface.',
  },
  {
    id: 3,
    name: 'Carousel Demo',
    url: 'https://carouseldemoapp.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/carouseldemoapp',
    image: carouselImg,
    description:
      'A modern image carousel component built with Next.js and CSS. Features smooth transitions, responsive design, and customizable controls.',
  },
  {
    id: 4,
    name: 'Netflix Survey Form',
    url: 'https://ogiboy.github.io/netflix-survey-form',
    gitUrl: 'https://github.com/ogiboy/netflix-survey-form',
    image: surveyFormImg,
    description:
      'A Netflix-inspired survey form built with HTML and CSS. Features a responsive design with custom form elements and a dark theme.',
  },
  {
    id: 5,
    name: 'Context API Todo List',
    url: 'https://context-api-todo-list.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/ContextApiTodoList',
    image: contextImg,
    description:
      'A todo list application built with React and Context API for state management. Features CRUD operations for tasks with a clean SCSS-styled interface.',
  },
  {
    id: 6,
    name: 'Cat Adoption Form',
    url: 'https://cat-adoption-rose.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/catAdoption',
    image: catAdoptImg,
    description:
      'A cat adoption application form built with React and SCSS. Features a multi-step form process with validation and a responsive design.',
  },
  {
    id: 7,
    name: 'Redux Toolkit Playlist',
    url: 'https://redux-tk-playlist.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/reduxTkPlaylist',
    image: reduxPlaylistImg,
    description:
      'A playlist management application built with React and Redux Toolkit. Users can create and manage music playlists with a modern interface.',
  },
  {
    id: 8,
    name: 'Take Notes App',
    url: 'https://interview5-modal-notes-app-a4fq.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/Interview5ModalNotesApp',
    image: notesAppImg,
    description:
      'A note-taking application built with React featuring a modal interface. Users can create, edit, and delete notes with a simple and intuitive design.',
  },
  {
    id: 9,
    name: 'Activity Generator',
    url: 'https://interview3-activity-generator.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/interview3ActivityGenerator',
    image: activityGenImg,
    description:
      'A random activity generator app built with React and CSS. Uses an external API to suggest activities based on type, participants, and price range.',
  },
  {
    id: 10,
    name: 'Generate Robots',
    url: 'https://interview2-generate-robots.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/Interview2GenerateRobots',
    image: robotsImg,
    description:
      'A fun robot avatar generator built with React and CSS. Creates unique robot avatars using RoboHash API with a colorful and playful interface.',
  },
  {
    id: 11,
    name: 'Shopping List',
    url: 'https://shopping-list-five-weld.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/shoppingList',
    image: shoppingImg,
    description:
      'A shopping list application built with React. Features include adding and removing items, marking items as completed, and local storage persistence.',
  },
  {
    id: 12,
    name: 'GitHub User Search',
    url: 'https://github-user-search-lilac-kappa.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/githubUserSearch',
    image: userSearchImg,
    description:
      'A GitHub user search application built with React. Uses the GitHub API to search and display user profiles with their repositories and stats.',
  },
  {
    id: 13,
    name: 'Random Photos App',
    url: 'https://photos-app-mu.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/photosApp',
    image: photosAppImg,
    description:
      'A random photo gallery application built with React. Fetches and displays random photos from an API with a responsive grid layout and search functionality.',
  },
  {
    id: 14,
    name: 'Search Pokemons',
    url: 'https://search-pokemons-two.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/searchPokemons',
    image: pokeFilterImg,
    description:
      'A Pokemon search application built with React. Features filtering and searching Pokemon by name using the PokeAPI with a responsive grid display.',
  },
  {
    id: 15,
    name: 'BMI Calculator',
    url: 'https://react-bmi-calculator-three.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/reactBmiCalculator',
    image: bmiCalcImg,
    description:
      'A Body Mass Index (BMI) calculator built with React. Provides instant BMI calculations with input validation and health status indicators.',
  },
  {
    id: 16,
    name: 'Google Landing Page',
    url: 'https://ogiboy.github.io/google-landing-page/',
    gitUrl: 'https://github.com/ogiboy/google-landing-page',
    image: googleLandingImg,
    description:
      "A clone of the Google homepage built with HTML and CSS. Features responsive design and pixel-perfect recreation of Google's search interface.",
  },
]

export default someProjects
