import { WithContext } from "schema-dts";
import { ExpertiseSection } from "@/components/home/expertise/ExpertiseSection";
import { HeroSection } from "@/components/home/hero/HeroSection";
import { LatestPosts } from "@/components/home/posts/LatestPosts";
import { FeaturedProjects } from "@/components/home/projects/FeaturedProjects";
import JsonLd from "@/components/json-ld";
import { HomeLayout } from "@/components/layouts/home-layout";
import { AREA_EXPERTISE } from "@/lib/constants";
import { getAllContent } from "@/lib/content";

export default async function Home() {
  const [featuredProjects, latestPosts] = await Promise.all([
    getAllContent("projects").then((projects) => projects.slice(0, 5)),
    getAllContent("posts").then((posts) => posts.slice(0, 9)),
  ]);

  const jsonLd: WithContext<any> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gemika Haziq Nugroho - UX Strategist & Mobile Developer",
    url: "https://gemika.vercel.app",
    description:
      "Expert user experience strategist and mobile developer portfolio",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://gemika.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <HomeLayout>
        <HeroSection />
        <FeaturedProjects projects={featuredProjects} />
        <ExpertiseSection topics={AREA_EXPERTISE} />
        <LatestPosts posts={latestPosts} />
      </HomeLayout>
    </>
  );
}
