import type { routing } from '@/i18n/routing';

export type Locale = (typeof routing.locales)[number];

type LocalizedCopy<T> = Record<Locale, T>;

export const contact = {
  email: 'oguzcantoptas@gmail.com',
  github: 'https://github.com/ogiboy',
  linkedin: 'https://www.linkedin.com/in/hoguzcantoptas/',
  resume: '/myResume.pdf',
};

export const siteCopy: LocalizedCopy<{
  nav: {
    home: string;
    projects: string;
    lab: string;
    process: string;
    contact: string;
    language: string;
  };
  home: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    stackLabel: string;
    stackNote: string;
    proof: string[];
    servicesTitle: string;
    servicesIntro: string;
    services: Array<{ title: string; body: string }>;
    selectedTitle: string;
    selectedIntro: string;
    processTitle: string;
    processIntro: string;
    process: Array<{ title: string; body: string }>;
    motionTitle: string;
    motionIntro: string;
    contactTitle: string;
    contactIntro: string;
  };
  projects: {
    title: string;
    intro: string;
    archiveLabel: string;
    featuredLabel: string;
    live: string;
    code: string;
    caseLabel: string;
    back: string;
    nextProject: string;
    yearLabel: string;
    stackLabel: string;
  };
  lab: {
    eyebrow: string;
    title: string;
    intro: string;
    launchLabel: string;
    openLabel: string;
    frameTitle: string;
    frameIntro: string;
    idleTitle: string;
    idleBody: string;
    specsTitle: string;
    specsIntro: string;
    specs: Array<{ title: string; body: string }>;
    qaTitle: string;
    qa: string[];
    back: string;
  };
  footer: {
    line: string;
  };
}> = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      lab: 'Lab',
      process: 'Process',
      contact: 'Contact',
      language: 'TR',
    },
    home: {
      eyebrow: 'Independent frontend systems / Istanbul',
      title: 'I build sharp web interfaces that turn rough product ideas into usable launches.',
      subtitle:
        'Brutalist clarity, production-grade Next.js, and the discipline to ship fast without making the codebase brittle.',
      primaryCta: 'Start a project',
      secondaryCta: 'See the archive',
      stackLabel: 'Operating stack',
      stackNote:
        'No ornamental dashboards. No anonymous template energy. A public surface that explains why the work should be trusted.',
      proof: ['Next.js', 'React', 'TypeScript', 'Design systems', 'Motion', 'Vercel'],
      servicesTitle: 'What clients usually need',
      servicesIntro:
        'A clear site, a reliable interface, and someone who can move from concept to shipped product without hand-waving the details.',
      services: [
        {
          title: 'Portfolio and launch sites',
          body: 'High-contrast public pages that explain the offer, show proof, and make the next step obvious.',
        },
        {
          title: 'Frontend rebuilds',
          body: 'Modern App Router architecture, typed content, accessible primitives, and CI gates that keep the surface stable.',
        },
        {
          title: 'Interface polish',
          body: 'Motion, layout, copy structure, and responsive details that make a product feel intentional instead of assembled.',
        },
      ],
      selectedTitle: 'Selected work, not a template grid',
      selectedIntro:
        'Every project stays in the archive, but the strongest pieces get room to explain the problem, stack, and outcome.',
      processTitle: 'A practical build rhythm',
      processIntro:
        'The process is built around visible decisions, tight scopes, and proof before release.',
      process: [
        {
          title: 'Frame',
          body: 'Define audience, conversion path, constraints, and what should not be built.',
        },
        {
          title: 'Shape',
          body: 'Turn the brief into routes, content models, tokens, components, and motion boundaries.',
        },
        {
          title: 'Ship',
          body: 'Commit in slices, verify with CI, review in browser, and release with notes.',
        },
      ],
      motionTitle: 'Motion has a job',
      motionIntro:
        'Pinned and scrubbed moments guide attention. Reduced-motion users get the same content without the cinematic layer.',
      contactTitle: 'Have a messy idea that needs a clean launch?',
      contactIntro:
        'Send the product, portfolio, or landing-page problem. I will help turn it into a buildable scope.',
    },
    projects: {
      title: 'Project archive',
      intro:
        'A complete archive of shipped experiments, bootcamp work, product interfaces, and playful apps. The archive stays complete; the case-study layer keeps improving.',
      archiveLabel: 'Archive',
      featuredLabel: 'Featured',
      live: 'Live',
      code: 'Code',
      caseLabel: 'Case',
      back: 'Back to projects',
      nextProject: 'Next project',
      yearLabel: 'Year',
      stackLabel: 'Stack',
    },
    lab: {
      eyebrow: 'Live lab / WASM',
      title: 'Retro Game Center boots DOOM Shareware inside the portfolio.',
      intro:
        'A scoped live demo from home-media-portal: DOSBox-X for Web, a curated ROM manifest, and a lazy iframe shell that keeps the public homepage light.',
      launchLabel: 'Boot demo',
      openLabel: 'Open tab',
      frameTitle: 'DOSBox-X runtime',
      frameIntro:
        'The engine is loaded only after interaction. WASM, ROM files, and emulator scripts stay behind the lab route.',
      idleTitle: 'DOS runtime is staged, not loaded.',
      idleBody:
        'Press boot to load the WASM engine, ROM manifest, and emulator assets inside the isolated frame.',
      specsTitle: 'Why this belongs in a portfolio',
      specsIntro:
        'This is not a toy embed. It shows how heavy browser runtimes can be scoped, cached, and presented without damaging the main site.',
      specs: [
        {
          title: 'Isolated payload',
          body: 'The 16 MB runtime lives under /wasm and does not load from the home route or project archive.',
        },
        {
          title: 'Narrow asset server',
          body: 'A route handler serves WASM, ROM, and engine files with explicit MIME types and cache headers.',
        },
        {
          title: 'No backend dependency',
          body: 'Scores, saves, auth, and admin tooling stay out of v0.2.0 until they become real product requirements.',
        },
      ],
      qaTitle: 'Current guardrails',
      qa: [
        'Sandboxed iframe with explicit permissions for scripts, pointer lock, downloads, fullscreen, and gamepad without same-origin escape.',
        'Shareware ROM manifest copied as static assets after size review.',
        'External vendor scripts are contained inside the engine frame and documented for future self-hosting.',
      ],
      back: 'Back to home',
    },
    footer: {
      line: 'Built with Next.js, shadcn primitives, GSAP, and a strict no-template rule.',
    },
  },
  tr: {
    nav: {
      home: 'Ana sayfa',
      projects: 'Projeler',
      lab: 'Lab',
      process: 'Süreç',
      contact: 'İletişim',
      language: 'EN',
    },
    home: {
      eyebrow: 'Bağımsız frontend sistemleri / İstanbul',
      title:
        'Ham ürün fikirlerini kullanılabilir lansmanlara dönüştüren keskin web arayüzleri kuruyorum.',
      subtitle:
        'Brutalist netlik, production seviyesinde Next.js ve kod tabanını kırılganlaştırmadan hızlı teslim disiplini.',
      primaryCta: 'Proje başlat',
      secondaryCta: 'Arşivi gör',
      stackLabel: 'Çalışma stacki',
      stackNote:
        'Süs dashboard yok. Anonim template hissi yok. İşin neden güvenilir olduğunu anlatan public bir yüzey var.',
      proof: ['Next.js', 'React', 'TypeScript', 'Tasarım sistemleri', 'Motion', 'Vercel'],
      servicesTitle: 'Müşterilerin genelde ihtiyacı olan şey',
      servicesIntro:
        'Net bir site, güvenilir bir arayüz ve fikri soyut konuşmadan yayına alınmış ürüne taşıyan uygulama disiplini.',
      services: [
        {
          title: 'Portfolyo ve lansman siteleri',
          body: 'Teklifi anlatan, kanıt gösteren ve bir sonraki adımı belirgin yapan yüksek kontrastlı public sayfalar.',
        },
        {
          title: 'Frontend rebuild işleri',
          body: 'Modern App Router mimarisi, typed içerik, erişilebilir primitives ve yüzeyi stabil tutan CI kapıları.',
        },
        {
          title: 'Arayüz parlatma',
          body: 'Ürünün toplama değil bilinçli hissettirmesi için motion, layout, copy yapısı ve responsive detaylar.',
        },
      ],
      selectedTitle: 'Template grid değil, seçilmiş işler',
      selectedIntro:
        'Her proje arşivde kalır; güçlü işler problem, stack ve sonuç anlatımı için daha fazla alan kazanır.',
      processTitle: 'Pratik bir build ritmi',
      processIntro: 'Süreç görünür kararlar, dar kapsamlar ve release öncesi kanıt üzerine kurulu.',
      process: [
        {
          title: 'Çerçevele',
          body: 'Kitleyi, dönüşüm yolunu, sınırları ve özellikle yapılmayacak işleri netleştir.',
        },
        {
          title: 'Şekillendir',
          body: 'Briefi route, içerik modeli, token, component ve motion sınırlarına çevir.',
        },
        {
          title: 'Yayınla',
          body: 'Parça parça commit at, CI ile doğrula, browser’da incele ve notlarla release et.',
        },
      ],
      motionTitle: 'Motion süs değil, görevli',
      motionIntro:
        'Pinned ve scrubbed anlar dikkati yönlendirir. Reduced-motion kullanıcıları aynı içeriği sinematik katman olmadan alır.',
      contactTitle: 'Dağınık bir fikrin temiz bir lansmana mı ihtiyacı var?',
      contactIntro:
        'Ürün, portfolyo veya landing page problemini gönder. Bunu uygulanabilir bir kapsama çevirelim.',
    },
    projects: {
      title: 'Proje arşivi',
      intro:
        'Yayınlanmış denemeler, bootcamp işleri, ürün arayüzleri ve oyunbaz uygulamalardan oluşan tam arşiv. Arşiv eksiksiz kalır; case-study katmanı zamanla güçlenir.',
      archiveLabel: 'Arşiv',
      featuredLabel: 'Öne çıkan',
      live: 'Canlı',
      code: 'Kod',
      caseLabel: 'Detay',
      back: 'Projelere dön',
      nextProject: 'Sonraki proje',
      yearLabel: 'Yıl',
      stackLabel: 'Stack',
    },
    lab: {
      eyebrow: 'Canlı lab / WASM',
      title: 'Retro Game Center portföy içinde DOOM Shareware başlatıyor.',
      intro:
        'home-media-portal içinden alınmış sınırlı canlı demo: DOSBox-X for Web, seçilmiş ROM manifesti ve ana sayfayı hafif tutan lazy iframe kabuğu.',
      launchLabel: 'Demoyu başlat',
      openLabel: 'Sekmede aç',
      frameTitle: 'DOSBox-X runtime',
      frameIntro:
        'Engine yalnızca kullanıcı etkileşiminden sonra yüklenir. WASM, ROM dosyaları ve emulator scriptleri lab route arkasında kalır.',
      idleTitle: 'DOS runtime hazır, ama henüz yüklenmedi.',
      idleBody:
        'WASM engine, ROM manifesti ve emulator assetlerini izole frame içinde yüklemek için başlat düğmesine bas.',
      specsTitle: 'Bu neden portföyde yer alıyor',
      specsIntro:
        'Bu rastgele bir embed değil. Ağır browser runtime işlerinin ana siteyi bozmadan nasıl scope, cache ve sunum disiplinine alınacağını gösteriyor.',
      specs: [
        {
          title: 'İzole payload',
          body: '16 MB runtime /wasm altında yaşar ve ana sayfa ya da proje arşivinden yüklenmez.',
        },
        {
          title: 'Dar asset sunucusu',
          body: 'Route handler WASM, ROM ve engine dosyalarını açık MIME tipleri ve cache headerları ile servis eder.',
        },
        {
          title: 'Backend bağımlılığı yok',
          body: 'Skor, save, auth ve admin araçları gerçek ürün ihtiyacı olana kadar v0.2.0 dışında kalır.',
        },
      ],
      qaTitle: 'Mevcut güvenlik sınırları',
      qa: [
        'Script, pointer lock, download, fullscreen ve gamepad için açık izinli, same-origin kaçışı olmayan sandbox iframe.',
        'Shareware ROM manifesti size review sonrası statik asset olarak kopyalandı.',
        'Harici vendor scriptleri engine frame içinde sınırlı ve gelecekte self-host için dokümante edildi.',
      ],
      back: 'Ana sayfaya dön',
    },
    footer: {
      line: 'Next.js, shadcn primitives, GSAP ve katı template karşıtı kuralla inşa edildi.',
    },
  },
};
