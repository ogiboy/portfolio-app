import Card from '@/components/Card'

interface Project {
  id: number
  name: string
  url: string
  gitUrl: string
  image: string
  description: string
}

const Projects: React.FC = () => {
  const someProjects: Project[] = [
    {
      id: 0,
      name: 'Weather Simplified',
      url: 'https://ogiboy.github.io/weatherSimplified/',
      gitUrl: 'https://github.com/ogiboy/weatherSimplified',
      image: 'https://picsum.photos/200/300',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
    },
    {
      id: 1,
      name: 'Graduation Project',
      url: 'https://graduation-project-flame.vercel.app/',
      gitUrl: 'https://github.com/ogiboy/graduation-project',
      image: 'https://picsum.photos/200/300',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
    },
    {
      id: 2,
      name: 'Ataturk Quote Generator',
      url: 'https://quote-generator-with-ataturk.vercel.app/',
      gitUrl: 'https://github.com/ogiboy/quoteGeneratorWithAtaturk',
      image: 'https://picsum.photos/200/300',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
    },
    {
      id: 3,
      name: 'Carousel Demo',
      url: 'https://carouseldemoapp.vercel.app/',
      gitUrl: 'https://github.com/ogiboy/carouseldemoapp',
      image: 'https://picsum.photos/200/300',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
    },
    {
      id: 4,
      name: 'Netflix Survey Form',
      url: 'https://ogiboy.github.io/netflix-survey-form',
      gitUrl: 'https://github.com/ogiboy/netflix-survey-form',
      image: 'https://picsum.photos/200/300',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
    },
    {
      id: 5,
      name: 'Context API Todo List',
      url: 'https://context-api-todo-list.vercel.app/',
      gitUrl: 'https://github.com/ogiboy/ContextApiTodoList',
      image: 'https://picsum.photos/200/300',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
    },
    {
      id: 5,
      name: 'Cat Adoption Form',
      url: 'https://cat-adoption-rose.vercel.app/',
      gitUrl: 'https://github.com/ogiboy/catAdoption',
      image: 'https://picsum.photos/200/300',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
    },
    {
      id: 6,
      name: 'Redux Toolkit Playlist',
      url: 'https://redux-tk-playlist.vercel.app/',
      gitUrl: 'https://github.com/ogiboy/reduxTkPlaylist',
      image: 'https://picsum.photos/200/300',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
    },
    {
      id: 7,
      name: 'Take Notes App',
      url: 'https://interview5-modal-notes-app-a4fq.vercel.app/',
      gitUrl: 'https://github.com/ogiboy/Interview5ModalNotesApp',
      image: 'https://picsum.photos/200/300',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
    },
    {
      id: 8,
      name: 'Activity Generator',
      url: 'https://interview3-activity-generator.vercel.app/',
      gitUrl: 'https://github.com/ogiboy/interview3ActivityGenerator',
      image: 'https://picsum.photos/200/300',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
    },
    {
      id: 9,
      name: 'Generate Robots',
      url: 'https://interview2-generate-robots.vercel.app/',
      gitUrl: 'https://github.com/ogiboy/Interview2GenerateRobots',
      image: 'https://picsum.photos/200/300',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
    },
    {
      id: 10,
      name: 'Shopping List',
      url: 'https://shopping-list-five-weld.vercel.app/',
      gitUrl: 'https://github.com/ogiboy/shoppingList',
      image: 'https://picsum.photos/200/300',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
    },
    {
      id: 11,
      name: 'GitHub User Search',
      url: 'https://github-user-search-lilac-kappa.vercel.app/',
      gitUrl: 'https://github.com/ogiboy/githubUserSearch',
      image: 'https://picsum.photos/200/300',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
    },
    {
      id: 12,
      name: 'Random Photos App',
      url: 'https://photos-app-mu.vercel.app/',
      gitUrl: 'https://github.com/ogiboy/photosApp',
      image: 'https://picsum.photos/200/300',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
    },
    {
      id: 13,
      name: 'Search Pokemons',
      url: 'https://search-pokemons-two.vercel.app/',
      gitUrl: 'https://github.com/ogiboy/searchPokemons',
      image: 'https://picsum.photos/200/300',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
    },
    {
      id: 14,
      name: 'BMI Calculator',
      url: 'https://react-bmi-calculator-three.vercel.app/',
      gitUrl: 'https://github.com/ogiboy/reactBmiCalculator',
      image: 'https://picsum.photos/200/300',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
    },
    {
      id: 15,
      name: 'Google Landing Page',
      url: 'https://ogiboy.github.io/google-landing-page/',
      gitUrl: 'https://github.com/ogiboy/google-landing-page',
      image: 'https://picsum.photos/200/300',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem esse magni, perspiciatis alias eaque asperiores recusandae in consequuntur possimus reprehenderit repellat voluptatum iusto quidem molestias maiores, incidunt eveniet non?',
    },
  ]

  return (
    <div className="w-screen h-full text-center text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700">
      <h1>Projects</h1>
      <div className="flex flex-wrap items-center justify-evenly w-full h-full">
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
      </div>
    </div>
  )
}
export default Projects
