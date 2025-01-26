export const extLink = {
  author: "http://dev-salman.vercel.app",
};

interface TResourceLink {
  category: string;
  links: { title: string; url: string }[];
}

export const resourceLinks: TResourceLink[] = [
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
      {
        title: "GeeksforGeeks DSA",
        url: "https://www.geeksforgeeks.org/data-structures/",
      },
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
      {
        title: "Reddit Programming",
        url: "https://www.reddit.com/r/programming/",
      },
      { title: "GitHub Docs", url: "https://docs.github.com/" },
      { title: "W3Schools", url: "https://www.w3schools.com/" },
    ],
  },
];

export const toolsAndUtilities: TResourceLink[] = [
  {
    category: "Code Formatting & Debugging",
    links: [
      { title: "Prettier - Code Formatter", url: "https://prettier.io/" },
      { title: "ESLint - Linting Tool", url: "https://eslint.org/" },
      { title: "Regex101 - Regex Debugger", url: "https://regex101.com/" },
    ],
  },
  {
    category: "UI/UX Design",
    links: [
      { title: "Figma - Design Tool", url: "https://www.figma.com/" },
      {
        title: "Coolors - Color Palette Generator",
        url: "https://coolors.co/",
      },
      { title: "FontPair - Typography Pairing", url: "https://fontpair.co/" },
    ],
  },
  {
    category: "Web Development",
    links: [
      {
        title: "Can I Use - Browser Compatibility",
        url: "https://caniuse.com/",
      },
      { title: "JSON Formatter", url: "https://jsonformatter.org/" },
      { title: "WAVE - Accessibility Tool", url: "https://wave.webaim.org/" },
    ],
  },
  {
    category: "APIs and Testing",
    links: [
      { title: "Postman - API Testing Tool", url: "https://www.postman.com/" },
      { title: "Mocky - Mock API Generator", url: "https://mocky.io/" },
      {
        title: "Hoppscotch - API Request Builder",
        url: "https://hoppscotch.io/",
      },
    ],
  },
  {
    category: "Performance & Optimization",
    links: [
      {
        title: "GTmetrix - Website Performance Analyzer",
        url: "https://gtmetrix.com/",
      },
      { title: "Google PageSpeed Insights", url: "https://pagespeed.web.dev/" },
      {
        title: "Pingdom - Website Monitoring",
        url: "https://www.pingdom.com/",
      },
    ],
  },
  {
    category: "Version Control",
    links: [
      { title: "Git Cheat Sheet", url: "https://git-scm.com/doc" },
      { title: "GitHub - Code Collaboration", url: "https://github.com/" },
      { title: "GitLab - CI/CD & Repo Management", url: "https://gitlab.com/" },
    ],
  },
];
