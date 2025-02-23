import { cn } from "@/lib/utils";
interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

export const H2 = ({ children, className }: HeadingProps) => {
  return (
    <h2
      className={cn(
        "text-3xl sm:text-4xl md:text-6xl leading-tight font-bold text-cGray-dark",
        className
      )}
    >
      {children}
    </h2>
  );
};
export const H3 = ({ children, className }: HeadingProps) => {
  return (
    <h3
      className={cn(
        "text-2xl font-semibold",
        className
      )}
    >
      {children}
    </h3>
  );
};
