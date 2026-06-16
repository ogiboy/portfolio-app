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
  footer: {
    line: string;
  };
}> = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
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
    footer: {
      line: 'Built with Next.js, shadcn primitives, GSAP, and a strict no-template rule.',
    },
  },
  tr: {
    nav: {
      home: 'Ana sayfa',
      projects: 'Projeler',
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
    footer: {
      line: 'Next.js, shadcn primitives, GSAP ve katı template karşıtı kuralla inşa edildi.',
    },
  },
};
