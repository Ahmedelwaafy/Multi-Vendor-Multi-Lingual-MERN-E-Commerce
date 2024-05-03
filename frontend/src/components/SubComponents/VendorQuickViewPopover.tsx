import { IProductType } from "@/types/CardsTypes";
import { TFunction } from "i18next";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LangLink } from "../MainComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

function VendorQuickViewPopover({
  product,
  t,
  className,
}: {
  product: IProductType;
  t: TFunction;
  className?: string;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        {" "}
        <LangLink
          to={`/vendors/${product?.shop_id}/${product?.shop?.name?.replace(
            /\s+/g,
            "-"
          )}`}
          className={cn("mt-5 mb-2 line-clamp-1 w-fit text-muted ", className)}
        >
          {product?.shop?.name}
        </LangLink>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <FontAwesomeIcon
                className="mr-2 h-4 w-4 opacity-70"
                icon={faCalendar}
              />
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default VendorQuickViewPopover;
