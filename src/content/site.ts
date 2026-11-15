import type { routing } from '@/i18n/routing';

export type Locale = (typeof routing.locales)[number];

type LocalizedCopy<T> = Record<Locale, T>;

export const contact = {
  email: 'ogi@oguzcantoptas.com',
  github: 'https://github.com/ogiboy',
  linkedin: 'https://www.linkedin.com/in/hoguzcantoptas/',
  resume: '/myResume.pdf',
};

export const siteCopy: LocalizedCopy<{
  brand: {
    homeLabel: string;
    signature: string;
  };
  nav: {
    label: string;
    home: string;
    about: string;
    projects: string;
    lab: string;
    process: string;
    contact: string;
    language: string;
    useDarkTheme: string;
    useLightTheme: string;
    openMenu: string;
    closeMenu: string;
    menuDescription: string;
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
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    identityTitle: string;
    identityBody: string;
    pathsTitle: string;
    pathsIntro: string;
    paths: Array<{
      title: string;
      body: string;
      action: string;
      target: 'email' | 'linkedin' | 'projects';
    }>;
    linksTitle: string;
    projectsAction: string;
    labAction: string;
    githubAction: string;
    linkedinAction: string;
    emailAction: string;
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
    categoryLabel: string;
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
    bootingTitle: string;
    bootingBody: string;
    readyLabel: string;
    errorTitle: string;
    errorBody: string;
    timeoutTitle: string;
    timeoutBody: string;
    retryLabel: string;
    specsTitle: string;
    specsIntro: string;
    specs: Array<{ title: string; body: string }>;
    qaTitle: string;
    qa: string[];
    back: string;
  };
  privacy: {
    eyebrow: string;
    title: string;
    intro: string;
    aggregateTitle: string;
    aggregateBody: string;
    boundariesTitle: string;
    boundariesBody: string;
    controlTitle: string;
    controlBody: string;
    sentryTitle: string;
    sentryBody: string;
    enabledLabel: string;
    disabledLabel: string;
    enableAction: string;
    disableAction: string;
    savedLabel: string;
    errorLabel: string;
  };
  recovery: {
    errorEyebrow: string;
    errorTitle: string;
    errorBody: string;
    retryAction: string;
    notFoundEyebrow: string;
    notFoundTitle: string;
    notFoundBody: string;
    homeAction: string;
    projectsAction: string;
  };
  footer: {
    line: string;
    privacyLabel: string;
  };
}> = {
  en: {
    brand: {
      homeLabel: 'H.O.T. - Halil Oğuzcan Toptaş, home',
      signature: 'Halil Oğuzcan Toptaş / Developer / Istanbul / 2026',
    },
    nav: {
      label: 'Primary navigation',
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      lab: 'Lab',
      process: 'How I work',
      contact: 'Contact',
      language: 'TR',
      useDarkTheme: 'Use dark theme',
      useLightTheme: 'Use light theme',
      openMenu: 'Open navigation',
      closeMenu: 'Close navigation',
      menuDescription: 'Browse projects, visit the lab, or get in touch.',
    },
    home: {
      eyebrow: 'Developer based in Istanbul',
      title:
        'I’m Halil Oğuzcan Toptaş. I build websites, small web apps, and tools for my home lab.',
      subtitle:
        'I work mainly with Next.js and TypeScript. This site also includes self-hosting projects and browser experiments I’ve built along the way.',
      primaryCta: 'Get in touch',
      secondaryCta: 'See the archive',
      stackLabel: 'Tools and topics',
      stackNote: 'A selection of my web projects, home lab experiments, and browser demos.',
      proof: ['Next.js', 'TypeScript', 'Homelab', 'Automation', 'WASM', 'Delivery'],
      servicesTitle: 'What I work on',
      servicesIntro:
        'My work ranges from websites and interfaces to home lab projects and small browser demos.',
      services: [
        {
          title: 'Product interfaces',
          body: 'Websites and interfaces that make information easy to find and use.',
        },
        {
          title: 'Home lab & automation',
          body: 'Projects for learning how to host and maintain services at home, including the automation around them.',
        },
        {
          title: 'Browser experiments',
          body: 'Small experiments with animation, WebAssembly, games, and interface ideas.',
        },
      ],
      selectedTitle: 'Selected projects',
      selectedIntro:
        'Browse all projects in the archive, or open a featured project to see how it was built.',
      processTitle: 'How I work',
      processIntro:
        'I agree on what needs to be built, keep the scope clear, and check the result before release.',
      process: [
        {
          title: 'Understand',
          body: 'Clarify who the project is for, what it needs to do, and what is out of scope.',
        },
        {
          title: 'Plan',
          body: 'Break the work into pages, content, and interface pieces.',
        },
        {
          title: 'Build and review',
          body: 'Build in small steps, check the site in a browser, and fix issues before release.',
        },
      ],
      motionTitle: 'Motion with a purpose',
      motionIntro:
        'Animation helps show how sections connect and when an action is complete. The site respects reduced-motion settings.',
      contactTitle: 'Have a project in mind?',
      contactIntro: 'Tell me what you’re looking to build, and we can work out the next steps.',
    },
    about: {
      eyebrow: 'About / Istanbul',
      title: 'Halil Oğuzcan Toptaş',
      intro:
        'I’m a software developer based in Istanbul. H.O.T. comes from my initials: Halil, Oğuzcan, Toptaş. I build websites and small apps, and use my home lab to try out self-hosted tools.',
      identityTitle: 'About this portfolio',
      identityBody:
        'Here you’ll find my web projects, home lab experiments, and browser demos, with links to their live versions and source code where available.',
      pathsTitle: 'Get in touch or explore',
      pathsIntro: 'Choose a link to contact me or see more of my work.',
      paths: [
        {
          title: 'Clients',
          body: 'Email me about your website or interface project.',
          action: 'Send an email',
          target: 'email',
        },
        {
          title: 'Recruiters',
          body: 'See my background and get in touch on LinkedIn.',
          action: 'Visit LinkedIn',
          target: 'linkedin',
        },
        {
          title: 'Technical visitors',
          body: 'Browse the projects and visit the lab for a browser game demo.',
          action: 'View projects',
          target: 'projects',
        },
      ],
      linksTitle: 'Links',
      projectsAction: 'Projects',
      labAction: 'Open the lab',
      githubAction: 'GitHub',
      linkedinAction: 'LinkedIn',
      emailAction: 'Email',
    },
    projects: {
      title: 'Project archive',
      intro:
        'Websites, apps, and experiments I’ve built. Open a project to see its details, try the demo, or view the source code.',
      archiveLabel: 'Archive',
      featuredLabel: 'Featured',
      live: 'Live',
      code: 'Code',
      caseLabel: 'Case',
      back: 'Back to projects',
      nextProject: 'Next project',
      categoryLabel: 'Category',
      yearLabel: 'Year',
      stackLabel: 'Tools',
    },
    lab: {
      eyebrow: 'Browser demo / WASM',
      title: 'Play DOOM in your browser',
      intro:
        'This demo runs the shareware version of DOOM in DOSBox-X. The game loads only when you start it.',
      launchLabel: 'Start game',
      openLabel: 'Open tab',
      frameTitle: 'DOSBox-X runtime',
      frameIntro: 'The game files load after you start the demo.',
      idleTitle: 'The game is ready to start.',
      idleBody: 'Select Start game to load the emulator and game files.',
      bootingTitle: 'Starting the game…',
      bootingBody: 'Loading the emulator and game files. This may take a moment.',
      readyLabel: 'Game ready',
      errorTitle: 'The game could not start.',
      errorBody: 'There was a problem loading the emulator. Try again or open it in a new tab.',
      timeoutTitle: 'The game is taking too long to load.',
      timeoutBody: 'Loading stopped after 20 seconds. Try again or open it in a new tab.',
      retryLabel: 'Try again',
      specsTitle: 'How the demo is loaded',
      specsIntro:
        'The emulator and its files load only on this page, after you start the demo. They are not included on the home page.',
      specs: [
        {
          title: 'Loaded on this page',
          body: 'The 16 MB runtime is stored under /wasm and does not load on the home page or project archive.',
        },
        {
          title: 'Local game files',
          body: 'The site serves the emulator and game files with the headers needed to run them in the browser.',
        },
        {
          title: 'No account needed',
          body: 'The demo does not save scores or require an account.',
        },
      ],
      qaTitle: 'A few details',
      qa: [
        'The game runs in a restricted frame with only the browser permissions it needs.',
        'The shareware game files are included as static assets.',
        'The emulator scripts are stored and served by this site.',
      ],
      back: 'Back to home',
    },
    privacy: {
      eyebrow: 'Privacy',
      title: 'Analytics on this site',
      intro:
        'This site uses Vercel Analytics and Speed Insights to see which pages are visited and how they perform. It does not use advertising cookies or sell visitor data.',
      aggregateTitle: 'What may be collected',
      aggregateBody:
        'Vercel may collect page views, referring site, general device and browser details, approximate location, and performance data. This site does not send custom analytics events.',
      boundariesTitle: 'What this site does not collect',
      boundariesBody:
        'This site does not send your name, email, form content, account details, or advertising profile to analytics. There are no user accounts.',
      controlTitle: 'Your choice',
      controlBody:
        'Use the button below to turn Analytics and Speed Insights off for future page loads. Your choice is saved in this browser and you can change it at any time.',
      sentryTitle: 'Session replay',
      sentryBody: 'Session replay is not enabled on this site.',
      enabledLabel: 'Analytics are on in this browser.',
      disabledLabel: 'Analytics are off in this browser.',
      enableAction: 'Turn analytics on',
      disableAction: 'Turn analytics off',
      savedLabel: 'Preference saved.',
      errorLabel: 'Preference could not be saved.',
    },
    recovery: {
      errorEyebrow: 'Something went wrong',
      errorTitle: 'This page could not load.',
      errorBody: 'Try again. If the problem continues, go back to the projects or home page.',
      retryAction: 'Try again',
      notFoundEyebrow: '404 / Page not found',
      notFoundTitle: 'This page does not exist.',
      notFoundBody: 'We couldn’t find a page at this address. Browse the projects or return home.',
      homeAction: 'Go home',
      projectsAction: 'Browse projects',
    },
    footer: {
      line: 'Personal portfolio built with Next.js.',
      privacyLabel: 'Privacy',
    },
  },
  tr: {
    brand: {
      homeLabel: 'H.O.T. - Halil Oğuzcan Toptaş, ana sayfa',
      signature: 'Halil Oğuzcan Toptaş / Geliştirici / İstanbul / 2026',
    },
    nav: {
      label: 'Ana gezinme',
      home: 'Ana sayfa',
      about: 'Hakkında',
      projects: 'Projeler',
      lab: 'Lab',
      process: 'Nasıl çalışıyorum?',
      contact: 'İletişim',
      language: 'EN',
      useDarkTheme: 'Koyu temayı kullan',
      useLightTheme: 'Açık temayı kullan',
      openMenu: 'Navigasyonu aç',
      closeMenu: 'Navigasyonu kapat',
      menuDescription: 'Projeleri inceleyin, labı ziyaret edin veya iletişime geçin.',
    },
    home: {
      eyebrow: 'İstanbul’da yazılım geliştirici',
      title:
        'Ben Halil Oğuzcan Toptaş. Web siteleri, küçük uygulamalar ve ev sunucumda çalışan araçlar geliştiriyorum.',
      subtitle:
        'Ağırlıklı olarak Next.js ve TypeScript kullanıyorum. Bu sitede ayrıca kendi sunucumda çalıştırdığım projeler ve tarayıcı deneyleri de var.',
      primaryCta: 'İletişime geç',
      secondaryCta: 'Arşivi gör',
      stackLabel: 'Araçlar ve konular',
      stackNote:
        'Web projelerimden, ev sunucusu denemelerimden ve tarayıcı demolarımdan bir seçki.',
      proof: ['Next.js', 'TypeScript', 'Homelab', 'Otomasyon', 'WASM', 'Teslim'],
      servicesTitle: 'Neler yapıyorum?',
      servicesIntro:
        'Web siteleri ve arayüzlerden ev sunucusu projelerine ve küçük tarayıcı demolarına uzanan işler yapıyorum.',
      services: [
        {
          title: 'Ürün arayüzleri',
          body: 'Bilginin kolay bulunup kullanılmasını sağlayan web siteleri ve arayüzler.',
        },
        {
          title: 'Ev sunucusu ve otomasyon',
          body: 'Evde servis çalıştırmayı ve yönetmeyi öğrenmek için yaptığım projeler ve otomasyonlar.',
        },
        {
          title: 'Browser deneyleri',
          body: 'Animasyon, WebAssembly, oyun ve arayüz fikirleri üzerine küçük denemeler.',
        },
      ],
      selectedTitle: 'Seçili projeler',
      selectedIntro:
        'Tüm projeler arşivde. Öne çıkan projelerin nasıl yapıldığını ayrıca inceleyebilirsiniz.',
      processTitle: 'Nasıl çalışıyorum?',
      processIntro:
        'Önce ihtiyacı netleştirir, kapsamı belirler ve yayına almadan önce sonucu kontrol ederim.',
      process: [
        {
          title: 'Anla',
          body: 'Projenin kimin için olduğunu, ne yapması gerektiğini ve kapsam dışı işleri netleştir.',
        },
        {
          title: 'Planla',
          body: 'İşi sayfalara, içeriğe ve arayüz parçalarına böl.',
        },
        {
          title: 'Geliştir ve kontrol et',
          body: 'Küçük adımlarla geliştir, siteyi tarayıcıda incele ve yayından önce sorunları gider.',
        },
      ],
      motionTitle: 'Amaca hizmet eden hareket',
      motionIntro:
        'Animasyon, bölümlerin ilişkisini ve bir işlemin tamamlandığını gösterir. Site, azaltılmış hareket terciğine uyar.',
      contactTitle: 'Aklınızda bir proje mi var?',
      contactIntro: 'Ne yapmak istediğinizi anlatın; sonraki adımları birlikte belirleyelim.',
    },
    about: {
      eyebrow: 'İstanbul / Hakkımda',
      title: 'Halil Oğuzcan Toptaş',
      intro:
        'İstanbul’da yaşayan bir yazılım geliştiricisiyim. H.O.T. adımın baş harflerinden geliyor: Halil, Oğuzcan, Toptaş. Web siteleri ve küçük uygulamalar geliştiriyor, ev sunucumda farklı araçlar deniyorum.',
      identityTitle: 'Bu portföy hakkında',
      identityBody:
        'Burada web projelerimi, ev sunucusu denemelerimi ve tarayıcı demolarımı bulabilirsiniz. Uygun olan projelerin canlı sürüm ve kaynak kodu bağlantıları da mevcut.',
      pathsTitle: 'İletişim ve bağlantılar',
      pathsIntro: 'Bana ulaşın veya işlerime göz atın.',
      paths: [
        {
          title: 'Müşteriler',
          body: 'Web sitesi veya arayüz projeniz için e-posta gönderin.',
          action: 'E-posta gönder',
          target: 'email',
        },
        {
          title: 'İşe alım ekipleri',
          body: 'Deneyimimi görmek ve iletişim kurmak için LinkedIn’i ziyaret edin.',
          action: 'LinkedIn’e git',
          target: 'linkedin',
        },
        {
          title: 'Teknik ziyaretçiler',
          body: 'Projelerime göz atın veya tarayıcı oyunu demosunu deneyin.',
          action: 'Projeleri gör',
          target: 'projects',
        },
      ],
      linksTitle: 'Bağlantılar',
      projectsAction: 'Projeler',
      labAction: 'Labı aç',
      githubAction: 'GitHub',
      linkedinAction: 'LinkedIn',
      emailAction: 'E-posta',
    },
    projects: {
      title: 'Proje arşivi',
      intro:
        'Geliştirdiğim web siteleri, uygulamalar ve deneyler. Ayrıntıları görmek, demoyu denemek veya kaynak koduna bakmak için bir proje açın.',
      archiveLabel: 'Arşiv',
      featuredLabel: 'Öne çıkan',
      live: 'Canlı',
      code: 'Kod',
      caseLabel: 'Detay',
      back: 'Projelere dön',
      nextProject: 'Sonraki proje',
      categoryLabel: 'Kategori',
      yearLabel: 'Yıl',
      stackLabel: 'Teknolojiler',
    },
    lab: {
      eyebrow: 'Tarayıcı demosu / WASM',
      title: 'DOOM’u tarayıcıda oynayın',
      intro:
        'Bu demo, DOOM’un shareware sürümünü DOSBox-X ile çalıştırır. Oyun yalnızca başlattığınızda yüklenir.',
      launchLabel: 'Oyunu başlat',
      openLabel: 'Sekmede aç',
      frameTitle: 'DOSBox-X runtime',
      frameIntro: 'Oyun dosyaları, demoyu başlattığınızda yüklenir.',
      idleTitle: 'Oyun başlamaya hazır.',
      idleBody: 'Emülatörü ve oyun dosyalarını yüklemek için Oyunu başlat’a basın.',
      bootingTitle: 'Oyun başlatılıyor…',
      bootingBody: 'Emülatör ve oyun dosyaları yükleniyor. Biraz sürebilir.',
      readyLabel: 'Oyun hazır',
      errorTitle: 'Oyun başlatılamadı.',
      errorBody: 'Emülatör yüklenirken bir sorun oluştu. Tekrar deneyin veya yeni sekmede açın.',
      timeoutTitle: 'Oyunun yüklenmesi çok uzun sürdü.',
      timeoutBody: 'Yükleme 20 saniye sonra durdu. Tekrar deneyin veya yeni sekmede açın.',
      retryLabel: 'Tekrar dene',
      specsTitle: 'Demo nasıl yükleniyor?',
      specsIntro:
        'Emülatör ve dosyaları yalnızca bu sayfada, demoyu başlattığınızda yüklenir. Ana sayfaya ek yük getirmez.',
      specs: [
        {
          title: 'Yalnızca bu sayfada yüklenir',
          body: '16 MB boyutundaki emülatör /wasm altında tutulur; ana sayfada veya proje arşivinde yüklenmez.',
        },
        {
          title: 'Oyun dosyaları bu siteden gelir',
          body: 'Emülatör ve oyun dosyaları, tarayıcıda çalışmaları için gereken ayarlarla sunulur.',
        },
        {
          title: 'Hesap gerektirmez',
          body: 'Demo skorları kaydetmez ve hesap açmanızı gerektirmez.',
        },
      ],
      qaTitle: 'Teknik notlar',
      qa: [
        'Oyun, yalnızca ihtiyaç duyduğu tarayıcı izinlerine sahip kısıtlı bir çerçevede çalışır.',
        'Shareware oyun dosyaları statik dosya olarak eklenmiştir.',
        'Emülatör dosyaları bu sitede tutulur ve buradan sunulur.',
      ],
      back: 'Ana sayfaya dön',
    },
    privacy: {
      eyebrow: 'Gizlilik',
      title: 'Sitedeki analitik',
      intro:
        'Hangi sayfaların ziyaret edildiğini ve ne kadar hızlı çalıştıklarını görmek için Vercel Analytics ve Speed Insights kullanıyorum. Reklam çerezi kullanmıyor, ziyaretçi verilerini satmıyorum.',
      aggregateTitle: 'Hangi bilgiler toplanabilir?',
      aggregateBody:
        'Vercel; sayfa görüntülemelerini, yönlendiren siteyi, genel cihaz ve tarayıcı bilgilerini, yaklaşık konumu ve performans verilerini toplayabilir. Site özel analitik olayı göndermez.',
      boundariesTitle: 'Bu site neleri toplamaz?',
      boundariesBody:
        'Adınız, e-posta adresiniz, form içeriğiniz veya hesap bilgileriniz analitik araçlarına gönderilmez. Sitede kullanıcı hesabı yoktur.',
      controlTitle: 'Tercihiniz',
      controlBody:
        'Analytics ve Speed Insights’ı sonraki ziyaretlerinizde kapatmak için aşağıdaki düğmeyi kullanın. Tercihiniz bu tarayıcıya kaydedilir ve istediğiniz zaman değiştirilebilir.',
      sentryTitle: 'Oturum kaydı',
      sentryBody: 'Bu sitede oturum kaydı kullanılmıyor.',
      enabledLabel: 'Bu tarayıcıda analitik açık.',
      disabledLabel: 'Bu tarayıcıda analitik kapalı.',
      enableAction: 'Analitiği aç',
      disableAction: 'Analitiği kapat',
      savedLabel: 'Tercih kaydedildi.',
      errorLabel: 'Tercih kaydedilemedi.',
    },
    recovery: {
      errorEyebrow: 'Bir sorun oluştu',
      errorTitle: 'Sayfa yüklenemedi.',
      errorBody: 'Tekrar deneyin. Sorun devam ederse projelere veya ana sayfaya dönün.',
      retryAction: 'Tekrar dene',
      notFoundEyebrow: '404 / Sayfa bulunamadı',
      notFoundTitle: 'Bu sayfa mevcut değil.',
      notFoundBody: 'Bu adreste bir sayfa bulamadık. Projelere göz atın veya ana sayfaya dönün.',
      homeAction: 'Ana sayfaya git',
      projectsAction: 'Projeleri gör',
    },
    footer: {
      line: 'Next.js ile geliştirilmiş kişisel portföy.',
      privacyLabel: 'Gizlilik',
    },
  },
};
