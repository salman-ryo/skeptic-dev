"use client"
import ScrollReveal from "@/components/animation/ScrollReveal";
import { H2 } from "@/components/text/heading";
import { Button } from "@/components/ui/button";
import { toolsAndUtilities } from "@/lib/externalLinks";
import { staggeredConf } from "@/utils/animationConfig";
import { throttle } from "@/utils/performance";
import Image from "next/image";
import Link from "next/link";

export function ToolsRecommendationSection() {
  const tools = toolsAndUtilities;

  const handleDownload = () => {
    const jsonData = JSON.stringify(tools, null, 2);
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

    <section className="flex flex-col-reverse md:flex-row-reverse justify-between gap-x-10  items-start rounded-md p-2 mx-auto light:bg-gray-100 md:px-16 py-16">
      <div className="flex flex-row-reverse justify-start p-6 gap-6 h-[460px] md:h-[360px] rounded-md border-2 border-gray-300 md:w-[60%]
      dark:border-blue-400 dark:bg-slate-950
      max-md:flex-col

      ">
        <Image
          src="/images/laptop-grad.jpg"
          alt="Recommended tools"
          width={800}
          height={800}
          className="h-full max-md:h-[200px] md:w-[40%] object-cover rounded-md mb-4 blackNwhiteContast"
        />
        <div className="flex flex-col items-start w-full h-full custom-scrollbar overflow-hidden hover:overflow-y-scroll">
          <span className="font-bold text-gray-400 mb-1 dark:text-gray-300">Tools</span>
          {tools.map((resource, categoryIndex) => (
            <div key={categoryIndex} className="mb-6 w-full">
              <h3 className="font-bold text-lg mb-2">{resource.category}</h3>
              <div className="space-y-2">
                {resource.links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-2 border-b-2 light:bg-white border-gray-300 hover:translate-x-8 hover:pl-3 hover:scale-105 transition-all duration-500 hover:shadow-md hover:shadow-cGray hover:border-cGray w-full min-h-max
                    dark:hover:shadow-blue-400
                    "
                  >
                    <span className="font-bold">#0{index + 1} -</span> {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-[40%] flex flex-col justify-center items-center px-4 md:px-10 py-2 max-md:mb-6">
        <H2 className="mb-10 mt-4 w-[80%] mx-auto dark:text-gray-200">
          Some Useful Tools For Developers
        </H2>
        <Button
          onClick={throttledDownload}
          className="w-full rounded-br-3xl rounded-bl-3xl transition-all duration-500 py-5 font-bold border-2 border-cGray-light shadow-md shadow-gray-600 bg-black
          hover:rounded-none hover:rounded-tr-3xl hover:rounded-tl-3xl hover:bg-white hover:text-black hover:border-black
                    dark:bg-slate-950 dark:text-gray-200 dark:shadow-blue-400 dark:hover:bg-slate-950/80
          "
          size={"lg"}
        >
          Download Links
        </Button>
      </div>
    </section>
    </ScrollReveal>

  );
}
