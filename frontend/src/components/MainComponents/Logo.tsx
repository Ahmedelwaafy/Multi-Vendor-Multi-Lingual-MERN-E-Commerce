import { cn } from "@/lib/utils";
import LangLink from "./LangLink";

function Logo({ className }: { className?: string }) {
  return (
    <LangLink href="" className={cn("text-2xl font-bold md:text-base sm:text-2xl", className)}>
      Sacramento
    </LangLink>
  );
}

export default Logo;
