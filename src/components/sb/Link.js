import Link from "next/link";

export default function SbLink({ blok }) {
    let url = blok.cta_button_link?.url || blok.cta_button_link?.cached_url || "#";
    const text = blok.cta_button_text || "Klicka här";

      if (!url.startsWith("/") && !url.startsWith("http")) {
    url = `/${url}`;
  }

  return (
    <Link
      href={url || "#"}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {text}
    </Link>
  );
}