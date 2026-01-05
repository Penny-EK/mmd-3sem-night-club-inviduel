// react imports
import { Suspense } from "react";

// component imports
import BlogList from "@/app/components/(penny)/BlogList";
import patternBg from "@/app/assets/bg/pattern_bg.jpg";
import HeaderNav from "@/app/components/(bjorn)/HeaderNav";
import SubHeader from "@/app/components/(meleese)/SubHeader";

// blog page receives search parameters and renders blog list
export default async function Blog({ searchParams }) {
  const params = await searchParams;
  return (
    <div>
      <HeaderNav />
      <SubHeader title="Blog" />

      <main
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${patternBg.src})` }}
      >
        {/* add suspense to make loading smoother */}
        <Suspense fallback={<div>Loading blog posts...</div>}>
          {/* calls BlogList component with search parameters */}
          <BlogList searchParams={params} />
        </Suspense>
      </main>
    </div>
  );
}
