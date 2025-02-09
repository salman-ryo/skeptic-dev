import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type SimpleTooltipProps = {
  content: string;
  children: ReactNode;
  className?: string;
};

const SimpleTooltip = ({
  content,
  children,
  className,
}: SimpleTooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className={cn("max-w-72", className)}>
        {content}
      </TooltipContent>
    </Tooltip>
  );
};

export default SimpleTooltip;
