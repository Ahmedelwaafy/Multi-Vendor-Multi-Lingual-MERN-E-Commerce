import { cn } from "@/lib/utils";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TFunction } from "i18next";
import { toast } from "sonner";

interface TableCellCopyToClipboardProps {
  title: string;
  t: TFunction;
  className?: string;
}

export function TableCellCopyToClipboard({
  title,
  className,
  t,
}: TableCellCopyToClipboardProps) {
  return (
    <div className={cn("w-full  flex gap-2 relative group ", className)}>
      <p className="w-28  truncate cursor-default">{title}</p>
      <FontAwesomeIcon
        onClick={async () => {
          await navigator.clipboard.writeText(String(title));
          toast.success(t("table.copied_to_clipboard"));
        }}
        className="absolute right-3  top-1/2  cursor-pointer active:scale-95 hover:scale-105 group-hover:-translate-y-1/2 group-hover:opacity-100 opacity-0 translate-y-[2px] trns"
        icon={faCopy}
      />
    </div>
  );
}
