"use client"
import AnimationWrapper from "@/components/animation/AnimationWrapper";
import ScrollReveal from "@/components/animation/ScrollReveal";
import { H2 } from "@/components/text/heading";
import { Button } from "@/components/ui/button";
import { resourceLinks } from "@/lib/externalLinks";
import { fadeInScaleConf, staggeredConf } from "@/utils/animationConfig";
import { throttle } from "@/utils/performance";
import Image from "next/image";
import Link from "next/link";

export function ResourceRecommendationSection() {
  const resources = resourceLinks;

  const handleDownload = () => {
    const jsonData = JSON.stringify(resources, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resourceLinks.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const throttledDownload = throttle(handleDownload,2000 )

  return (
    <ScrollReveal animationVariants={staggeredConf.variant} transitionConfig={staggeredConf.transition} >
    <div className="flex flex-col md:flex-row justify-start items-start rounded-md p-8 mx-auto">

      <div className="flex justify-start p-6 gap-6 h-[360px] rounded-md border-2 border-gray-300 w-[60%]">
        <Image
          src="/images/smallpc.jpg"
          alt="Recommended resources"
          width={800}
          height={800}
          className="h-full w-[40%] object-cover rounded-md mb-4 blackNwhite"
        />
        <div className="flex flex-col items-start w-full h-full custom-scrollbar overflow-hidden hover:overflow-y-scroll">
          <span className="font-bold text-gray-400 mb-1">Resources</span>
          {resources.map((resource, categoryIndex) => (
            <div key={categoryIndex} className="mb-6 w-full">
              <h3 className="font-bold text-lg mb-2">{resource.category}</h3>
              <div className="space-y-2">
                {resource.links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-2 border-b-2 bg-white border-gray-300 hover:translate-x-8 hover:pl-3 hover:scale-105 transition-all duration-500 hover:shadow-md hover:shadow-cGray hover:border-cGray w-full min-h-max"
                  >
                    <span className="font-bold">#0{index + 1} -</span> {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[40%] flex flex-col justify-center items-center px-10 py-2">
        <H2 className="mb-10 mt-4">
          Highly Recommended Resources For Learning
        </H2>
        <Button
          onClick={throttledDownload}
          className="w-full rounded-full py-5 font-bold border-2 border-cGray-light shadow-md shadow-black"
          size={"lg"}
        >
          Download Links
        </Button>
      </div>
    </div>
    </ScrollReveal>
  );
}
