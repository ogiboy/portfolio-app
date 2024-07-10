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
      'An idler clicker style game with next.js tailwindcss reduxtoolkit',
  },
  {
    id: 0,
    name: 'Weather Simplified',
    url: 'https://ogiboy.github.io/weatherSimplified/',
    gitUrl: 'https://github.com/ogiboy/weatherSimplified',
    image: weatherImage,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 1,
    name: 'Graduation Project',
    url: 'https://graduation-project-flame.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/graduation-project',
    image: gradProjectImg,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 2,
    name: 'Ataturk Quote Generator',
    url: 'https://quote-generator-with-ataturk.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/quoteGeneratorWithAtaturk',
    image: quoteImg,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 3,
    name: 'Carousel Demo',
    url: 'https://carouseldemoapp.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/carouseldemoapp',
    image: carouselImg,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 4,
    name: 'Netflix Survey Form',
    url: 'https://ogiboy.github.io/netflix-survey-form',
    gitUrl: 'https://github.com/ogiboy/netflix-survey-form',
    image: surveyFormImg,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 5,
    name: 'Context API Todo List',
    url: 'https://context-api-todo-list.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/ContextApiTodoList',
    image: contextImg,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 6,
    name: 'Cat Adoption Form',
    url: 'https://cat-adoption-rose.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/catAdoption',
    image: catAdoptImg,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 7,
    name: 'Redux Toolkit Playlist',
    url: 'https://redux-tk-playlist.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/reduxTkPlaylist',
    image: reduxPlaylistImg,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 8,
    name: 'Take Notes App',
    url: 'https://interview5-modal-notes-app-a4fq.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/Interview5ModalNotesApp',
    image: notesAppImg,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 9,
    name: 'Activity Generator',
    url: 'https://interview3-activity-generator.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/interview3ActivityGenerator',
    image: activityGenImg,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 10,
    name: 'Generate Robots',
    url: 'https://interview2-generate-robots.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/Interview2GenerateRobots',
    image: robotsImg,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 11,
    name: 'Shopping List',
    url: 'https://shopping-list-five-weld.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/shoppingList',
    image: shoppingImg,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 12,
    name: 'GitHub User Search',
    url: 'https://github-user-search-lilac-kappa.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/githubUserSearch',
    image: userSearchImg,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 13,
    name: 'Random Photos App',
    url: 'https://photos-app-mu.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/photosApp',
    image: photosAppImg,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 14,
    name: 'Search Pokemons',
    url: 'https://search-pokemons-two.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/searchPokemons',
    image: pokeFilterImg,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 15,
    name: 'BMI Calculator',
    url: 'https://react-bmi-calculator-three.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/reactBmiCalculator',
    image: bmiCalcImg,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 16,
    name: 'Google Landing Page',
    url: 'https://ogiboy.github.io/google-landing-page/',
    gitUrl: 'https://github.com/ogiboy/google-landing-page',
    image: googleLandingImg,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
]

export default someProjects
