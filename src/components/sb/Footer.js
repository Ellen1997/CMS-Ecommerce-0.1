import { storyblokEditable } from "@storyblok/react/rsc";
import { components } from "@/lib/storyblok"; 

export default function Footer({ blok }) {
  return (
    <footer
      {...storyblokEditable(blok)}
      className="bg-white shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {blok.footer_text}
        {blok.nav_items && (
          <nav className="flex space-x-4">
            {blok.nav_items.map((item) => {
              
              const Component = components[item.component];
              return Component ? <Component blok={item} key={item._uid} /> : null;
              
            })}
          </nav>
        )}
      </div>
    </footer>
  );
}