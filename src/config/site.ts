export const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://solstudio.vercel.app";

export const siteConfig = (locale?: string) => ({
  name: "SolStudio",
  url: siteUrl + "/" + locale,
  ogImage: `${siteUrl}/${locale}/opengraph-image`,
  description: "Quick Starter Template for your Next project.",
  links: {
    twitter: "https://x.com/josh_scriptz",
    github: "https://github.com/Coding-With-Josh/",
  },
});

export type SiteConfig = typeof siteConfig;
