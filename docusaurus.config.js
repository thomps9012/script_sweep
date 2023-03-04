// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "script_sweep",
  tagline: "The russian dog says гав",
  favicon: "img/logo.png",

  url: "https://thomps9012.github.io",
  baseUrl: "/script_sweep/",

  organizationName: "thomps9012",
  projectName: "script_sweep",
  deploymentBranch: "docs",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  trailingSlash: false,
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/logo.png",
      navbar: {
        title: "script_sweep",
        logo: {
          alt: "scrip_sweep Logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Quick Start",
          },
          {
            label: "Endpoints and Methods",
            to: "/docs/endpoints",
            position: "left",
          },
          {
            label: "Request Headers",
            to: "/docs/headers",
            position: "left",
          },
          {
            label: "Errors",
            to: "/docs/errors",
            position: "left",
          },
          {
            label: "Glossary",
            to: "/docs/glossary",
            position: "left",
          },
          {
            href: "https://github.com/thomps9012/script_sweep",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Quick Start",
                to: "/docs/intro",
              },
              {
                label: "Request Headers",
                to: "/docs/headers",
              },
              {
                label: "Available Endpoints",
                to: "/docs/endpoints",
              },
              {
                label: "Common Errors",
                to: "/docs/errors",
              },
              {
                label: "Glossary",
                to: "/docs/glossary",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Full URL",
                href: "https://script-sweep-loele2hdfa-uc.a.run.app",
              },
              { label: "Shortened URL", href: "https://tinyurl.com/4zh9cjzb" },
              {
                label: "Personal Site",
                href: "https://thomps9012-io.vercel.app",
              },
              {
                label: "GitHub",
                href: "https://github.com/thomps9012",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()}<br/>Documentation Built with the <a href="https://docusaurus.io/" target="_blank">Docusaurus</a> Framework`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
