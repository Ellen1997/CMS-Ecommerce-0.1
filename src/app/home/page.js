import { getStoryblokApi } from "@storyblok/react/rsc";
import ServerComponent from "@/components/sb/ServerComponent";
import { notFound } from "next/navigation";
import { initStoryblok } from "@/lib/storyblok"; // om du använder den


export default async function Home() {
  initStoryblok(); // om du har en init-funktion

  const api = getStoryblokApi();

  try {
    const { data } = await api.get("cdn/stories/home", {
      version: "draft",
    });

    const content = data?.story?.content;

    return (
      <div>
        <ServerComponent blok={content} />
      </div>
    );
  } catch (error) {
    console.error("Error loading home story:", error);
    return notFound();
  }
}
