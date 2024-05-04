interface Project {
  id: number
  name: string
  url: string
  gitUrl: string
  image: string
  description: string
}

const someProjects: Project[] = [
  {
    id: 0,
    name: 'Weather Simplified',
    url: 'https://ogiboy.github.io/weatherSimplified/',
    gitUrl: 'https://github.com/ogiboy/weatherSimplified',
    image: '/images/weather_simplified.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 1,
    name: 'Graduation Project',
    url: 'https://graduation-project-flame.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/graduation-project',
    image: '/images/BilgeAdam_Students.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 2,
    name: 'Ataturk Quote Generator',
    url: 'https://quote-generator-with-ataturk.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/quoteGeneratorWithAtaturk',
    image: '/images/quote_generator.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 3,
    name: 'Carousel Demo',
    url: 'https://carouseldemoapp.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/carouseldemoapp',
    image: '/images/carousel_demo.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 4,
    name: 'Netflix Survey Form',
    url: 'https://ogiboy.github.io/netflix-survey-form',
    gitUrl: 'https://github.com/ogiboy/netflix-survey-form',
    image: '/images/netflix-survey-form.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 5,
    name: 'Context API Todo List',
    url: 'https://context-api-todo-list.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/ContextApiTodoList',
    image: '/images/context-api-todo-list.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 6,
    name: 'Cat Adoption Form',
    url: 'https://cat-adoption-rose.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/catAdoption',
    image: '/images/cat-adoption.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 7,
    name: 'Redux Toolkit Playlist',
    url: 'https://redux-tk-playlist.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/reduxTkPlaylist',
    image: '/images/redux-tk-playlist.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 8,
    name: 'Take Notes App',
    url: 'https://interview5-modal-notes-app-a4fq.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/Interview5ModalNotesApp',
    image: '/images/Notes-App.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 9,
    name: 'Activity Generator',
    url: 'https://interview3-activity-generator.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/interview3ActivityGenerator',
    image: '/images/activity-generator.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 10,
    name: 'Generate Robots',
    url: 'https://interview2-generate-robots.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/Interview2GenerateRobots',
    image: '/images/generate-robots.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 11,
    name: 'Shopping List',
    url: 'https://shopping-list-five-weld.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/shoppingList',
    image: '/images/shopping-list.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 12,
    name: 'GitHub User Search',
    url: 'https://github-user-search-lilac-kappa.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/githubUserSearch',
    image: '/images/GitHub-User-Search.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 13,
    name: 'Random Photos App',
    url: 'https://photos-app-mu.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/photosApp',
    image: '/images/Photos-App.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 14,
    name: 'Search Pokemons',
    url: 'https://search-pokemons-two.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/searchPokemons',
    image: '/images/poke-filter.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 15,
    name: 'BMI Calculator',
    url: 'https://react-bmi-calculator-three.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/reactBmiCalculator',
    image: '/images/bmi-calc.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
  {
    id: 16,
    name: 'Google Landing Page',
    url: 'https://ogiboy.github.io/google-landing-page/',
    gitUrl: 'https://github.com/ogiboy/google-landing-page',
    image: '/images/google-landing-page.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
  },
]

export default someProjects
