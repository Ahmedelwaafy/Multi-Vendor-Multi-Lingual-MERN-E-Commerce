import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallbackName } from "@/lib/utils";
import { TFunction } from "i18next";

function VendorAvatar({
  vendor,
  t,
  className,
}: {
  vendor: { img: string; name: string; rating: number };
  t: TFunction;
  className?: string;
}) {
  return (
    <div className=" flex justify-start gap-4">
      <Avatar>
        <AvatarImage className="object-cover rounded-full" src={vendor?.img} />
        <AvatarFallback className="bg-background text-secondary font-medium">
          {AvatarFallbackName(vendor?.name)}
        </AvatarFallback>
      </Avatar>
      <div>
        <h3 className=" mb-0.5 flex items-center gap-2 font-semibold">
          {vendor?.name}
        </h3>
        <h5 className="text-xs">
          ({vendor?.rating}) {t("ratings")}
        </h5>
      </div>
    </div>
  );
}

export default VendorAvatar;
