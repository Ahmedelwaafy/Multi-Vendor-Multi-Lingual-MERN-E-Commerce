import { TFunction } from "i18next";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LangLink } from "../MainComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { AvatarFallbackName, cn, FormatDate } from "@/lib/utils";
import { IVendorType } from "@/types";

function VendorQuickViewPopover({
  vendor,
  t,
  className,
}: {
  vendor: Partial<IVendorType>;
  t: TFunction;
  className?: string;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <LangLink
          to={`/brands/${vendor?._id}/${vendor?.name?.replace(/\s+/g, "-")}`}
          className={cn("mt-5 mb-2 line-clamp-1 w-fit text-muted ", className)}
        >
          {t("by")}{" "}
          <span className="underline underline-offset-4 font-semibold">
            {vendor?.name}
          </span>
        </LangLink>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-start space-x-4">
          <Avatar>
            <AvatarImage src={vendor?.avatar?.url} />
            <AvatarFallback>
              {AvatarFallbackName(vendor?.name || "")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1  grow">
            <div className=" flex justify-between items-center gap-4 grow">
              <h4 className="text-sm font-semibold line-clamp-1">
                {vendor?.name}{" "}
              </h4>
              <span className="text-accent shrink-0">{vendor?.rating}/5</span>
            </div>

            <div className="text-sm flex justify-between items-center gap-4">
              <span>
                {vendor?.totalProducts?.toLocaleString()} {t("Products")}
              </span>{" "}
              <span>
                {vendor?.totalReviews?.toLocaleString()} {t("Reviews")}
              </span>{" "}
            </div>
            <div className="flex items-center pt-2">
              <FontAwesomeIcon
                className="mr-2 h-4 w-4 opacity-70"
                icon={faCalendarDays}
              />
              <span className="text-xs text-muted-foreground">
                {t("Joined")} {FormatDate(vendor?.createdAt as Date)}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default VendorQuickViewPopover;
