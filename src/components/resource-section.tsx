import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface TResourceLink {
  category: string;
  links: { title: string; url: string }[];
}

export function ResourceRecommendationSection() {
  const resources: TResourceLink[] = [
    {
      category: "Web Development",
      links: [
        { title: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/" },
        { title: "MDN Web Docs", url: "https://developer.mozilla.org/" },
        { title: "FreeCodeCamp", url: "https://www.freecodecamp.org/" },
        { title: "CSS Tricks", url: "https://css-tricks.com/" },
      ],
    },
    {
      category: "DSA",
      links: [
        { title: "LeetCode", url: "https://leetcode.com/" },
        { title: "HackerRank", url: "https://www.hackerrank.com/" },
        { title: "GeeksforGeeks DSA", url: "https://www.geeksforgeeks.org/data-structures/" },
        { title: "AlgoExpert", url: "https://www.algoexpert.io/" },
      ],
    },
    {
      category: "DevOps",
      links: [
        { title: "Kubernetes Docs", url: "https://kubernetes.io/docs/" },
        { title: "Docker Docs", url: "https://docs.docker.com/" },
        { title: "DevOps Roadmap", url: "https://roadmap.sh/devops" },
        { title: "HashiCorp Learn", url: "https://learn.hashicorp.com/" },
      ],
    },
    {
      category: "Other Useful Resources",
      links: [
        { title: "Stack Overflow", url: "https://stackoverflow.com/" },
        { title: "Reddit Programming", url: "https://www.reddit.com/r/programming/" },
        { title: "GitHub Docs", url: "https://docs.github.com/" },
        { title: "W3Schools", url: "https://www.w3schools.com/" },
      ],
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-start items-start rounded-lg p-8 mx-auto">
      <div className="flex justify-start p-6 gap-6 h-[360px] rounded-xl border-2 border-gray-300 w-[60%]">
        <Image
          src="/images/codeblue.jpg"
          alt="Recommended resources"
          width={200}
          height={400}
          className="h-full w-[40%] object-cover rounded-md mb-4"
        />
        <div className="flex flex-col items-start w-full h-full custom-scrollbar overflow-hidden hover:overflow-y-scroll">
        <span className="font-bold text-gray-400 mb-1">Links</span>
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
                  className="block py-2 border-b-2 bg-white border-gray-300 hover:translate-x-20 hover:pl-3 hover:scale-125 transition-all duration-500 hover:shadow-md hover:shadow-cGray hover:border-cGray w-full min-h-max"
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
        <h2 className="text-4xl md:text-6xl font-bold mb-10 mt-4">
          Highly Recommended Resources For Learning
        </h2>
        <Button className="w-full rounded-full py-5 font-bold border-2 border-cGray-light shadow-md shadow-black" size={"lg"}>
          Explore More
        </Button>
      </div>
    </div>
  );
}
