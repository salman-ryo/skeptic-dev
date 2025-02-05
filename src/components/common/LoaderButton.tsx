import React from "react";
import { SiSpinrilla } from "react-icons/si";

interface LoaderButtonProps{
    className?: string;
    message?:string;
}
const LoaderButton = ({className,message="Please wait"}:LoaderButtonProps) => {
  return (
    <>
      <SiSpinrilla className="mr-2 h-4 w-4 animate-spin" /> {message}
    </>
  );
};

export default LoaderButton;
