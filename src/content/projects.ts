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

export const projects: Project[] = [
  {
    id: 17,
    slug: 'isletmecii-idler-game',
    name: 'İşletmecii - Idler Game',
    year: '2026',
    category: 'Game UI',
    categoryTr: 'Oyun Arayüzü',
    url: 'https://idler-game.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/idler-game',
    image: isletmecii,
    featured: true,
    stack: ['Next.js', 'Tailwind CSS', 'Redux Toolkit'],
    description:
      'An idle-management game where players grow a virtual business by earning money, hiring employees, and upgrading facilities.',
    descriptionTr:
      'Oyuncuların para kazanıp çalışan işe alarak ve tesisleri geliştirerek sanal bir işletmeyi büyüttüğü idle yönetim oyunu.',
  },
  {
    id: 1,
    slug: 'graduation-project',
    name: 'Graduation Project',
    year: '2024',
    category: 'Platform',
    categoryTr: 'Platform',
    url: 'https://graduation-project-flame.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/graduation-project',
    image: gradProjectImg,
    featured: true,
    stack: ['Next.js', 'React', 'Material UI', 'TypeScript'],
    description:
      'A graduate showcase for the BilgeAdam front-end development bootcamp, with profile and gallery views.',
    descriptionTr:
      'BilgeAdam front-end development bootcamp mezunlarını profil ve galeri görünümleriyle sergileyen platform.',
  },
  {
    id: 12,
    slug: 'github-user-search',
    name: 'GitHub User Search',
    year: '2024',
    category: 'API UI',
    categoryTr: 'API Arayüzü',
    url: 'https://github-user-search-lilac-kappa.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/githubUserSearch',
    image: userSearchImg,
    featured: true,
    stack: ['React', 'GitHub API', 'CSS'],
    description:
      'A GitHub API interface for searching users and viewing their profiles, repositories, and account statistics.',
    descriptionTr:
      'Kullanıcı aramak ve profil, repository ve hesap istatistiklerini görüntülemek için GitHub API arayüzü.',
  },
  {
    id: 0,
    slug: 'weather-simplified',
    name: 'Weather Simplified',
    year: '2023',
    category: 'Utility',
    categoryTr: 'Araç',
    url: 'https://ogiboy.github.io/weatherSimplified/',
    gitUrl: 'https://github.com/ogiboy/weatherSimplified',
    image: weatherImage,
    stack: ['HTML', 'CSS', 'JavaScript', 'Weather API'],
    description:
      'A JavaScript weather interface that retrieves and displays current weather information.',
    descriptionTr: 'Güncel hava durumu bilgisini alıp gösteren JavaScript arayüzü.',
  },
  {
    id: 2,
    slug: 'ataturk-quote-generator',
    name: 'Ataturk Quote Generator',
    year: '2023',
    category: 'Content App',
    categoryTr: 'İçerik Uygulaması',
    url: 'https://quote-generator-with-ataturk.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/quoteGeneratorWithAtaturk',
    image: quoteImg,
    stack: ['React', 'CSS'],
    description: 'A React interface that displays quotations attributed to Mustafa Kemal Atatürk.',
    descriptionTr: 'Mustafa Kemal Atatürk’e atfedilen sözleri gösteren React arayüzü.',
  },
  {
    id: 3,
    slug: 'carousel-demo',
    name: 'Carousel Demo',
    year: '2023',
    category: 'Component',
    categoryTr: 'Bileşen',
    url: 'https://carouseldemoapp.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/carouseldemoapp',
    image: carouselImg,
    stack: ['Next.js', 'CSS'],
    description:
      'A responsive image carousel demonstrating transition behavior and reusable controls.',
    descriptionTr:
      'Geçiş davranışını ve tekrar kullanılabilir kontrolleri gösteren responsive görsel carousel’i.',
  },
  {
    id: 4,
    slug: 'netflix-survey-form',
    name: 'Netflix Survey Form',
    year: '2022',
    category: 'Form UI',
    categoryTr: 'Form Arayüzü',
    url: 'https://ogiboy.github.io/netflix-survey-form',
    gitUrl: 'https://github.com/ogiboy/netflix-survey-form',
    image: surveyFormImg,
    stack: ['HTML', 'CSS'],
    description: 'A Netflix-inspired survey form with responsive fields and dark-theme styling.',
    descriptionTr: 'Responsive alanlara ve koyu tema stiline sahip Netflix esintili anket formu.',
  },
  {
    id: 5,
    slug: 'context-api-todo-list',
    name: 'Context API Todo List',
    year: '2023',
    category: 'Productivity',
    categoryTr: 'Üretkenlik',
    url: 'https://context-api-todo-list.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/ContextApiTodoList',
    image: contextImg,
    stack: ['React', 'Context API', 'SCSS'],
    description:
      'A React todo list using Context API for task state and create, update, and delete interactions.',
    descriptionTr:
      'Görev durumunu ve oluşturma, güncelleme, silme işlemlerini Context API ile yöneten React todo listesi.',
  },
  {
    id: 6,
    slug: 'cat-adoption-form',
    name: 'Cat Adoption Form',
    year: '2023',
    category: 'Form Flow',
    categoryTr: 'Form Akışı',
    url: 'https://cat-adoption-rose.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/catAdoption',
    image: catAdoptImg,
    stack: ['React', 'SCSS'],
    description: 'A multi-step cat adoption form with validation and responsive presentation.',
    descriptionTr: 'Validasyon ve responsive sunuma sahip çok adımlı kedi sahiplenme formu.',
  },
  {
    id: 7,
    slug: 'redux-toolkit-playlist',
    name: 'Redux Toolkit Playlist',
    year: '2023',
    category: 'State UI',
    categoryTr: 'Durum Arayüzü',
    url: 'https://redux-tk-playlist.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/reduxTkPlaylist',
    image: reduxPlaylistImg,
    stack: ['React', 'Redux Toolkit'],
    description:
      'A React playlist interface for creating and editing music playlists with Redux Toolkit state management.',
    descriptionTr:
      'Redux Toolkit durum yönetimiyle müzik listeleri oluşturup düzenleyen React arayüzü.',
  },
  {
    id: 8,
    slug: 'take-notes-app',
    name: 'Take Notes App',
    year: '2023',
    category: 'Productivity',
    categoryTr: 'Üretkenlik',
    url: 'https://interview5-modal-notes-app-a4fq.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/Interview5ModalNotesApp',
    image: notesAppImg,
    stack: ['React', 'Modal UI', 'CSS'],
    description: 'A notes interface with modal flows for creating, editing, and removing notes.',
    descriptionTr:
      'Not oluşturma, düzenleme ve silme işlemleri için modal akışlar kullanan not uygulaması.',
  },
  {
    id: 9,
    slug: 'activity-generator',
    name: 'Activity Generator',
    year: '2023',
    category: 'API UI',
    categoryTr: 'API Arayüzü',
    url: 'https://interview3-activity-generator.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/interview3ActivityGenerator',
    image: activityGenImg,
    stack: ['React', 'External API', 'CSS'],
    description:
      'A React interface that requests activity suggestions from an external API using type, participant, and price data.',
    descriptionTr:
      'Tür, katılımcı ve fiyat verilerini kullanarak harici API’den etkinlik önerileri alan React arayüzü.',
  },
  {
    id: 10,
    slug: 'generate-robots',
    name: 'Generate Robots',
    year: '2023',
    category: 'Playground',
    categoryTr: 'Deney Alanı',
    url: 'https://interview2-generate-robots.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/Interview2GenerateRobots',
    image: robotsImg,
    stack: ['React', 'RoboHash API', 'CSS'],
    description: 'A React avatar generator that requests robot images from the RoboHash API.',
    descriptionTr: 'RoboHash API’den robot görselleri isteyen React avatar oluşturucu.',
  },
  {
    id: 11,
    slug: 'shopping-list',
    name: 'Shopping List',
    year: '2023',
    category: 'Utility',
    categoryTr: 'Araç',
    url: 'https://shopping-list-five-weld.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/shoppingList',
    image: shoppingImg,
    stack: ['React', 'Local Storage'],
    description:
      'A React shopping list with local-storage persistence for adding, removing, and marking items.',
    descriptionTr:
      'Ürün ekleme, silme ve işaretleme işlemlerini local storage ile koruyan React alışveriş listesi.',
  },
  {
    id: 13,
    slug: 'random-photos-app',
    name: 'Random Photos App',
    year: '2023',
    category: 'Gallery',
    categoryTr: 'Galeri',
    url: 'https://photos-app-mu.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/photosApp',
    image: photosAppImg,
    stack: ['React', 'Photo API', 'CSS'],
    description:
      'A React photo gallery that retrieves images from an external API and displays them in a grid.',
    descriptionTr: 'Harici API’den görseller alıp grid içinde gösteren React fotoğraf galerisi.',
  },
  {
    id: 14,
    slug: 'search-pokemons',
    name: 'Search Pokemons',
    year: '2023',
    category: 'Search UI',
    categoryTr: 'Arama Arayüzü',
    url: 'https://search-pokemons-two.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/searchPokemons',
    image: pokeFilterImg,
    stack: ['React', 'PokeAPI', 'CSS'],
    description:
      'A Pokémon search and filter interface backed by PokeAPI with a responsive card grid.',
    descriptionTr: 'PokeAPI kullanan Pokémon arama ve filtreleme arayüzü.',
  },
  {
    id: 15,
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    year: '2023',
    category: 'Calculator',
    categoryTr: 'Hesaplayıcı',
    url: 'https://react-bmi-calculator-three.vercel.app/',
    gitUrl: 'https://github.com/ogiboy/reactBmiCalculator',
    image: bmiCalcImg,
    stack: ['React', 'CSS'],
    description:
      'A React BMI calculator with input validation and calculated health-status categories.',
    descriptionTr:
      'Girdi doğrulaması ve hesaplanan sağlık durumu kategorileri bulunan React BMI hesaplayıcı.',
  },
  {
    id: 16,
    slug: 'google-landing-page',
    name: 'Google Landing Page',
    year: '2022',
    category: 'Clone',
    categoryTr: 'Yeniden Üretim',
    url: 'https://ogiboy.github.io/google-landing-page/',
    gitUrl: 'https://github.com/ogiboy/google-landing-page',
    image: googleLandingImg,
    stack: ['HTML', 'CSS'],
    description:
      'A responsive recreation of the Google homepage focused on layout and CSS implementation.',
    descriptionTr:
      'Google ana sayfasının yerleşim ve CSS uygulamasına odaklanan responsive yeniden üretimi.',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectCategory(project: Project, locale: 'en' | 'tr') {
  return locale === 'tr' ? project.categoryTr : project.category;
}

export function getProjectDescription(project: Project, locale: 'en' | 'tr') {
  return locale === 'tr' ? project.descriptionTr : project.description;
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}

export function getProjectPosition(slug: string): ProjectPosition | undefined {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return undefined;

  return {
    current: index + 1,
    total: projects.length,
  };
}

export function formatProjectPosition({ current, total }: ProjectPosition) {
  const width = String(total).length;
  return `${String(current).padStart(width, '0')} / ${total}`;
}
