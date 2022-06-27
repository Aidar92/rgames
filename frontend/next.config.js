var path = require("path");
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "custom",
    path: "http://localhost:7000/"
  },
  reactStrictMode: true,
  future: {
    webpack5: true
  },
  webpack: function (config) {
    config.experiments = {};
    config.node = {
      fs: "empty"
    };

    config.devServer = {
      ...config.devServer,
      server: 'http',
      proxy: {
        context: ["/api", "/auth"],
        target: "http://localhost:7000",
        changeOrigin: true,
        secure: false
      }
    };

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  }
};

module.exports = {
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'ru',
    localeDetection: false,
    http: true
  },
  nextConfig
};
