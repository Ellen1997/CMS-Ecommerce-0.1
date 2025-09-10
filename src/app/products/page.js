import { getStoryblokApi } from "@storyblok/react/rsc";
import { initStoryblok } from "@/lib/storyblok";
import LatestProductsList from "@/components/sb/LatestProductsList";
import { extractTextFromRichText } from "@/utils/extractText";


export default async function ProductsPage({ searchParams }) {
  const api = getStoryblokApi();
  const { data } = await api.get("cdn/stories", {
    version: "draft",
    starts_with: "products/",
  });
  const allProducts = data.stories || [];

  console.log("▶ Alla produkter från Storyblok:");
  allProducts.forEach((p, idx) => {
    console.log(idx + 1, p.content?.title, p.full_slug || p.slug);
  });

  const searchQuery = (searchParams.search || "").toLowerCase();
  console.log("▶ Söksträng från URL:", searchQuery);

  const filteredProducts = allProducts
  .filter(product => product.content?.component === "ProductPage") // 🛑 Endast riktiga produkter
  .filter(product => {
    const title = product.content?.title?.toLowerCase() || "";
    const description = extractTextFromRichText(product.content?.description || "").toLowerCase();
    return title.includes(searchQuery) || description.includes(searchQuery);
  });

  console.log("▶ Filtrerade produkter som visas:");
  filteredProducts.forEach((p) => console.log("  ‣", p.content?.title));

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Alla produkter</h1>
      <LatestProductsList blok={{ products: filteredProducts }} />
    </section>
  );
}
