import fs from "fs";
import { resolve } from "path";
import StoryblokClient from "storyblok-js-client";


const SETTINGS = {
  CMS_PUBLIC_KEY: process.env.STORYBLOK_DELIVERY_API_ACCESS_TOKEN 
    || process.env.NEXT_PUBLIC_STORYBLOK_DELIVERY_API_ACCESS_TOKEN,
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

const client = new StoryblokClient({ accessToken: SETTINGS.CMS_PUBLIC_KEY });

async function generateSitemap() {
  try {
    const { data } = await client.get("cdn/links/");
    const pages = Object.values(data.links).filter(link => link.slug !== "config");

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => {
      const url = `${SETTINGS.SITE_URL}/${page.slug}`;
      const priority = page.slug === "" ? 1.0 : 0.8;
      const lastmod = page.published_at || new Date().toISOString();
      return `<url><loc>${url}</loc><lastmod>${lastmod}</lastmod><priority>${priority}</priority></url>`;
    }).join("\n")}
</urlset>`;

    fs.writeFileSync(resolve("./public/sitemap.xml"), sitemapXml);
    console.log("Sitemap skapad: ./public/sitemap.xml");
  } catch (error) {
    console.error("Fel vid generering av sitemap:", error);
  }
}

generateSitemap();
