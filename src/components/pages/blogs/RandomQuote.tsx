"use client"
import { useState, useEffect } from "react";

const quotes = [
  {
    text: "Code is like humor. When you have to explain it, it’s bad.",
    author: "Cory House",
  },
  {
    text: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman",
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    text: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
  },
];

const RandomQuote = () => {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="p-4 bg-amber-200 border-l-4 border-black
    dark:bg-black dark:text-amber-200 dark:border-cPeach-dark
    ">
      <blockquote className="italic text-sm">"{quote.text}"</blockquote>
      <p className="mt-2 text-xs">- {quote.author}</p>
    </div>
  );
};

export default RandomQuote;
