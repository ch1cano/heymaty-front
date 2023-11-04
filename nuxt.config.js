module.exports = {
  head: {
    title: "Heymaty",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, maximum-scale=5",
      },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
  },

  render: {
    csp: {
      policies: {
        "default-src": [
          "'self'",
          "'unsafe-inline'",
          "https:",
          "data:",
          "blob:",
        ],
        "img-src": ["https:", "data:", "blob:", "https://*.stripe.com"],
        "script-src": [
          "'self'",
          "'unsafe-inline'",
          "apis.google.com",
          "js.stripe.com",
          "blob:",
          "'unsafe-eval'",
        ],
      },
    },
  },

  loading: { color: "#3B8070" },

  css: [
    { src: "~assets/styles/main.sass", lang: "sass" },
    { src: "~assets/styles/style.css" },
    { src: "~assets/styles/posts.css" },
  ],

  plugins: [
    "~plugins/global-components",
    "~plugins/global-const",
    "~plugins/vue-config",
    "~plugins/siofu",
    "~plugins/image-compressor",
    "~plugins/vue-axios",
    "~plugins/vue-dayjs",
    "~plugins/vue-js-modal.js",
    "~plugins/vue-final-modal.js",
    "~/plugins/router",
    {
      src: "~plugins/vue-google-auth",
      mode: "client",
    },
    { 
      src: "~plugins/infinite-loading.js", 
      mode: "client" 
    },
    // '~plugins/vue-swiper',
    {
      src: "~plugins/vue-swiper",
      mode: "client",
    },
    {
      src: "~plugins/vue-form-wizard",
      mode: "client",
    },
    {
      src: "~plugins/vue-element-ui",
      mode: "client",
    },
    {
      src: "~plugins/vue-select",
      mode: "client",
    },
    {
      src: "~plugins/vue-textarea",
      mode: "client",
    },
    {
      src: "~plugins/vue-silentbox",
      mode: "client",
    },
    {
      src: "~plugins/vue-justified-layout.js",
      mode: "client",
    },
    {
      src: "~plugins/vue-lazyload.js",
      mode: "client",
      ssr: false,
    },
    {
      src: "~plugins/vue-native-notification.js",
      mode: "client",
      ssr: false,
    },
    {
      src: "~plugins/vue-clipboard2.js",
      mode: "client",
    },
    {
      src: "~plugins/vue-click-outside.js",
      mode: "client",
    },
    {
      src: "~plugins/vue-pagination.js",
      mode: "client",
    },
    { src: '~/plugins/vue-stripe.js', ssr: false },
    // '~plugins/vue-recaptcha'
  ],
  modules: [
    ["@nuxtjs/i18n"],
    ["nuxt-lazy-load"],
    [
      "nuxt-cookie-control",
      {
        locales: ["en", "ru"],
        //modal opener (cookie control)
        controlButton: false,
        colors: {
          barTextColor: "#fff",
          barBackground: "#5171e4",
          barButtonColor: "#000",
          barButtonBackground: "#fff",
          barButtonHoverColor: "#fff",
          barButtonHoverBackground: "#5171e4",
          modalOverlay: "#000",
          modalOverlayOpacity: 0.8,
          modalTextColor: "#000",
          modalBackground: "#fff",
          modalUnsavedColor: "#fff",
          modalButtonColor: "#000",
          modalButtonBackground: "#fff",
          modalButtonHoverColor: "#fff",
          modalButtonHoverBackground: "#5171e4",
          controlButtonIconColor: "#000",
          controlButtonBackground: "#fff",
          controlButtonIconHoverColor: "#fff",
          controlButtonHoverBackground: "#5171e4",
          checkboxActiveBackground: "#000",
          checkboxInactiveBackground: "#000",
          checkboxDisabledBackground: "#ddd",
          checkboxActiveCircleBackground: "#fff",
          checkboxInactiveCircleBackground: "#fff",
          checkboxDisabledCircleBackground: "#fff",
        },
      },
    ],
    ["cookie-universal-nuxt", { alias: "cookiz" }],
    // '@nuxtjs/eslint-module',
    "@nuxtjs/axios",
    "@nuxtjs/svg",
    "@nuxtjs/dotenv",
    "nuxt-izitoast",
    "nuxt-socket-io",
    "vue-scrollto/nuxt",
    [
      "nuxt-lazy-load",
      {
        // These are the default values
        images: true,
        videos: true,
        audios: true,
        iframes: true,
        native: false,
        polyfill: true,
        directiveOnly: true,

        // Default image must be in the static folder
        // defaultImage: "/defaultimage.png",
        defaultImage: "/item-heymaty.svg",
      },
    ],
  ],

  i18n: {
    locales: [
      {
        code: "ru",
        file: "ru-RU.js",
        name: "Ру",
        flag: "ru",
        iso: "ru-RU",
      },
      {
        code: "en",
        file: "en-US.js",
        name: "En",
        flag: "gb",
        iso: "en-US",
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
    vueI18n: "~/plugins/vue-i18n.js",
    lazy: true,
    langDir: "lang/",
    defaultLocale: "en",
    skipSettingLocaleOnNavigate: true,
  },
  cookies: {
    necessary: [
      {
        name: {
          en: "Default Cookies",
          ru: "Стандартные Cookies",
        },
        description: {
          en: "Used for cookie control.",
          ru: "Используются для контроля cookie.",
        },
        cookies: ["cookie_control_consent", "cookie_control_enabled_cookies"],
      },
      {
        name: {
          en: "Default Auth Cookies",
          ru: "Стандартные Cookies авторизации",
        },
        description: {
          en: "Used to remember user.",
          ru: "Используются запоминания пользователя.",
        },
        cookies: ["token"],
      },
    ],
    optional: [
      {
        name: "I18N",
        //if you don't set identifier, slugified name will be used
        identifier: "i18n",
        description: {
          en: "Cookies remember your locale",
          ru: "Cookies запоминания локали",
        },
        initialState: true,
        cookies: ["i18n_redirected"],
        accepted: () => { },
        declined: () => { },
      },
      {
        name: "Test",
        //if you don't set identifier, slugified name will be used
        identifier: "test",
        description: {
          en: "Test Cookies",
          ru: "Тестовые Cookies",
        },
        initialState: true,
        cookies: ["test"],
        accepted: () => { },
        declined: () => { },
      },
      // {
      //   name: "Google Analitycs",
      //   //if you don't set identifier, slugified name will be used
      //   identifier: "ga",
      //   description: {
      //     en: "Google GTM is ...",
      //   },
      //   initialState: true,
      //   src: "https://www.googletagmanager.com/gtag/js?id=<API-KEY>",
      //   async: true,
      //   cookies: ["_ga", "_gat", "_gid"],
      //   accepted: () => {
      //     window.dataLayer = window.dataLayer || [];
      //     window.dataLayer.push({
      //       "gtm.start": new Date().getTime(),
      //       event: "gtm.js",
      //     });
      //   },
      //   declined: () => {},
      // },
    ],
  },
  io: {
    sockets: [
      {
        name: "messages",
        url: process.env.SOCKET_URL || "http://localhost:3000",
        default: true,
        vuex: {
          // mutations: [
          //   {
          //     // output: "messages/SET_HISTORY",
          //     // message: "messages/ADD_MESSAGE",
          //   },
          // ],
          actions: [
            {
              message: "messages/addMessage",
            },
            {
              chathistory: "messages/setMessages",
            },
            {
              fileuploadingerror: "messages/setFileError",
            },
            {
              fileuploadingsuccess: "messages/setFileSuccess",
            },
            {
              responline: "messages/setRespOnline",
            },
            {
              respoffline: "messages/setRespOffline",
            },
            { newSubscription: "subscribe/newSubscriptionAlert" },
          ],
        },
      },
    ],
  },

  izitoast: {
    position: "topRight",
    transitionIn: "fadeInUp",
    transitionOut: "fadeOut",
    timeout: 5000,
    displayMode: 2,
  },

  build: {
    // extend(config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: "pre",
    //       test: /\.(js|vue)$/,
    //       loader: "eslint-loader",
    //       exclude: /(node_modules)/
    //     })
    //   }
    // },
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      });
    },
    transpile: ["vue-final-modal"],
    babel: {
      presets({ isServer }, [preset, options]) {
        return [
          [
            preset,
            {
              loose: true,
            },
          ],
        ];
      },
      // plugins: ['@babel/plugin-proposal-private-methods', { 'loose': true }]
    },
  },

  router: {
    middleware: ["auth"],
    // scrollBehavior() {
    //   return { x: 0, y: 0 };
    // },
  },

  server: {
    port: 3001,
  },
};
