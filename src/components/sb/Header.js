import { storyblokEditable } from "@storyblok/react/rsc";
import { components } from "@/lib/storyblok";
import  SbLink  from "@/components/sb/Link";

export default function Header({ blok }) {
  return (
    <header
      {...storyblokEditable(blok)}
      className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        
        {blok.logo && (
           <div className="flex-shrink-0">
            <img
              src={blok.logo.filename || "/logo.png"}
              alt={blok.logo.alt || "Logo"}
              className="h-10 w-auto"
            />
          </div>
        )}
             {blok.title && (
            <span className="text-xl font-semibold text-gray-900">
              {blok.title}
            </span>
          )}

        {blok.cta_buttons && (
          <nav className="flex space-x-4">
            {blok.cta_buttons.map((button) => (
              <SbLink blok={button} key={button._uid} />


            ))}
        </nav>
        )}

      </div>
    </header>
  );
}
