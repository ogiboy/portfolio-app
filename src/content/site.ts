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
      signature: 'Halil Oğuzcan Toptaş / Developer + homelab portfolio / 2026',
    },
    nav: {
      label: 'Primary navigation',
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      lab: 'Lab',
      process: 'Process',
      contact: 'Contact',
      language: 'TR',
      openMenu: 'Open navigation',
      closeMenu: 'Close navigation',
      menuDescription: 'Move between selected work, the full archive, the lab, and contact.',
    },
    home: {
      eyebrow: 'Independent developer / homelab hobbyist / Istanbul',
      title:
        'I’m Halil Oğuzcan Toptaş. I build web interfaces, homelab systems, and browser experiments.',
      subtitle:
        'I work with Next.js, TypeScript, automation, homelab operations, and browser runtimes. I document the decisions, constraints, and failure modes behind each build.',
      primaryCta: 'Start a project',
      secondaryCta: 'See the archive',
      stackLabel: 'Operating stack',
      stackNote:
        'This portfolio brings together shipped web work, homelab infrastructure experiments, and build notes in one place.',
      proof: ['Next.js', 'TypeScript', 'Homelab', 'Automation', 'WASM', 'Delivery'],
      servicesTitle: 'Three kinds of work',
      servicesIntro:
        'I build client-facing interfaces, self-hosted systems, and browser experiments. Each project states its scope, constraints, and shipped result.',
      services: [
        {
          title: 'Product interfaces',
          body: 'Landing pages and frontend systems that explain a product, show evidence, and guide visitors to the next action.',
        },
        {
          title: 'Homelab + automation',
          body: 'Small, inspectable systems for learning self-hosting, operations, repeatable workflows, and the failure paths between them.',
        },
        {
          title: 'Browser experiments',
          body: 'Motion, WebAssembly, game runtimes, and interface studies isolated from the main product payload.',
        },
      ],
      selectedTitle: 'Featured projects from the archive',
      selectedIntro:
        'The archive lists every project. Selected entries explain the problem, implementation, stack, and outcome in more detail.',
      processTitle: 'How I take a build from idea to release',
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
      motionTitle: 'Motion supports orientation',
      motionIntro:
        'Scroll-linked movement shows relationships between sections, and state changes confirm user actions. Reduced-motion users keep the same content and navigation.',
      contactTitle: 'Have a website or interface to build?',
      contactIntro:
        'Send the product, portfolio, or landing-page problem. I can help turn it into a buildable scope.',
    },
    about: {
      eyebrow: 'About H.O.T. / Istanbul',
      title: 'Halil Oğuzcan Toptaş',
      intro:
        'I am a software developer and homelab hobbyist in Istanbul. H.O.T. comes from my initials: Halil, Oğuzcan, Toptaş. I build web interfaces, small applications, homelab systems, and browser experiments.',
      identityTitle: 'The work behind H.O.T.',
      identityBody:
        'This portfolio brings together shipped web work, homelab and automation experiments, and browser runtime studies. Each entry keeps its scope, implementation choices, and public evidence close to the result.',
      pathsTitle: 'Choose a starting point',
      pathsIntro: 'Start with the route that matches what you need to verify.',
      paths: [
        {
          title: 'Clients',
          body: 'Send a website, portfolio, or interface problem by email to begin with a concrete scope.',
          action: 'Email H.O.T.',
          target: 'email',
        },
        {
          title: 'Recruiters',
          body: 'Review selected work and connect through LinkedIn for the professional context behind this portfolio.',
          action: 'Open LinkedIn',
          target: 'linkedin',
        },
        {
          title: 'Technical visitors',
          body: 'Inspect the project archive, isolated lab, and public source links for implementation details.',
          action: 'Browse projects',
          target: 'projects',
        },
      ],
      linksTitle: 'Public routes and contacts',
      projectsAction: 'Projects',
      labAction: 'Open the lab',
      githubAction: 'GitHub',
      linkedinAction: 'LinkedIn',
      emailAction: 'Email',
    },
    projects: {
      title: 'Project archive',
      intro:
        'An archive of deployed experiments, bootcamp projects, interfaces, and small applications. Open a project to review its description, stack, demo, and source.',
      archiveLabel: 'Archive',
      featuredLabel: 'Featured',
      live: 'Live',
      code: 'Code',
      caseLabel: 'Case',
      back: 'Back to projects',
      nextProject: 'Next project',
      categoryLabel: 'Category',
      yearLabel: 'Year',
      stackLabel: 'Stack',
    },
    lab: {
      eyebrow: 'Live lab / WASM',
      title: 'Retro Game Center boots DOOM Shareware through WebAssembly.',
      intro:
        'A live demo adapted from home-media-portal: DOSBox-X for Web, a curated ROM manifest, and a lazy iframe that keeps the runtime off the homepage until requested.',
      launchLabel: 'Boot demo',
      openLabel: 'Open tab',
      frameTitle: 'DOSBox-X runtime',
      frameIntro:
        'The engine is loaded only after interaction. WASM, ROM files, and emulator scripts stay behind the lab route.',
      idleTitle: 'DOS runtime is staged, not loaded.',
      idleBody:
        'Press boot to load the WASM engine, ROM manifest, and emulator assets inside the isolated frame.',
      bootingTitle: 'Booting the DOS machine.',
      bootingBody: 'Loading the engine and shareware files. This can take a moment on a slow link.',
      readyLabel: 'DOS machine ready',
      errorTitle: 'The DOS machine did not boot.',
      errorBody: 'The isolated runtime reported a loading error. Retry here or open it separately.',
      timeoutTitle: 'The boot took too long.',
      timeoutBody:
        'The runtime stopped waiting after 20 seconds. Retry or open it in a separate tab.',
      retryLabel: 'Retry boot',
      specsTitle: 'Runtime isolation details',
      specsIntro:
        'This demo shows how to load a heavy browser runtime only on demand, keep its assets isolated, and protect the main site from its payload.',
      specs: [
        {
          title: 'Isolated payload',
          body: 'The 16 MB runtime lives under /wasm and does not load from the home route or project archive.',
        },
        {
          title: 'Narrow asset server',
          body: 'A narrow Next.js delivery policy serves WASM, ROM, and engine files with explicit MIME, cache, and sandbox-compatible headers.',
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
        'Pinned vendor scripts are served locally inside the isolated engine frame with recorded provenance.',
      ],
      back: 'Back to home',
    },
    privacy: {
      eyebrow: 'Privacy / telemetry',
      title: 'What this site measures',
      intro:
        'This portfolio uses cookieless, aggregate Vercel Web Analytics and Speed Insights to understand route interest and performance. It does not run ads or sell visitor data.',
      aggregateTitle: 'What is measured',
      aggregateBody:
        'Page and route views, referrer category, coarse device/browser information, approximate region, and performance measurements may be aggregated by Vercel. No custom portfolio events are active.',
      boundariesTitle: 'What is not sent',
      boundariesBody:
        'The portfolio does not send names, email addresses, form content, authentication data, stable account identifiers, or advertising profiles to analytics. There is no account system on public v1.',
      controlTitle: 'Your local control',
      controlBody:
        'Use the control below to stop Analytics and Speed Insights on future page loads. Disabling stores the preference and reloads this page without provider scripts. The preference stays in local storage on this device and can be changed at any time.',
      sentryTitle: 'Error replay status',
      sentryBody:
        'Sentry and Session Replay are not active. They will remain off until masking, retention, sampling, privacy, and provider credentials are explicitly approved and documented.',
      enabledLabel: 'Aggregate analytics are enabled in this browser.',
      disabledLabel: 'Aggregate analytics are disabled in this browser.',
      enableAction: 'Enable analytics',
      disableAction: 'Disable analytics',
      savedLabel: 'Preference saved.',
      errorLabel: 'Preference could not be saved.',
    },
    recovery: {
      errorEyebrow: 'Runtime interrupted',
      errorTitle: 'This page could not finish loading.',
      errorBody:
        'Retry the page. If it continues to fail, return to the project archive or go back home.',
      retryAction: 'Retry view',
      notFoundEyebrow: '404 / Route missing',
      notFoundTitle: 'This page does not exist.',
      notFoundBody:
        'This address does not match a published page. Browse the project archive or return home.',
      homeAction: 'Return home',
      projectsAction: 'Browse projects',
    },
    footer: {
      line: 'Personal developer and homelab portfolio built with Next.js, shadcn primitives, and Motion.',
      privacyLabel: 'Privacy',
    },
  },
  tr: {
    brand: {
      homeLabel: 'H.O.T. - Halil Oğuzcan Toptaş, ana sayfa',
      signature: 'Halil Oğuzcan Toptaş / Geliştirici + homelab portföyü / 2026',
    },
    nav: {
      label: 'Ana gezinme',
      home: 'Ana sayfa',
      about: 'Hakkında',
      projects: 'Projeler',
      lab: 'Lab',
      process: 'Süreç',
      contact: 'İletişim',
      language: 'EN',
      openMenu: 'Navigasyonu aç',
      closeMenu: 'Navigasyonu kapat',
      menuDescription: 'Seçili işler, tam arşiv, laboratuvar ve iletişim arasında ilerle.',
    },
    home: {
      eyebrow: 'Bağımsız geliştirici / homelab meraklısı / İstanbul',
      title:
        'Ben Halil Oğuzcan Toptaş. Web arayüzleri, homelab sistemleri ve browser deneyleri geliştiriyorum.',
      subtitle:
        'Next.js, TypeScript, otomasyon, homelab operasyonları ve browser runtime’larıyla çalışıyorum. Her yapının kararlarını, kısıtlarını ve hata yollarını belgeliyorum.',
      primaryCta: 'Proje başlat',
      secondaryCta: 'Arşivi gör',
      stackLabel: 'Çalışma stacki',
      stackNote:
        'Bu portföy, yayınlanmış web işlerini, homelab altyapı deneylerini ve build notlarını tek yerde toplar.',
      proof: ['Next.js', 'TypeScript', 'Homelab', 'Otomasyon', 'WASM', 'Teslim'],
      servicesTitle: 'Üç çalışma alanı',
      servicesIntro:
        'Müşteri arayüzleri, self-hosted sistemler ve browser deneyleri geliştiriyorum. Her proje kapsamını, kısıtlarını ve yayınlanan sonucunu açıklar.',
      services: [
        {
          title: 'Ürün arayüzleri',
          body: 'Ürünü anlatan, kanıt gösteren ve ziyaretçiyi sonraki aksiyona yönlendiren landing page ve frontend sistemleri.',
        },
        {
          title: 'Homelab + otomasyon',
          body: 'Self-hosting, operasyon, tekrar edilebilir iş akışları ve aralarındaki hata yollarını öğrenmek için küçük ve incelenebilir sistemler.',
        },
        {
          title: 'Browser deneyleri',
          body: 'Ana ürün payload’ından izole edilen motion, WebAssembly, oyun runtime ve arayüz çalışmaları.',
        },
      ],
      selectedTitle: 'Arşivden öne çıkan projeler',
      selectedIntro:
        'Arşivdeki her proje listelenir. Seçilen işler problemi, uygulamayı, stacki ve sonucu daha ayrıntılı anlatır.',
      processTitle: 'Fikirden yayına giden çalışma biçimi',
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
      motionTitle: 'Motion yön bulmayı destekler',
      motionIntro:
        'Scroll bağlantılı hareket bölümler arasındaki ilişkiyi gösterir, durum değişiklikleri de kullanıcı işlemlerini doğrular. Hareket azaltma tercihini kullanan kullanıcılar aynı içeriği ve gezinmeyi korur.',
      contactTitle: 'Geliştirilecek bir web sitesi veya arayüz mü var?',
      contactIntro:
        'Ürün, portföy veya landing page problemini gönderin. Bunu uygulanabilir bir kapsama çevirmeye yardımcı olabilirim.',
    },
    about: {
      eyebrow: 'H.O.T. hakkında / İstanbul',
      title: 'Halil Oğuzcan Toptaş',
      intro:
        'İstanbul’da çalışan bir yazılım geliştirici ve homelab meraklısıyım. H.O.T., adımın baş harflerinden geliyor: Halil, Oğuzcan, Toptaş. Web arayüzleri, küçük uygulamalar, homelab sistemleri ve browser deneyleri geliştiriyorum.',
      identityTitle: 'H.O.T.’ın arkasındaki işler',
      identityBody:
        'Bu portföy yayınlanmış web işlerini, homelab ve otomasyon deneylerini ve browser runtime çalışmalarını bir araya getiriyor. Her kayıt kapsamını, uygulama tercihlerini ve herkese açık kanıtlarını sonuçla birlikte gösteriyor.',
      pathsTitle: 'Bir başlangıç noktası seçin',
      pathsIntro: 'Doğrulamak istediğiniz şeye uyan rotadan başlayın.',
      paths: [
        {
          title: 'Müşteriler',
          body: 'Web sitesi, portföy veya arayüz problemini somut bir kapsamla başlamak için e-posta ile gönderin.',
          action: 'H.O.T. ile e-posta',
          target: 'email',
        },
        {
          title: 'İşe alım ekipleri',
          body: 'Seçili işleri inceleyin ve bu portföyün profesyonel bağlamı için LinkedIn üzerinden bağlantı kurun.',
          action: 'LinkedIn aç',
          target: 'linkedin',
        },
        {
          title: 'Teknik ziyaretçiler',
          body: 'Uygulama ayrıntıları için proje arşivini, izole labı ve herkese açık kaynak bağlantılarını inceleyin.',
          action: 'Projeleri incele',
          target: 'projects',
        },
      ],
      linksTitle: 'Herkese açık rotalar ve iletişim',
      projectsAction: 'Projeler',
      labAction: 'Labı aç',
      githubAction: 'GitHub',
      linkedinAction: 'LinkedIn',
      emailAction: 'E-posta',
    },
    projects: {
      title: 'Proje arşivi',
      intro:
        'Yayınlanmış deneylerin, bootcamp projelerinin, arayüzlerin ve küçük uygulamaların arşivi. Açıklama, stack, demo ve kaynak kodu incelemek için bir proje açın.',
      archiveLabel: 'Arşiv',
      featuredLabel: 'Öne çıkan',
      live: 'Canlı',
      code: 'Kod',
      caseLabel: 'Detay',
      back: 'Projelere dön',
      nextProject: 'Sonraki proje',
      categoryLabel: 'Kategori',
      yearLabel: 'Yıl',
      stackLabel: 'Stack',
    },
    lab: {
      eyebrow: 'Canlı lab / WASM',
      title: 'Retro Game Center, DOOM Shareware’ı WebAssembly ile başlatıyor.',
      intro:
        'home-media-portal üzerinden uyarlanmış canlı demo: DOSBox-X for Web, seçilmiş ROM manifesti ve runtime’ı istenene kadar ana sayfadan uzak tutan lazy iframe.',
      launchLabel: 'Demoyu başlat',
      openLabel: 'Sekmede aç',
      frameTitle: 'DOSBox-X runtime',
      frameIntro:
        'Engine yalnızca kullanıcı etkileşiminden sonra yüklenir. WASM, ROM dosyaları ve emulator scriptleri lab route arkasında kalır.',
      idleTitle: 'DOS runtime hazır, ama henüz yüklenmedi.',
      idleBody:
        'WASM engine, ROM manifesti ve emulator assetlerini izole frame içinde yüklemek için başlat düğmesine bas.',
      bootingTitle: 'DOS makinesi başlatılıyor.',
      bootingBody: 'Engine ve shareware dosyaları yükleniyor. Yavaş bağlantıda biraz sürebilir.',
      readyLabel: 'DOS makinesi hazır',
      errorTitle: 'DOS makinesi başlatılamadı.',
      errorBody: 'İzole runtime bir yükleme hatası bildirdi. Buradan tekrar dene veya ayrı aç.',
      timeoutTitle: 'Başlatma çok uzun sürdü.',
      timeoutBody: 'Runtime 20 saniye sonra beklemeyi bıraktı. Tekrar dene veya ayrı sekmede aç.',
      retryLabel: 'Tekrar başlat',
      specsTitle: 'Runtime izolasyonu',
      specsIntro:
        'Bu demo, ağır bir browser runtime’ının yalnızca gerektiğinde nasıl yükleneceğini, assetlerinin nasıl izole edileceğini ve ana sitenin payload’ının nasıl korunacağını gösterir.',
      specs: [
        {
          title: 'İzole payload',
          body: '16 MB runtime /wasm altında yaşar ve ana sayfa ya da proje arşivinden yüklenmez.',
        },
        {
          title: 'Dar asset sunucusu',
          body: 'Dar bir Next.js delivery policy, WASM, ROM ve engine dosyalarını açık MIME, cache ve sandbox uyumlu headerlarla servis eder.',
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
        'Sabitlenmiş vendor scriptleri, kaynağı kayıtlı biçimde izole engine frame içinden yerel sunuluyor.',
      ],
      back: 'Ana sayfaya dön',
    },
    privacy: {
      eyebrow: 'Gizlilik / telemetri',
      title: 'Bu site neleri ölçüyor',
      intro:
        'Bu portföy route ilgisini ve performansı anlamak için çerezsiz, toplu Vercel Web Analytics ve Speed Insights kullanır. Reklam çalıştırmaz ve ziyaretçi verisi satmaz.',
      aggregateTitle: 'Neler ölçülüyor',
      aggregateBody:
        'Sayfa ve route görüntülemeleri, yönlendiren kaynak kategorisi, genel cihaz/browser bilgisi, yaklaşık bölge ve performans ölçümleri Vercel tarafından toplulaştırılabilir. Özel portföy eventleri aktif değildir.',
      boundariesTitle: 'Neler gönderilmiyor',
      boundariesBody:
        'Portföy analitiğe isim, e-posta adresi, form içeriği, kimlik doğrulama verisi, kalıcı hesap kimliği veya reklam profili göndermez. Public v1 içinde hesap sistemi yoktur.',
      controlTitle: 'Yerel kontrolünüz',
      controlBody:
        'Gelecek sayfa yüklemelerinde Analytics ve Speed Insights çalışmasını durdurmak için aşağıdaki kontrolü kullanın. Kapatma tercihi kaydeder ve bu sayfayı provider scriptleri olmadan yeniden yükler. Tercih bu cihazın local storage alanında kalır ve her zaman değiştirilebilir.',
      sentryTitle: 'Hata replay durumu',
      sentryBody:
        'Sentry ve Session Replay aktif değildir. Maskeleme, saklama, örnekleme, gizlilik ve provider kimlik bilgileri açıkça onaylanıp belgelenene kadar kapalı kalacaktır.',
      enabledLabel: 'Bu browser içinde toplu analitik açık.',
      disabledLabel: 'Bu browser içinde toplu analitik kapalı.',
      enableAction: 'Analitiği aç',
      disableAction: 'Analitiği kapat',
      savedLabel: 'Tercih kaydedildi.',
      errorLabel: 'Tercih kaydedilemedi.',
    },
    recovery: {
      errorEyebrow: 'Çalışma kesintisi',
      errorTitle: 'Bu sayfanın yüklenmesi tamamlanamadı.',
      errorBody: 'Sayfayı yeniden deneyin. Hata sürerse proje arşivine veya ana sayfaya dönün.',
      retryAction: 'Görünümü yeniden dene',
      notFoundEyebrow: '404 / Rota bulunamadı',
      notFoundTitle: 'Bu sayfa mevcut değil.',
      notFoundBody:
        'Bu adres yayınlanmış bir sayfayla eşleşmiyor. Proje arşivine göz atın veya ana sayfaya dönün.',
      homeAction: 'Ana sayfaya dön',
      projectsAction: 'Projeleri incele',
    },
    footer: {
      line: 'Next.js, shadcn primitives ve Motion ile geliştirilmiş kişisel geliştirici ve homelab portföyü.',
      privacyLabel: 'Gizlilik',
    },
  },
};
