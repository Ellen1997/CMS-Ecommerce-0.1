import { notFound } from "next/navigation";
import { getStoryblokApi } from "@storyblok/react/rsc";
import { components } from "@/lib/storyblok";
import { storyblokEditable } from "@storyblok/react";

export default async function Page({ params: { slug }, searchParams }) {
  try {
    const realSlug = slug?.join("/") || "home";

    const isPreview =
      process.env.NODE_ENV === "development" ||
      searchParams?.storyblok === "1" ||
      searchParams?.storyblok_preview === "1";

    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get(`cdn/stories/${realSlug}`, {
      version: isPreview ? "draft" : "published",
    });

    const blok = data?.story?.content;
    if (!blok) return notFound();

    const Component = components[blok.component];

    if (!Component) return notFound();
    console.log("→ Blok content:", blok);
console.log("→ component:", blok.component);

    return (
      <main {...storyblokEditable(blok)}>
        <Component blok={blok} />
        
      </main>
    );
  } catch (error) {
    console.error("Storyblok error:", error);
    return notFound();
  }
}
