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
      projects: 'Projects',
      lab: 'Lab',
      process: 'Process',
      contact: 'Contact',
      language: 'TR',
    },
    home: {
      eyebrow: 'Independent developer / homelab hobbyist / Istanbul',
      title: 'I build public software, homelab systems, and browser experiments with a pulse.',
      subtitle:
        'Production-minded Next.js, automation, homelab operations, and playful runtimes, documented with the decisions and failure modes intact.',
      primaryCta: 'Start a project',
      secondaryCta: 'See the archive',
      stackLabel: 'Operating stack',
      stackNote:
        'No ornamental dashboards. No anonymous template energy. One public lab for shipped work, infrastructure experiments, and honest build notes.',
      proof: ['Next.js', 'TypeScript', 'Homelab', 'Automation', 'WASM', 'Delivery'],
      servicesTitle: 'One developer lab, three operating modes',
      servicesIntro:
        'Client work, self-hosted systems, and browser experiments share the same rule: make the boundaries visible and prove what ships.',
      services: [
        {
          title: 'Product interfaces',
          body: 'High-contrast public pages and reliable frontend systems that explain the offer, show proof, and make the next step obvious.',
        },
        {
          title: 'Homelab + automation',
          body: 'Small, inspectable systems for learning self-hosting, operations, repeatable workflows, and the failure paths between them.',
        },
        {
          title: 'Browser experiments',
          body: 'Motion, WebAssembly, game runtimes, and interface studies isolated so the playful work never compromises the main product.',
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
        'The interface should feel alive: scroll-linked movement reveals relationships and tactile states answer intent. Reduced-motion users keep the same content and direction.',
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
    privacy: {
      eyebrow: 'Privacy / telemetry',
      title: 'Useful signals, not a surveillance profile.',
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
    },
    footer: {
      line: 'A personal developer and homelab portfolio built with Next.js, shadcn primitives, Motion, and a strict no-template rule.',
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
      projects: 'Projeler',
      lab: 'Lab',
      process: 'Süreç',
      contact: 'İletişim',
      language: 'EN',
    },
    home: {
      eyebrow: 'Bağımsız geliştirici / homelab meraklısı / İstanbul',
      title: 'Public yazılımlar, homelab sistemleri ve nabzı olan browser deneyleri kuruyorum.',
      subtitle:
        'Production odaklı Next.js, otomasyon, homelab operasyonları ve oyunbaz runtime işleri; kararları ve hata yollarıyla birlikte belgeleniyor.',
      primaryCta: 'Proje başlat',
      secondaryCta: 'Arşivi gör',
      stackLabel: 'Çalışma stacki',
      stackNote:
        'Süs dashboard yok. Anonim template hissi yok. Yayınlanmış işler, altyapı deneyleri ve dürüst build notları için tek bir public lab var.',
      proof: ['Next.js', 'TypeScript', 'Homelab', 'Otomasyon', 'WASM', 'Teslim'],
      servicesTitle: 'Tek geliştirici labı, üç çalışma modu',
      servicesIntro:
        'Müşteri işleri, self-hosted sistemler ve browser deneyleri aynı kurala bağlı: sınırları görünür yap ve yayınlanan işi kanıtla.',
      services: [
        {
          title: 'Ürün arayüzleri',
          body: 'Teklifi anlatan, kanıt gösteren ve bir sonraki adımı belirgin yapan yüksek kontrastlı public sayfalar ve güvenilir frontend sistemleri.',
        },
        {
          title: 'Homelab + otomasyon',
          body: 'Self-hosting, operasyon, tekrar edilebilir iş akışları ve aralarındaki hata yollarını öğrenmek için küçük ve incelenebilir sistemler.',
        },
        {
          title: 'Browser deneyleri',
          body: 'Oyunbaz işlerin ana ürünü tehlikeye atmaması için izole edilen motion, WebAssembly, oyun runtime ve arayüz çalışmaları.',
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
        'Arayüz canlı hissettirmeli: scroll bağlantılı hareket ilişkileri gösterir, dokunsal durumlar niyete cevap verir. Reduced-motion kullanıcıları aynı içerik ve yönü korur.',
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
    privacy: {
      eyebrow: 'Gizlilik / telemetri',
      title: 'Gözetim profili değil, işe yarayan sinyaller.',
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
    },
    footer: {
      line: 'Next.js, shadcn primitives, Motion ve katı template karşıtı kuralla inşa edilmiş kişisel geliştirici ve homelab portföyü.',
      privacyLabel: 'Gizlilik',
    },
  },
};
