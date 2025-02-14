"use client"
import React from 'react';

const LoadingSquaresFour: React.FC = () => {
  // The container is a square (w-24 h-24 = 96px) and each square is 24px (w-6 h-6).
  // The animation path moves each square by 96px - 24px = 72px along both X and Y.
  const squareBaseClasses = "absolute size-12 rounded-sm";
  const containerClasses = "relative w-24 h-24";
  const animationDuration = "1.5s";
  // Offsetting each square so they follow the path sequentially.
  const delays = ["0s", "0.375s", "0.75s", "1.125s"];

  return (
    <div className="flex items-center justify-center">
      <div className={containerClasses}>
        <div
          className={`${squareBaseClasses} bg-gradient-to-br from-cGray-dark to-gray-400 dark:from-indigo-400 dark:to-purple-500 `}
          style={{ animation: `moveSquare ${animationDuration} linear infinite`, animationDelay: delays[0] }}
        />
        <div
          className={`${squareBaseClasses} bg-gradient-to-br from-slate-900 to-slate-400 dark:from-cyan-400 dark:to-blue-400`}
          style={{ animation: `moveSquare ${animationDuration} linear infinite`, animationDelay: delays[1] }}
        />
        <div
          className={`${squareBaseClasses} bg-gradient-to-br from-cGray-dark to-gray-400 dark:from-red-700 dark:to-pink-900`}
          style={{ animation: `moveSquare ${animationDuration} linear infinite`, animationDelay: delays[2] }}
        />
        <div
          className={`${squareBaseClasses} bg-gradient-to-br from-slate-900 to-slate-400 dark:from-yellow-700 dark:to-orange-900`}
          style={{ animation: `moveSquare ${animationDuration} linear infinite`, animationDelay: delays[3] }}
        />
      </div>

      {/* 
        Define the keyframes for moving the squares.
        The squares start at the top-left (0,0) and move:
          - to top-right (72px, 0)
          - then to bottom-right (72px, 72px)
          - then to bottom-left (0, 72px)
          - and finally back to the start (0,0)
      */}
      <style jsx>{`
        @keyframes moveSquare {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(72px, 0);
          }
          50% {
            transform: translate(72px, 72px);
          }
          75% {
            transform: translate(0, 72px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSquaresFour;
